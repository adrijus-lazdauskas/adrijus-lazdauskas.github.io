// Refresh the readable German HTML fallback after changing app.js.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'dist');
const elements = new Map();
const element = () => ({innerHTML:'',textContent:'',content:'',classList:{toggle(){}},setAttribute(){},addEventListener(){},focus(){}});
const document = {body:element(),documentElement:{dataset:{theme:'light'}},querySelector(selector){if(!elements.has(selector))elements.set(selector,element());return elements.get(selector)},querySelectorAll(){return []}};
const context = {document,localStorage:{getItem(){return null}},matchMedia(){return {matches:false}},location:{href:'https://adrijus-lazdauskas.github.io/'},URL,Math,setTimeout};
vm.runInNewContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),context);
const file=path.join(root,'index.html');
const html=fs.readFileSync(file,'utf8');
let body=document.body.innerHTML.replace('<div id="mail-list" class="mail-list"></div>',`<div id="mail-list" class="mail-list">${elements.get('#mail-list').innerHTML}</div>`).replace('<p id="game-status" role="status" aria-live="polite" aria-atomic="true"></p>','<p id="game-status" role="status" aria-live="polite" aria-atomic="true">Wähle eine der drei Mails.</p>');
body='<noscript><div class="noscript-note wrap">Sprachwechsel, Farbschema und die interaktive Demo benötigen JavaScript. <a href="assets/CV_Adrijus_Lazdauskas_EN.pdf" download>Download English CV</a></div></noscript>'+body;
fs.writeFileSync(file,html.replace(/<body>[\s\S]*<\/body>/,`<body>${body}</body>`));
console.log('Updated German HTML fallback.');
