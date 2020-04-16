// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(pause, replay) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.pause = pause;
    this.replay = replay;

    this.pause = this.pause.bind(this);
    this.replay = this.replay.bind(this);

    this.btn = document.querySelector('#btn');
    this.btn.addEventListener('click', this.pause);
  }
// create the buttons and linked to the images

  pause() {
  	console.log('pause');
  	this.pause();
  	this.btn.src = "./images/play.png";
  	this.btn.removeEventListener('click', this.pause);
  	this.btn.addEventListener('click', this.replay);
  }

  replay() {
  	console.log('replay');
  	this.replay();
  	this.btn.src = "./images/pause.png";
  	this.btn.removeEventListener('click', this.replay);
  	this.btn.addEventListener('click', this.pause);
  }

}
