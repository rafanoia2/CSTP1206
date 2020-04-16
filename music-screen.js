// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    // first i bind the fields

    this.load = this.load.bind(this);
    this.onJsonReady = this.onJsonReady.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.replay = this.replay.bind(this);
    this.showMusicPage = this.showMusicPage.bind(this);

  }
  // TODO(you): Add methods as necessary.

  play() {
  	this.audioPlayer = new AudioPlayer();
	this.audioPlayer.setSong(this.obj.songValue);
    this.playButton = new PlayButton(this.pause, this.replay);
	this.gifDisplay = new GifDisplay(this.Info, this.showMusicPage);
	this.audioPlayer.setKickCallback(this.gifDisplay.nextGif);
  }

  showMusicPage(){
  	const loadingPage = document.querySelector('#loadingPage');
  	loadingPage.classList.add("block");
  	const gifPage = document.querySelector('#gifPage');
  	gifPage.classList.remove("block");

    this.audioPlayer.play();
    this.gifDisplay.nextPreLoad();
  }

  pause() {
  	this.audioPlayer.pause();
  }

  replay() {
  	this.audioPlayer.play();
  }

// now, i set up the gif search by the url. I had to create a api key on giphy developer to have access to the key
// my api key is lnI8GMo93AWVk8O8mCGZ9wLIS6eLMW86

  load(obj) {

  	this.obj = obj;
  	this.JSON_PATH = 'https://api.giphy.com/v1/gifs/search?q='+ encodeURIComponent(obj.gifValue) +'&api_key=lnI8GMo93AWVk8O8mCGZ9wLIS6eLMW86&limit=25&rating=g';
  	console.log(this.JSON_PATH);

    fetch(this.JSON_PATH)
        .then(this.onResponse)
        .then(this.onJsonReady);
  }

  onJsonReady(json) {

    this.Info = json;
    console.log(this.Info);

    // if the lengh is less than 2 gifs show the loading page, if not give the error
    if(this.Info.data.length >= 2){
      const menu = document.querySelector('#menu');
  	  menu.classList.add("block");
  	  const loadingPage = document.querySelector('#loadingPage');
  	  loadingPage.classList.remove("block");
      this.play();
    }
    else{	
      const error = document.querySelector('#error');
      error.classList.remove("inactive");
    }
  }

  onResponse(response) {
    return response.json();
  }

}
