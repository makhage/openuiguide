#!/usr/bin/env node
/**
 * validate-spec-format.js — Node.js spec format validator.
 *
 * Parses each spec.md file under openspec/specs/ and validates:
 *   1. Top-level heading
 *   2. Requirement IDs with uniqueness across ALL specs
 *   3. Enforcement level distribution (warns if >50% are MUST)
 *   4. Cross-references resolve to real requirement IDs
 *   5. "Why This Matters", "Platform Notes", and "Further Reading" sections
 *
 * Outputs JSON results suitable for CI. No external dependencies.
 */

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const SPECS_DIR = path.join(REPO_ROOT, "openspec", "specs");

const REQ_ID_REGEX = /REQ-[A-Z0-9]+-[A-Z]*-?\d+/g;
const REQ_HEADING_REGEX = /^### (REQ-[A-Z0-9]+-[A-Z]*-?\d+)/gm;
const CROSS_REF_REGEX = /see (REQ-[A-Z0-9]+-[A-Z]*-?\d+)/g;
const ENFORCEMENT_REGEX = /\b(MUST|SHOULD|CONSIDER|LEARN)\b/;

/**
 * Recursively find all spec.md files under a directory.
 */
function findSpecFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findSpecFiles(fullPath));
    } else if (entry.name === "spec.md") {
      results.push(fullPath);
    }
  }
  return results.sort();
}

/**
 * Extract requirement sections: for each ### REQ-... heading, grab the
 * content up to the next ### heading.
 */
