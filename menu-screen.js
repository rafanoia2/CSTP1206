// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(startMusic) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.startMusic = startMusic;
    this.JSON_PATH = 'https://raw.githubusercontent.com/rafanoia2/CSTP1206/master/songs.json';
    this.Info = [];
   	this.theme = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space']

    this.load = this.load.bind(this);
    this.onJsonReady = this.onJsonReady.bind(this);
    this.render = this.render.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);

    //  Listener
    const form = document.querySelector('form');
    form.addEventListener('submit', this.onSubmit);

    // If Listener error
    const text = document.querySelector('#query-input');
	text.addEventListener('input', function() {
	  const error = document.querySelector('#error');
      error.classList.add("inactive");
	})

    // load music
    this.load();
  }


  onSubmit(e) {
  	e.preventDefault();
  	const input = document.querySelector('#query-input');
  	
  	// to choose a theme randomly with math function
  	var themeValue = input.value;
  	if(input.value == ''){
  		themeValue = this.theme[ Math.floor(Math.random()*this.theme.length) ];
  	}

  	var obj = {
  		songValue : this.url,
  		gifValue : themeValue
  	}
  	console.log(obj);
  	this.startMusic(obj);
  }

  render() {
  	// title
    this.select = document.querySelector('#song-selector');
    this.select.innerHTML = '';
    var flag = 1;						
    for (const info in this.Info) {
      
	  const opt = document.createElement('option');
	  opt.text = this.Info[info].title;
	  opt.value = info;
	  if( flag == 1 ){					
	  	opt.selected = "true";
	  	this.url = this.Info[info].songUrl;
	  	flag = 0;
	  }
	  this.select.append(opt);
    }

    // Create eventListener
    this.select.addEventListener('change', this.selectChange);

    // random theme
    const theme = this.theme[ Math.floor(Math.random()*this.theme.length) ];
    const themeInput = document.querySelector('#query-input');
    themeInput.value = theme;

  }

  selectChange() {
	const index = this.select.selectedIndex;
    this.url = this.Info[this.select.options[index].value].songUrl;
    
  }

  load() {
    fetch(this.JSON_PATH)
        .then(this.onResponse)
        .then(this.onJsonReady);
  }

  onJsonReady(json) {
    this.Info = json;
    this.render();
    console.log(this.Info);
  }

  onResponse(response) {
    return response.json();
  }
}
