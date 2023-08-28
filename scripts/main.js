const q = document.querySelector.bind(document);
const textInput = q('#textInput'), outputText = q('#outputText');

function handleFileSelect(event) { const file = event.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (e) => { textInput.value = e.target.result; }; reader.readAsText(file); } }

function filterText(inputText) {const lines=inputText.split('\n');let insideComment=false;return lines.map(line=>{if(line.includes('/*')){insideComment=true;}if(insideComment){if(line.includes('*/')){insideComment=false;}return line;}else{return line.includes('\\n')||line.includes('\\t')||line.includes('\\b')||line.includes('\\f')||line.includes('\\r')?line:line.trim().startsWith('//')||/^[$#][(]/.test(line)||/^[[(]/.test(line)?line:line.toLowerCase().includes('true')||line.toLowerCase().includes('false')?line:[...line].map(char=>/[\{\}\[\]\(\):;'",.\'\/ ]/.test(char)?char:((charCode)=>(charCode>=65&&charCode<=90)||(charCode>=97&&charCode<=122)?'\\u'+charCode.toString(16).padStart(4,'0'):char)(char.charCodeAt(0))).join('')}}).join('\n');}

function exportOutputFile() { if (outputText.value) { const fileName = fileInput.files[0]?.name.split('.')[0] || 'output'; const fileType = getFileType(fileInput.files[0]?.name) || 'json'; const blob = new Blob([outputText.value], { type: `application/${fileType}` }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${fileName}.${fileType}`; a.click(); URL.revokeObjectURL(url); } }

function getFileType(fileName) { return fileName ? fileName.split('.').pop() : 'json'; }
