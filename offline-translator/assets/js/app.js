let currentDirection = "en-to-ur";

async function translateText() {

    let input = document
        .getElementById("inputText")
        .value
        .trim();

    let output = document.getElementById("output");

    if (input === "") {

        output.innerHTML = "Please enter text";
        return;

    }

    output.innerHTML = "Translating...";

    let sourceLang = "en";
    let targetLang = "ur";

    if(currentDirection === "ur-to-en"){

        sourceLang = "ur";
        targetLang = "en";

    }

    try {

        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(input)}`
        );

        const data = await response.json();

        let translatedText = data[0]
            .map(item => item[0])
            .join("");

        output.innerHTML = translatedText;

    } catch (error) {

        output.innerHTML = "Translation failed";

        console.log(error);

    }

}

function swapLanguage(){

    if(currentDirection === "en-to-ur"){

        currentDirection = "ur-to-en";

        document.querySelector("h1").innerHTML =
        'Urdu ↔ <span>English</span> Translator';

    }
    else{

        currentDirection = "en-to-ur";

        document.querySelector("h1").innerHTML =
        'English ↔ <span>Urdu</span> Translator';

    }

}
function copyText(){

    let text = document
    .getElementById("output")
    .innerText;

    navigator.clipboard.writeText(text);

    alert("Translation Copied ✅");

}