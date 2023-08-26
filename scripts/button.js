const copyButton = q('#copyButton'), pasteButton = q('#pasteButton'), clearButton = q('#clearButton'), submitButton = q('#submitButton'), fileInput = q('#fileInput'), exportButton = q('#exportButton');

submitButton.addEventListener('click', () => { copyButton.innerHTML = 'Copy'; copyButton.disabled = false; outputText.textContent = filterText(textInput.value); exportButton.style.marginRight = '';});

copyButton.addEventListener('click', () => { outputText.select(); document.execCommand('copy'); copyButton.innerHTML = '&#10003; Copied'; copyButton.disabled = true; exportButton.style.marginRight = "25px"; });

pasteButton.addEventListener('click', async () => { textInput.value = await navigator.clipboard.readText(); });

clearButton.addEventListener('click', resetPage);

fileInput.addEventListener('change', handleFileSelect);

exportButton.addEventListener('click', exportOutputFile);