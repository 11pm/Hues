$(document).ready(function(){

	var utilities = {

		files: 'img/',
		colorPos: 0,

		fillScreen: function(){
			$('.main').height($(window).height());
		},

		parseSong: function(song){
			return this.files + song + '.png';
		},

		getRandomFromArray: function(array){
			var randIndex = Math.floor( Math.random() * array.length );
			return array[randIndex];
		},

		getNextColor: function(){
			//if at last return first
			this.colorPos++;
			console.log(this.colorPos)
			console.log(colors.length)
			if(this.colorPos === colors.length){
				this.colorPos = 0;
				return colors[0];
			}
			else{
				return colors[this.colorPos];
			}
		},

		shuffle: function(array){
			var currentIndex = array.length, temporaryValue, randomIndex ;

			  	// While there remain elements to shuffle...
			  	while (0 !== currentIndex) {

				    // Pick a remaining element...
				    randomIndex = Math.floor(Math.random() * currentIndex);
				    currentIndex -= 1;

				    // And swap it with the current element.
				    temporaryValue = array[currentIndex];
				    array[currentIndex] = array[randomIndex];
				    array[randomIndex] = temporaryValue;
		 		}

 			return array;
		},

		
	}

	var hues = {
		
		init: function(){
			this.newRandomSong();
		},

		newRandomSong: function(){
			//Make color order random
			utilities.shuffle(colors);
			//Play random song
			this.playSong(utilities.getRandomFromArray(songs));
		},

		playSong: function(obj){
			buzz.all().stop();

			var songName = obj.title;

			var song = new buzz.sound('audio/' + obj['-name'], {
				formats: ['mp3']
			});

			song
			.play()
			.loop()
			.bind( "timeupdate", function() {
       			var timer = buzz.toTimer( this.getTime() );
       			
       			hues.updateView(obj, utilities.getNextColor());

    		});

		},

		updateView: function(obj, color){
			var character = utilities.getRandomFromArray(characters);


			$('.main')
			.css('background-image', 'url(' + utilities.parseSong(character) + ')')
			.css('background-color', color.value);

			$('.songName')
			.html(obj.title);	
			$('.charName')
			.html(character);
			$('.colorName')
			.html(color.name);
			$('.rhythm')
			.html(obj.rhythm.length);
		}
	}

	hues.init();

	

	utilities.fillScreen();
	$(window).resize(utilities.fillScreen);

	$('#next').click(function(){
		hues.newRandomSong();
	})
});
/*function newRandomSong(){
	newSong(songs[Math.floor(Math.random() * songs.length)]);
}

newSong(allSongs[7]);


function newSong(obj){
	buzz.all().stop();
	var songName = obj["title"];
	var actions = [];
	console.log(obj);

	console.log('Playing: ' + obj["-name"]);
	var mySound = new buzz.sound('audio/' + obj['-name'],{
		formats: ['mp3']
	});
	mySound.play()
	   	.fadeIn()
	   	.loop()
	    .bind( "timeupdate", function() {
	       var time = this.getTime();
	       var duration = this.getDuration();
	       var percent = buzz.toPercent(time, duration, 1);

	      
	    });

	updateTemplate(obj, {style: "background-color", fill: "white"});
}
function newAction(obj, time){
	var points = obj.points;
	var action = points[time];
	var attr  = "background-color";
	switch(action){
		case 1:
			updateTemplate(obj, {style: attr, fill: getRandomColor()});
			break;
		case 2:
			updateTemplate(obj, {style: attr, fill: "black"});
			break
	}
}
function updateTemplate(obj, bg){

	var character = getRandomCharacter()

	$('.main').css('background-image', 'url(' + parseSong(character) + ')').css(bg.style, bg.fill);

	$('.songName').html(obj.title);
	t	$('.charName').html(character)

}

function getRandomColor(){
	var colors = ['#0066cc', '#e52e90', '#7FFF00', '#FFD700'];
	return colors[Math.floor(Math.random() * colors.length)];
}

function parseSong(file){
	return "img/" + file + ".png";
}

function getRandomCharacter(){
	return characters[Math.floor(Math.random() * characters.length)];
}

function fillMain(){
	$('.main').height($(window).height());
}

$(window).resize(fillMain);
$(window).load(fillMain);*/