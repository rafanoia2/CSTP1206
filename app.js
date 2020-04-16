
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
   
    this.startMusic = this.startMusic.bind(this);
    this.menu = new MenuScreen(this.startMusic);
    this.music = new MusicScreen();
  }
  startMusic(obj){
  	this.music.load(obj);
  }
}
