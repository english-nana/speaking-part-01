const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const appJsPath = path.join(projectRoot, 'app.js');
const indexHtmlPath = path.join(projectRoot, 'index.html');

const appJs = fs.readFileSync(appJsPath, 'utf8');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const babelScriptRegex = /<script type="text\/babel" data-presets="react-classic"[^>]*>[\s\S]*?<\/script>/;
const replacement = `<script type="text/babel" data-presets="react-classic">\n${appJs.trim()}\n</script>`;

if (babelScriptRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(babelScriptRegex, replacement);
  fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
  console.log('Successfully synced app.js into index.html');
} else {
  console.error('Could not find Babel script tag in index.html');
  process.exit(1);
}
