let currentCorpus = {};

// init
window.addEventListener("DOMContentLoaded", () => {
    loadCorpus(false);
    loadSuggestion()
    loadMetadata()
});

async function loadCorpus(isPro) {
    const file = isPro ? "data/pro.json" : "data/normal.json";
    try {
        const res = await fetch(file);
        const data = await res.json();
        currentCorpus = data;
        console.log("load corpus from ", file);
    } catch (err) {
        console.error("failed to load corpus", err);
    }
}

let presetSuggestions = []

async function loadSuggestion() {
    const file = "data/suggestion.json";
    try {
        const res = await fetch(file);
        const data = await res.json();
        presetSuggestions = data;
        console.log("load suggestion from ", file);
    } catch (err) {
        console.error("failed to load suggestion", err);
    }

    const suggestionBox = document.getElementById("suggestionBox");

    presetSuggestions.forEach((item, index) => {
        const span = document.createElement("span");
        span.className = "suggestion";
        span.textContent = item;
        span.onclick = () => selectPreset(item);
        span.style.marginRight = "0.5em";
        suggestionBox.appendChild(span);

        if (index < presetSuggestions.length - 1) {
            suggestionBox.appendChild(document.createTextNode(" "));
        }
    });
}

let metadata = {}

async function loadMetadata() {
    const file = "metadata.json";
    try {
        const res = await fetch(file);
        const metadata = await res.json();

        const versionEl = document.getElementById("version");
        versionEl.textContent = metadata.version;
        console.log("load version ", versionEl.content);
    } catch (err) {
        console.error("failed to load version", err);
    }
}
