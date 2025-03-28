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
        random(data.memory),
        random(data.enemy).replaceAll("{議題}", issue),
        random(data.connection).replaceAll("{議題}", issue),
        random(data.action).replaceAll("{議題}", issue),
        random(data.rebuttal).replaceAll("{議題}", issue)
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

function shareToThreads() {
    const output = document.getElementById("output").innerText.trim();
    if (!output) return alert("請先產生文宣再分享！");

    const base = "https://www.threads.net/intent/post?text=";
    const signature = "\n\n藍白下台機 文宣產生器 https://py4chen.github.io/bluewhiteout/";
    const fullText = output + signature;
    const encoded = encodeURIComponent(fullText);

    window.open(base + encoded, '_blank');
}
