let currentCorpus = {};

const allCorpus = {};
let categories = [];

// init
window.addEventListener("DOMContentLoaded", async () => {
    isBlueWhiteOut = window.location.pathname.includes("bluewhiteout");
    await loadAllCorpus(isBlueWhiteOut)
    loadCorpus("all")
    loadSuggestion()
    loadMetadata()
});

async function loadAllCorpus(isBlueWhiteOut) {
    const dir = isBlueWhiteOut ? "corpus_bluewhiteout" : "corpus_greenout";
    const selector = document.getElementById("corpusSelector");
    selector.innerHTML = "";
    try {
        const res = await fetch(`${dir}/config.json`);
        const config = await res.json();
        categories = config["categories"]

        // all options
        allCorpus["all"] = {};
        for (const key of categories) {
            allCorpus["all"][key] = [];
        }
        const optionAll = document.createElement("option");
        optionAll.value = "all";
        optionAll.textContent = "全部都要";
        selector.appendChild(optionAll);

        for (const name in config["files"]) {
            allCorpus[name] = {};
            for (const key of categories) {
                allCorpus[name][key] = [];
            }

            const fileNames = config["files"][name];

            for (const filename of fileNames) {
                const url = `${dir}/${filename}`;
                const fileRes = await fetch(url);
                const data = await fileRes.json();

                for (const key of categories) {
                    if (Array.isArray(data[key])) {
                        allCorpus[name][key].push(...data[key]);
                        allCorpus["all"][key].push(...data[key]);
                    }
                }
            }

            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            selector.appendChild(option);
        }
    } catch (err) {
        console.error("failed to load all corpus, ", err);
    }
}

function loadCorpus(name) {
    currentCorpus = allCorpus[name];
    console.log("switch corpus to", name);
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
