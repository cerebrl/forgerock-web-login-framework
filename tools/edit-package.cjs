const path = require('path');
const fs = require('fs');
const root = require('../package.json');
const pkg = require('../package/package.json');

pkg.version = process.argv[process.argv.length - 1];

const pkgPath = path.resolve(__dirname, '../package/package.json');
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
