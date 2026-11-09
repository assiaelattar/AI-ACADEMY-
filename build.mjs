import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','app.js','favicon.svg','og-future-makers-v1.jpg']) await copyFile(file,`dist/${file}`);
console.log('Built static website in dist/');
