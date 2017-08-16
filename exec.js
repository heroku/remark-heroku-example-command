let report = require('vfile-reporter');
let remark = require('remark');
let styleGuide = require('./index');
let FS = require('fs')

let md_content = FS.readFileSync('./generated_docs.md','utf8')
let file = remark().use(styleGuide).processSync(md_content)


// report(file)
console.log(report(file));