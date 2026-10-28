const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const dictionary = require('../lib/translations.json');
const moduleObject = { exports: {} };
const compiled = ts.transpileModule(fs.readFileSync('lib/i18n.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
new Function('require', 'module', 'exports', compiled)(() => dictionary, moduleObject, moduleObject.exports);
const { translate, isLanguage } = moduleObject.exports;
const placeholders = text => [...text.matchAll(/\{\w+\}/g)].map(match => match[0]).sort();
for (const [source, entries] of Object.entries(dictionary)) {
  assert.equal(entries.length, 2, source);
  entries.forEach(value => { assert.ok(value.trim(), source); assert.deepEqual(placeholders(value), placeholders(source), source); });
}
for (const language of ['en', 'el', 'ru']) {
  assert.ok(isLanguage(language));
  for (const model of ['FX-10', 'FX-15', 'FX-17', 'HF2-10', 'HF2-15', 'HF2-17', 'HF2-10S', 'HF2-15S', 'HF2-17S']) {
    const text = translate(language, "Hello! I'm interested in the {model} water filter. Could you tell me the price, availability and whether it is suitable for my home?", { model });
    assert.ok(text.includes(model));
    assert.ok(!text.includes('{model}'));
    assert.equal(decodeURIComponent(encodeURIComponent(text)), text);
  }
}
assert.equal(isLanguage('de'), false);
assert.equal(translate('el', 'FX-10'), 'FX-10');
for (const file of ['app/page.tsx', 'components/support-sections.tsx', 'components/product-enquiry.tsx', 'components/product-catalogue.tsx', 'components/site-header.tsx', 'components/site-footer.tsx', 'components/enquiry-dialog.tsx', 'lib/products.ts']) {
  const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const translatedProperties = ['label', 'description', 'detail', 'purpose', 'topic', 'question', 'answer', 'action', 'enquiry'];
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(ast) === 't' && ts.isStringLiteral(node.arguments[0])) assert.ok(dictionary[node.arguments[0].text], `Missing key in ${file}: ${node.arguments[0].text}`);
    if (ts.isPropertyAssignment(node) && translatedProperties.includes(node.name.getText(ast)) && ts.isStringLiteral(node.initializer)) assert.ok(dictionary[node.initializer.text], `Missing data translation: ${node.initializer.text}`);
    if (ts.isJsxText(node) && /[A-Za-z]/.test(node.text)) assert.ok(['FLUUX', 'FX · HF2 · HF2-S', 'FX COLLECTION'].includes(node.text.trim()), `Untranslated UI in ${file}: ${node.text}`);
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
console.log(`Verified ${Object.keys(dictionary).length} translated entries, all rendered copy and 27 product enquiry messages.`);
