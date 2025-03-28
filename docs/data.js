let currentCorpus = {};

// init
window.addEventListener("DOMContentLoaded", () => {
    loadCorpus(false);
});

async function loadCorpus(isPro) {
    const file = isPro ? "data/pro.json" : "data/normal.json";
    try {
        const res = await fetch(file);
        const data = await res.json();
        currentCorpus = data;
        console.log("load corpus", currentCorpus);
    } catch (err) {
        console.error("failed to load corpus", err);
    }
}
