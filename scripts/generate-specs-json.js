#!/usr/bin/env node

/**
 * Generates openspec/specs.json from all spec.md files.
 * No external dependencies — uses only Node.js built-ins.
 *
 * Usage: node scripts/generate-specs-json.js
 */

const fs = require('fs');
const path = require('path');

const SPECS_DIR = path.join(__dirname, '..', 'openspec', 'specs');
const OUTPUT_FILE = path.join(__dirname, '..', 'openspec', 'specs.json');

function findSpecFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findSpecFiles(fullPath));
    } else if (entry.name === 'spec.md') {
      results.push(fullPath);
    }
  }
  return results;
}

function parseSpec(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(path.join(__dirname, '..'), filePath);
  const parts = relPath.split(path.sep);
  // openspec/specs/<category>/<subcategory>/spec.md
  const category = parts[2] || 'unknown';
  const subcategory = parts[3] || 'unknown';

  // Extract title from first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : subcategory;

  // Extract requirements
  const requirements = [];
  const reqRegex = /^###\s+(REQ-[A-Z0-9]+-[A-Z0-9]+-?[A-Z]*-?\d+):\s*(.+)$/gm;
  let match;
  while ((match = reqRegex.exec(content)) !== null) {
    const id = match[1];
    const reqTitle = match[2].trim();

    // Find enforcement level after this heading
    const afterHeading = content.slice(match.index);
    const enforcementMatch = afterHeading.match(/\*\*Enforcement:\*\*\s*`(\w+)`/);
    const level = enforcementMatch ? enforcementMatch[1] : 'UNKNOWN';

    // Find platforms
    const platformsMatch = afterHeading.match(/\*\*Platforms?:\*\*\s*(.+)/);
    const platformsStr = platformsMatch ? platformsMatch[1].trim() : 'All';
    const platforms = platformsStr === 'All'
      ? ['web', 'ios', 'android', 'desktop', 'tv', 'wearable']
      : platformsStr.toLowerCase().split(/[,/]/).map(p => p.trim().replace(/\(.*\)/, '').trim()).filter(Boolean);

    // Generate tags from category and title words
    const tags = [
      category,
      subcategory.replace(/-/g, ' '),
      ...reqTitle.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !['with', 'from', 'that', 'this', 'over', 'than'].includes(w))
    ].slice(0, 5);

    requirements.push({ id, title: reqTitle, level, platforms, tags });
  }

  return { category, subcategory, title, specPath: relPath, requirements };
}

function generateSpecsJson() {
  const specFiles = findSpecFiles(SPECS_DIR);
  const categories = {};
  const stats = { total_requirements: 0, by_level: {}, by_category: {} };

  for (const file of specFiles) {
    const spec = parseSpec(file);

    if (!categories[spec.category]) {
      categories[spec.category] = {};
    }

    categories[spec.category][spec.subcategory] = {
      title: spec.title,
      spec_path: spec.specPath,
      requirements: spec.requirements
    };

    // Update stats
    stats.total_requirements += spec.requirements.length;
    if (!stats.by_category[spec.category]) {
      stats.by_category[spec.category] = 0;
    }
    stats.by_category[spec.category] += spec.requirements.length;

    for (const req of spec.requirements) {
      stats.by_level[req.level] = (stats.by_level[req.level] || 0) + 1;
    }
  }

  const output = {
    version: '1.0.0',
    generated: new Date().toISOString().split('T')[0],
    categories,
    stats
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n');
  console.log(`Generated ${OUTPUT_FILE}`);
  console.log(`  Total requirements: ${stats.total_requirements}`);
  console.log(`  By level:`, stats.by_level);
  console.log(`  By category:`, stats.by_category);
}

generateSpecsJson();
