let currentCorpus = {};

const allCorpus = {};
const categories = ['memory', 'enemy', 'connection', 'action', 'rebuttal'];

// init
window.addEventListener("DOMContentLoaded", async () => {
    isBlueWhiteOut = window.location.pathname.includes("bluewhiteout");
    await loadAllCorpus(isBlueWhiteOut)
    loadCorpus(false)
    loadSuggestion()
    loadMetadata()
});

async function loadAllCorpus(isBlueWhiteOut) {
    const dir = isBlueWhiteOut ? "corpus_bluewhiteout" : "corpus_greenout";
    try {
        const res = await fetch(`${dir}/filelist.json`);
        const filelist = await res.json();

        for (const category in filelist) {
            allCorpus[category] = {
                memory: [],
                enemy: [],
                connection: [],
                action: [],
                rebuttal: []
            };

            const fileNames = filelist[category];

            for (const filename of fileNames) {
                const url = `${dir}/${filename}`;
                const fileRes = await fetch(url);
                const data = await fileRes.json();

                for (const key of categories) {
                    if (Array.isArray(data[key])) {
                        allCorpus[category][key].push(...data[key]);
                    }
                }
            }
        }
    } catch (err) {
        console.error("failed to load all corpus, ", err);
    }
}

async function loadCorpus(isPlus) {
    try {
        currentCorpus = isPlus ? allCorpus["plus"] : allCorpus["normal"];
        console.log(`successfully loaded corpus for plus ${isPlus}`);
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
