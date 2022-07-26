const esbuild = require('esbuild');
 
esbuild.build({
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  sourcemap: true,
  watch: process.argv.includes("--watch"),
  outdir: 'app/assets/builds',
  loader: {
    '.eot': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.svg': 'file',
    '.ttf': 'file',
  }
}).catch((e) => console.error(e.message));