function extractRequirementSections(content) {
  const sections = [];
  const lines = content.split("\n");
  let currentReqId = null;
  let currentLines = [];

  for (const line of lines) {
    const match = line.match(/^### (REQ-[A-Z0-9]+-[A-Z]*-?\d+)/);
    if (match) {
      if (currentReqId) {
        sections.push({ id: currentReqId, text: currentLines.join("\n") });
      }
      currentReqId = match[1];
      currentLines = [line];
    } else if (currentReqId) {
      if (line.match(/^### /) && !line.match(/^#### /)) {
        sections.push({ id: currentReqId, text: currentLines.join("\n") });
        currentReqId = null;
        currentLines = [];
      } else {
        currentLines.push(line);
      }
    }
  }
  if (currentReqId) {
    sections.push({ id: currentReqId, text: currentLines.join("\n") });
  }
  return sections;
}

/**
 * Validate a single spec file. Returns an object with issues and metadata.
 */
function validateSpec(filePath, allDefinedIds) {
  const relPath = path.relative(REPO_ROOT, filePath);
  const content = fs.readFileSync(filePath, "utf-8");
  const issues = [];
  const reqIds = [];
  const enforcementLevels = { MUST: 0, SHOULD: 0, CONSIDER: 0, LEARN: 0 };
  const crossRefs = [];

  // 1. Top-level heading
  if (!/^# [^ ]/m.test(content)) {
    issues.push("Missing top-level heading (# title)");
  }

  // 2. Extract requirement IDs from headings
  const sections = extractRequirementSections(content);
  for (const section of sections) {
    reqIds.push(section.id);
  }

  if (reqIds.length === 0) {
    // Also check for any REQ- patterns in body text (e.g., quick reference tables)
    const bodyIds = content.match(REQ_ID_REGEX);
    if (!bodyIds || bodyIds.length === 0) {
      issues.push("No requirement IDs found (expected pattern: REQ-XXX-NNN)");
    }
  }

  // 3. Enforcement levels for each requirement section
  for (const section of sections) {
    const sectionText = section.text.split("\n").slice(0, 15).join("\n");
    const match = sectionText.match(ENFORCEMENT_REGEX);
    if (match) {
      enforcementLevels[match[1]]++;
    } else {
      issues.push(
        `Requirement ${section.id} missing enforcement level (MUST/SHOULD/CONSIDER/LEARN)`
      );
    }
  }

  // Also count LEARN sections that are not requirements (### LEARN: ...)
  const learnSections = (content.match(/^### LEARN:/gm) || []).length;
  enforcementLevels.LEARN += learnSections;

  // 4. Cross-references
  let crossRefMatch;
  const crossRefRegex = new RegExp(CROSS_REF_REGEX.source, "g");
  while ((crossRefMatch = crossRefRegex.exec(content)) !== null) {
    crossRefs.push(crossRefMatch[1]);
  }

  // 5. "Why This Matters" sections
  if (!/^#{1,4}.*Why This Matters/im.test(content)) {
    issues.push("Missing 'Why This Matters' section(s)");
  }

  // 6. Platform sections
  if (
    !/^#{1,4}.*(Platform Notes|Platform Implementation Notes|Platform)/im.test(
      content
    )
  ) {
    issues.push("Missing 'Platform Notes' or 'Platform' section(s)");
  }

  // 7. Source / Further Reading references
  if (!/^#{1,4}.*(Sources?|Further Reading|References)/im.test(content)) {
    issues.push("Missing 'Source', 'Sources', or 'Further Reading' section");
  }

  return {
    file: relPath,
    passed: issues.length === 0,
    issues,
    requirementIds: reqIds,
    enforcementLevels,
    crossReferences: crossRefs,
  };
}

function main() {
  if (!fs.existsSync(SPECS_DIR)) {
    const result = {
      success: false,
      error: `Specs directory not found: ${SPECS_DIR}`,
      results: [],
      summary: null,
    };
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    process.exit(1);
  }

  const specFiles = findSpecFiles(SPECS_DIR);

  if (specFiles.length === 0) {
    const result = {
      success: false,
      error: `No spec.md files found under ${SPECS_DIR}`,
      results: [],
      summary: null,
    };
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    process.exit(1);
  }

  // First pass: collect all defined requirement IDs across all specs
  const allDefinedIds = new Set();
  const idToFile = {};
  const duplicateIds = [];

  for (const specFile of specFiles) {
    const content = fs.readFileSync(specFile, "utf-8");
    const sections = extractRequirementSections(content);
    const relPath = path.relative(REPO_ROOT, specFile);
    for (const section of sections) {
      if (allDefinedIds.has(section.id)) {
        duplicateIds.push({
          id: section.id,
          files: [idToFile[section.id], relPath],
        });
      } else {
        allDefinedIds.add(section.id);
        idToFile[section.id] = relPath;
      }
    }
  }

  // Second pass: validate each spec
  const fileResults = [];
  for (const specFile of specFiles) {
    fileResults.push(validateSpec(specFile, allDefinedIds));
  }

  // Cross-reference resolution: check that all cross-refs point to defined IDs
  const unresolvedRefs = [];
  for (const result of fileResults) {
    for (const ref of result.crossReferences) {
      if (!allDefinedIds.has(ref)) {
        unresolvedRefs.push({ ref, file: result.file });
        result.issues.push(
          `Cross-reference to ${ref} does not resolve to any defined requirement`
        );
        result.passed = result.issues.length === 0;
      }
    }
  }

  // Enforcement level distribution (aggregate)
  const totalEnforcement = { MUST: 0, SHOULD: 0, CONSIDER: 0, LEARN: 0 };
  for (const result of fileResults) {
    for (const level of Object.keys(totalEnforcement)) {
      totalEnforcement[level] += result.enforcementLevels[level];
    }
  }

  const totalReqs =
    totalEnforcement.MUST +
    totalEnforcement.SHOULD +
    totalEnforcement.CONSIDER +
    totalEnforcement.LEARN;
  const mustPercentage = totalReqs > 0 ? totalEnforcement.MUST / totalReqs : 0;

  const warnings = [];
  if (mustPercentage > 0.5) {
    warnings.push(
      `Enforcement distribution warning: ${(mustPercentage * 100).toFixed(1)}% of requirements are MUST (>${"50%"} threshold). Consider if some could be SHOULD or CONSIDER.`
    );
  }

  if (duplicateIds.length > 0) {
    for (const dup of duplicateIds) {
      warnings.push(
        `Duplicate requirement ID: ${dup.id} found in ${dup.files.join(" and ")}`
      );
    }
  }

  // Recalculate passed after cross-ref checks
  const passedCount = fileResults.filter((r) => r.passed).length;
  const failedCount = fileResults.length - passedCount;

  const output = {
    success: failedCount === 0 && duplicateIds.length === 0,
    summary: {
      total: fileResults.length,
      passed: passedCount,
      failed: failedCount,
      duplicateIds: duplicateIds.length,
      unresolvedCrossRefs: unresolvedRefs.length,
      enforcementDistribution: totalEnforcement,
      mustPercentage: `${(mustPercentage * 100).toFixed(1)}%`,
    },
    warnings,
    results: fileResults.map((r) => ({
      file: r.file,
      passed: r.passed,
      issues: r.issues,
      requirementIds: r.requirementIds,
      enforcementLevels: r.enforcementLevels,
      crossReferences: r.crossReferences,
    })),
  };

  process.stdout.write(JSON.stringify(output, null, 2) + "\n");
  process.exit(failedCount === 0 && duplicateIds.length === 0 ? 0 : 1);
}

main();
