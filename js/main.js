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
				formats: ['mp3'],
				preload: true,
				autoplay: true,
				loop: true
			});
			
			song.bind( "timeupdate", function() {
       			
       			
       			setInterval(hues.doBeat(obj, this.getExactDuration(), this.getTime()), 20);

       			

    		});
		},

		doBeat: function(obj, duration, curtime){
			console.log(arguments)
			var beatMap = obj.rhythm;
			var beatIndex = Math.floor(curtime / (duration / beatMap.length))
			var currentBeat = beatMap[beatIndex];

			var txt = '>>' + beatMap.substr(beatIndex+1);
			var ti = 0;
			while(txt.length < 100){
				txt += beatMap[ti];
				ti = (ti+1) % beatMap.length;
			}
			
			//hues.updateView(obj, utilities.getNextColor());
			hues.doAction(obj, currentBeat, txt)
		},

		doAction: function(obj, beat, txt){
			console.log(beat)
			if(beat !== "."){
				hues.updateView(obj, utilities.getNextColor(), txt);
			}
		},

		updateView: function(obj, color, txt){
			var character = utilities.getRandomFromArray(characters);


			$('.main')
			.css('background-image', 'url(' + utilities.parseSong(character) + ')')
			.css('background-color', color.value);

			var template = Handlebars.compile( $('#template').html() );
			var context = {
				colorName: color.name,
				charName: character,
				songName: obj.title,
				rhythm: txt
			};
			$('.overlay').empty().append(template(context));
		}
	}

	hues.init();

	

	utilities.fillScreen();
	$(window).resize(utilities.fillScreen);

	$('#next').click(function(){
		hues.newRandomSong();
	})
});