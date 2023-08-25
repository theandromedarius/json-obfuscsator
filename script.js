const textInput = document.getElementById('textInput');
const outputText = document.getElementById('outputText');
const outputTextbox = document.getElementById('outputTextbox');
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    const inputText = textInput.value;
    const filteredText = filterText(inputText);
    outputText.textContent = filteredText;
    outputTextbox.value = filteredText;
});

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
        const lowerCaseLine = line.toLowerCase(); // Convert line to lowercase for case-insensitive comparison
        if (lowerCaseLine.includes('true') || lowerCaseLine.includes('false')) {
            return line; // Ignore 'true' and 'false' keywords
        }
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (/[\{\}\[\]\(\):;'",.\'\/]/.test(char)) {
                filteredLine += char;
            } else if (char === ' ') {
                if (filteredLine.endsWith('$') || filteredLine.endsWith('#')) {
                    filteredLine += char;
                }
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
