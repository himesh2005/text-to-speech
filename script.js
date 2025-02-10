let speech = new SpeechSynthesisUtterance();
let voices = [];

const voiceSelect = document.querySelector("select");
const button = document.querySelector("button");
const textarea = document.querySelector("textarea");

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    
    voiceSelect.innerHTML = "";
    voices.forEach((voice, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

window.speechSynthesis.onvoiceschanged = loadVoices;

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

button.addEventListener("click", () => {
    let text = textarea.value.trim();
    
    if (text.length === 0) {
        alert("Please enter text to speak!");
        return;
    }

    speech.text = text;
    window.speechSynthesis.speak(speech);
});
loadVoices();
