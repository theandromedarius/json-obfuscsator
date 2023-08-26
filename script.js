const q = document.querySelector.bind(document);

const textInput = q('#textInput'),
  outputText = q('#outputText'),
  copyButton = q('#copyButton'),
  pasteButton = q('#pasteButton'),
  clearButton = q('#clearButton'),
  submitButton = q('#submitButton'),
  fileInput = q('#fileInput'),
  exportButton = q('#exportButton'); // Tambahkan exportButton ke dalam pemilihan

submitButton.addEventListener('click', () => {
  copyButton.innerHTML = 'Copy';
  copyButton.disabled = false;
  outputText.textContent = filterText(textInput.value);
});

copyButton.addEventListener('click', () => {
  outputText.select();
  document.execCommand('copy');
  copyButton.innerHTML = '&#10003; Copied';
  copyButton.disabled = true;
});

pasteButton.addEventListener('click', async () => {
  textInput.value = await navigator.clipboard.readText();
});

clearButton.addEventListener('click', () => {
  resetPage();
});

fileInput.addEventListener('change', handleFileSelect);

exportButton.addEventListener('click', () => {
  exportOutputFile();
});

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      textInput.value = e.target.result;
    };
    reader.readAsText(file);
  }
}

function filterText(inputText) {
  return inputText
    .split('\n')
    .map((line) =>
      line.trim().startsWith('//') ||
      (line.includes('/*') && !line.includes('*/')) ||
      /^[$#][(]/.test(line) ||
      /^[[(]/.test(line)
        ? line
        : line.toLowerCase().includes('true') ||
          line.toLowerCase().includes('false')
        ? line
        : [...line]
            .map((char) =>
              /[\{\}\[\]\(\):;'",.\'\/ ]/.test(char)
                ? char
                : ((charCode) =>
                    (charCode >= 65 && charCode <= 90) ||
                    (charCode >= 97 && charCode <= 122)
                      ? '\\u' + charCode.toString(16).padStart(4, '0')
                      : char
                  )(char.charCodeAt(0))
            )
            .join('')
    )
    .join('\n');
}

function resetPage() {
  textInput.value = '';
  outputText.textContent = '';
  copyButton.innerHTML = 'Copy';
  copyButton.disabled = false;
}

function exportOutputFile() {
  if (outputText.value) {
    const fileName = fileInput.files[0] ? fileInput.files[0].name.split('.')[0] : 'output';
    const fileType = getFileType(fileInput.files[0] ? fileInput.files[0].name : '');

    const blob = new Blob([outputText.value], { type: `application/${fileType}` });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${fileType}`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

function getFileType(fileName) {
  if (fileName) {
    const extension = fileName.split('.').pop();
    return extension;
  }
  return 'json';
}
