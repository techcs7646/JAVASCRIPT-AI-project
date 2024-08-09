const start = document.querySelector("#start");
const stop = document.querySelector("#end");
const speak = document.querySelector("#speak");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false; // Only get final results for faster processing

    recognition.onstart = function () {
        console.log("Voice recognition activated.");
    };

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log("Transcript:", transcript);

        if (transcript.includes("hi jarvis")) {
            readOut("Hello sir");
        } else if (transcript.includes("open youtube")) {
            readOut("Opening YouTube, sir");
            window.location.href = "https://www.youtube.com/";
        } else if (transcript.includes("open google")) {
            readOut("Opening Google, sir");
            window.location.href = "https://www.google.com/";
        } else if (transcript.includes("search for")) {
            let query = transcript.split("search for")[1]?.trim();
            if (query) {
                query = encodeURIComponent(query);
                console.log("Search query:", query);
                window.location.href = `https://www.google.com/search?q=${query}`;
            } else {
                readOut("Please say a query after 'search for'.");
            }
        } else if (transcript.includes("open firebase") || transcript.includes("open fire base")) {
            readOut("Opening Firebase console");
            window.location.href = "https://www.firebase.com/";
        } else if (transcript.includes("open linkedin") || transcript.includes("open linked in")) {
            readOut("Opening LinkedIn, sir");
            window.location.href = "https://www.linkedin.com/";
        }
    };

    recognition.onerror = function (event) {
        console.error("Recognition error:", event.error);
    };

    recognition.onend = function () {
        console.log("Voice recognition deactivated.");
    };

    start.addEventListener("click", () => {
        console.log("Starting recognition...");
        recognition.start();
    });

    stop.addEventListener("click", () => {
        console.log("Stopping recognition...");
        recognition.stop();
    });
} else {
    console.error("Speech recognition not supported in this browser.");
}

function readOut(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
    console.log("Speaking out:", message);
}

speak.addEventListener("click", () => {
    readOut("Hello, Deepak. Let's code something epic today.");
});
