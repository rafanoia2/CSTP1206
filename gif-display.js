// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(info, showMusicPage) {
    // TODO(you): Implement the constructor and add fields as necessary.
    // 
    this.Info = info;
    this.showMusicPage = showMusicPage;
    this.frontGif = '';
    this.backGif = '';
    this.preload = [];
    this.preloadLength = 2;
    this.flag = 1;				
    this.front = document.querySelector('.front');
	this.back = document.querySelector('.back');

    this.nextGif = this.nextGif.bind(this);
    this.randomGif = this.randomGif.bind(this);
    this._preload = this._preload.bind(this);
    this.nextPreLoad = this.nextPreLoad.bind(this);
    this.second = this.second.bind(this);

    // here i load the first Gif
    var myImage = new Image();
	myImage.src = this.Info.data[0].images.downsized.url;
	myImage.addEventListener("load", this.second);
	this.frontGif = myImage.src;
	this.front.style.backgroundImage = "url('"+ this.frontGif +"')";
	this.preload.push(myImage);

  }

  // and now the second Gif
  second() {
  	console.log('finish 0');
  	var myImage = new Image();
	myImage.src = this.Info.data[1].images.downsized.url;
	myImage.addEventListener("load", this.showMusicPage);
	this.backGif = myImage.src;
	this.back.style.backgroundImage = "url('"+ this.backGif +"')";
	this.preload.push(myImage);
  }
 // had to difer the preload with a _ because there is a function with preload
  _preload(index) {

  	// create the Gif
	if(this.myImage){
	  	this.preload.push(this.myImage);
	}

  	if(index == this.Info.data.length){
  		console.log(this.preload);
  		for(var k in this.preload){
  			console.log(k);
  			console.log(this.preload[k].src);
  			console.log(this.Info.data[k].images.downsized.url);
  		}
  		return;
  	}

  	// preload Gif
  	this.preloadLength = this.preloadLength + 1;
  	this.myImage = new Image();
	this.myImage.src = this.Info.data[index].images.downsized.url;
	this.myImage.addEventListener("load", this.nextPreLoad);

  }

  nextPreLoad() {
  	console.log('finish %d' , this.preloadLength-1);
  	this._preload(this.preloadLength);
  }

  randomGif(){
  	if(this.flag == 1){
  	  this.flag = 0;
  	  do{
		this.frontGif = this.preload[ Math.floor(Math.random()*this.preload.length) ].src;
	  }while(this.frontGif === this.backGif);
	  this.front.style.backgroundImage = "url('"+ this.frontGif +"')";
	}
	else{
	  this.flag = 1;
	  do{
		this.backGif = this.preload[ Math.floor(Math.random()*this.preload.length) ].src;
	  }while(this.frontGif === this.backGif);
	  this.back.style.backgroundImage = "url('"+ this.backGif +"')";
	}
	console.log('front: '+this.frontGif);
	console.log('back: '+this.backGif);
  }

  nextGif() {
	console.log('kick!');
	
	if(this.flag == 1){
		this.front.style.zIndex = "1";
		this.back.style.zIndex = "2";
		this.randomGif();
	}
	else{
		this.front.style.zIndex = "2";
		this.back.style.zIndex = "1";
		this.randomGif();
	}
  }

}
