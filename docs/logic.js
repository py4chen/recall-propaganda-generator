function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatWithLineBreaks(text) {
    return text.replace(/([。！？，])(?!(」|』|”))/g, '$1\n');
}

function decorate(text) {
    return text
}

function generate() {
    const issue = document.getElementById("issueInput").value.trim();
    if (!issue) return alert("請輸入一個社會議題短語！");

    const parts = [
        random(currentCorpus.memory),
        random(currentCorpus.enemy).replaceAll("{議題}", issue),
        random(currentCorpus.connection).replaceAll("{議題}", issue),
        random(currentCorpus.action).replaceAll("{議題}", issue),
        random(currentCorpus.rebuttal).replaceAll("{議題}", issue)
    ];

    const formatted = parts.map(p => formatWithLineBreaks(decorate(p))).join('\n');

    document.getElementById("output").innerText = formatted;
}

function copyText() {
    const text = document.getElementById("output").innerText;
    if (!text) return alert("沒有可以複製的文宣喔！");
    navigator.clipboard.writeText(text).then(() => {
        alert("文宣已複製到剪貼簿！");
    });
}

function downloadAsImage() {
    const output = document.getElementById("output");
    if (!output.innerText.trim()) return alert("請先產生文宣再下載！");

    html2canvas(output).then(canvas => {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

function openModal() {
    document.getElementById("aboutModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("aboutModal").style.display = "none";
}

function openLangModal() {
    document.getElementById("aboutLangModal").style.display = "flex";
}

function closeLangModal() {
    document.getElementById("aboutLangModal").style.display = "none";
}


function toggleProMode(bodyColorToken) {
    const isPlus = document.getElementById("plusToggle").checked;
    document.body.classList.toggle(bodyColorToken, isPlus);

    if (isPlus) {
        document.body.classList.add(bodyColorToken);
    } else {
        document.body.classList.remove(bodyColorToken);
    }

    loadCorpus(isPlus);
}

function selectPreset(text) {
    document.getElementById("issueInput").value = text;
}

function switchPolitics(p) {
    window.location.href = `${p}.html`;
}
