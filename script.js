const textInput = document.getElementById('textInput');
const outputText = document.getElementById('outputText');
const outputTextbox = document.getElementById('outputTextbox');
const submitButton = document.getElementById('submitButton');
const copyButton = document.getElementById('copyButton');
const pasteButton = document.getElementById('pasteButton');
const clearButton = document.getElementById('clearButton');

submitButton.addEventListener('click', () => {
    resetCopyButton();
    const inputText = textInput.value;
    const filteredText = filterText(inputText);
    outputText.textContent = filteredText;
    outputTextbox.value = filteredText;
});

copyButton.addEventListener('click', () => {
    const outputTextarea = document.getElementById('outputText');
    outputTextarea.select();
    document.execCommand('copy');

    copyButton.innerHTML = '&#10003; Copied';
    copyButton.disabled = true;
});

pasteButton.addEventListener('click', () => {
    navigator.clipboard.readText().then(pastedText => {
        textInput.value = pastedText;
    });
});

clearButton.addEventListener('click', () => {
    location.reload();
});

function resetCopyButton() {
    copyButton.innerHTML = 'Copy';
    copyButton.disabled = false;
}

function filterText(inputText) {
    const lines = inputText.split('\n');
    const filteredLines = lines.map(line => {
        if (line.trim().startsWith('//')) {
            return line;
        }
        if (line.includes('/*') && !line.includes('*/')) {
            return line;
        }
        if (/^[$#][(]/.test(line) || /^[[(]/.test(line)) {
            return line;
        }
        let filteredLine = '';
        const lowerCaseLine = line.toLowerCase();
        if (lowerCaseLine.includes('true') || lowerCaseLine.includes('false')) {
            return line;
        }
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (/[\{\}\[\]\(\):;'",.\'\/]/.test(char) || char === ' ') {
                filteredLine += char;
            } else {
                const charCode = char.charCodeAt(0);
                if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
                    filteredLine += '\\u' + charCode.toString(16).padStart(4, '0');
                } else {
                    filteredLine += char;
                }
            }
        }
        return filteredLine;
    });
    return filteredLines.join('\n');
}
