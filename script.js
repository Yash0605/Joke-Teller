// apiKey = 5f2033a38bb24c149d79be937ac19471
const buttonElement = document.getElementById("button");
const audioElement = document.getElementById("audio");

function tellMe(src) {
  VoiceRSS.speech({
    key: "5f2033a38bb24c149d79be937ac19471",
    src: src,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get joke from a joke api
async function getJokes() {
  const jokeApi = "https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,sexist";
  buttonElement.setAttribute('disabled', true)
  try {
    const joke = await fetch(jokeApi);
    const jokeResponse = await joke.json();
    if (jokeResponse) {
      if(jokeResponse.error) {
        throw jokeResponse.error;
      } else {
        const jokeText = jokeResponse.setup ? `${jokeResponse.setup} ... ${jokeResponse.delivery}` : jokeResponse.joke;
        tellMe(jokeText);
      }
    } else {
      throw "error";
    } 
    
  } catch(e) {
    console.log("Oopsie Woopsie guess the joke's on us " + e);
  }
}

buttonElement.addEventListener("click", getJokes);

// To keep track of when the joke has ended
audioElement.addEventListener("ended", () => {
  buttonElement.disabled = false;  
});
