const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(file, dependencies = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', output)(name => { assert.ok(dependencies[name], `Unexpected dependency: ${name}`); return dependencies[name]; }, module, module.exports);
  return module.exports;
}
const data = load('lib/products.ts');
const { filterProducts, readFilters, defaultFilters } = load('lib/catalogue.ts', { './products': data });
assert.equal(data.products.length, 9);
assert.equal(new Set(data.products.map(product => product.model)).size, 9);
assert.equal(data.modelName('HF2-S', 17), 'HF2-17S');
for (const range of ['all', 'FX', 'HF2', 'HF2-S']) for (const size of ['all', '10', '15', '17']) {
  const filters = readFilters(new URLSearchParams({ range, size }));
  const found = filterProducts(filters);
  assert.equal(found.length, (range === 'all' ? 3 : 1) * (size === 'all' ? 3 : 1));
  found.forEach(product => { assert.ok(range === 'all' || product.name === range); assert.ok(size === 'all' || String(product.size) === size); });
}
assert.deepEqual(readFilters(new URLSearchParams('range=unknown&size=22')), defaultFilters);
assert.equal(filterProducts({ ...defaultFilters, query: ' fx 15 ' })[0].model, 'FX-15');
assert.equal(filterProducts({ ...defaultFilters, query: 'HF2-17S' })[0].name, 'HF2-S');
assert.equal(filterProducts({ ...defaultFilters, range: 'FX', query: 'HF2' }).length, 0);
assert.equal(filterProducts({ ...defaultFilters, query: 'not-a-filter' }).length, 0);
assert.equal(filterProducts(defaultFilters).length, 9);
assert.equal(readFilters(new URLSearchParams({ q: 'x'.repeat(200) })).query.length, 80);
console.log('Verified all 16 range/size combinations, model search, URL validation, empty results and reset.');
