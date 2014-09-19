
var allSongs = [];

for(var i = 0; i < song.length; i++){
	allSongs.push(song[i]);
}

function newRandomSong(){
	newSong(allSongs[Math.floor(Math.random() * allSongs.length)]);
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
	$('.charName').html(character)

}

function getRandomColor(){
	var colors = ['#0066cc', '#e52e90', '#7FFF00', '#FFD700'];
	return colors[Math.floor(Math.random() * colors.length)];
}

function parseSong(file){
	return "img/" + file;
}

function getRandomCharacter(){
	var chars = ['Agiri.gif', 'Ai.png', 'Airi.gif', 'Akarin.gif', 'Akatsuki', 'Alice.png', 'Ana.png', 'Astraea.png', 'Asuha.png', 'Asuka.png', 'Ayase.png'];
	return chars[Math.floor(Math.random() * chars.length)];
}

function fillMain(){
	$('.main').height($(window).height());
}

$(window).resize(fillMain);
$(window).load(fillMain);