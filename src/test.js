/**
 * test.js
 * Lightweight smoke-tests for all three modes.
 * Run with: node src/test.js
 */

import { MODE, getModeInfo } from './modes.js';
import { validate } from './validator.js';
import { generateTemplate } from './templates.js';
import { runPipeline } from './pipeline.js';
import { getExamplesForMode, getExample } from './examples.js';

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`  ✅ ${description}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${description}`);
    failed++;
  }
}

// ── Mode metadata ────────────────────────────────────────────────────────────
console.log('\n📋 Mode metadata');
for (const mode of Object.values(MODE)) {
  const info = getModeInfo(mode);
  assert(`getModeInfo(${mode}) returns label`, typeof info.label === 'string');
  assert(`getModeInfo(${mode}) has requiredSections`, Array.isArray(info.requiredSections));
  assert(`getModeInfo(${mode}) has inputPrompts`, typeof info.inputPrompts === 'object');
}

// ── Template generation ──────────────────────────────────────────────────────
console.log('\n🔧 Template generation');
const inputs = { concept: 'Tap coins to build an empire', audience: 'Casual gamers 18-35' };

for (const mode of Object.values(MODE)) {
  const output = generateTemplate(mode, inputs);
  const { requiredSections } = getModeInfo(mode);
  const missing = requiredSections.filter(sectionKey => !output[sectionKey] || !output[sectionKey].trim());
  assert(`${mode}: all required sections present`, missing.length === 0);
  assert(`${mode}: code section is non-trivial`, typeof output.code === 'string' && output.code.length > 50);
}

// ── Validation ───────────────────────────────────────────────────────────────
console.log('\n✅ Validation');
for (const mode of Object.values(MODE)) {
  const output = generateTemplate(mode, inputs);
  const result = validate(output, mode);
  assert(`${mode}: validation passes`, result.passed);
  assert(`${mode}: validation results is array`, Array.isArray(result.results));
  const failedRules = result.results.filter(r => !r.passed).map(r => r.ruleId);
  if (failedRules.length) console.error(`    Failed rules: ${failedRules.join(', ')}`);
}

// Validation should FAIL for an empty output
const emptyValidation = validate({}, MODE.HYBRID);
assert('Empty output fails validation', !emptyValidation.passed);

// ── Pipeline ─────────────────────────────────────────────────────────────────
console.log('\n🚀 Pipeline');
for (const mode of Object.values(MODE)) {
  const { output, validation, steps } = runPipeline(mode, inputs);
  assert(`${mode}: pipeline returns output`, typeof output === 'object');
  assert(`${mode}: pipeline validation passes`, validation.passed);
  assert(`${mode}: pipeline steps is array`, Array.isArray(steps) && steps.length >= 1);
}

// Hybrid pipeline must have exactly 3 steps
const hybrid = runPipeline(MODE.HYBRID, inputs);
assert('Hybrid pipeline has 3 steps', hybrid.steps.length === 3);

// ── Examples ─────────────────────────────────────────────────────────────────
console.log('\n📚 Examples');
for (const mode of Object.values(MODE)) {
  const examples = getExamplesForMode(mode);
  assert(`${mode}: has at least 1 example`, examples.length >= 1);
  const ex = getExample(mode, 0);
  assert(`${mode}: first example has prompt`, typeof ex.prompt === 'string');
  assert(`${mode}: first example has output`, typeof ex.output === 'object');

  // Validate the example output
  const exValidation = validate(ex.output, mode);
  assert(`${mode}: example output passes validation`, exValidation.passed);
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(40)}`);
console.log(`Tests: ${passed + failed} total — ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.error('❌ Some tests failed.');
  process.exit(1);
} else {
  console.log('✅ All tests passed.');
}
