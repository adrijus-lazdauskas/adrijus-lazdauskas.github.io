// Refresh the readable English HTML fallback after changing the site scripts.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'dist');
const elements = new Map();
const element = () => ({innerHTML:'',textContent:'',content:'',classList:{toggle(){}},setAttribute(){},addEventListener(){},focus(){}});
const document = {body:element(),documentElement:{dataset:{theme:'light'}},querySelector(selector){if(!elements.has(selector))elements.set(selector,element());return elements.get(selector)},querySelectorAll(){return []}};
const context = vm.createContext({document,localStorage:{getItem(){return null}},matchMedia(){return {matches:false}},location:{href:'https://adrijus-lazdauskas.github.io/'},URL,Math,setTimeout});
for (const script of ['planner.js','app.js']) vm.runInContext(fs.readFileSync(path.join(root,script),'utf8'),context);
const file = path.join(root,'index.html');
let html = fs.readFileSync(file,'utf8');
const note = '<noscript><div class="noscript-note wrap">Language switching, theme controls and the interactive demo require JavaScript. <a href="assets/CV_Adrijus_Lazdauskas_DE.pdf" download>Lebenslauf auf Deutsch herunterladen</a></div></noscript>';
const body = note + document.body.innerHTML;
html = html.replace(/<html lang="[^"]+"/, '<html lang="en"').replace(/(<meta name="description" content=")[^"]+/, '$1' + elements.get('meta[name=description]').content);
fs.writeFileSync(file,html.replace(/<body>[\s\S]*<\/body>/,`<body>${body}</body>`));
console.log('Updated English HTML fallback.');
