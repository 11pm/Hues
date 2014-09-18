
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
	var mySound = new buzz.sound('audi/' + obj['-name'],{
		formats: ['mp3']
	});
	mySound.play()
	   	.fadeIn()
	   	.loop()
	    .bind( "timeupdate", function() {
	       var time = this.getTime();
	       var duration = this.getDuration();
	       var percent = buzz.toPercent(time, duration, 1);

	       //console.log(allSongs.length/percent);
	       //console.log(obj.rhythm);
	    });
	updateTemplate(obj, {style: "background-color", fill: "white"});
	//newSong(allSongs[Math.floor(Math.random() * allSongs.length)])
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
	var currentChar = 'img/' + character;
	$('.main').css(bg.style, bg.fill);
	$('.main').css('background-image', 'url(' + currentChar + ')');

	var template = Handlebars.compile($('#overlay').html());

	var context = {
		songName: obj.title,
		charName: character
	};

	$('.overlay').html(template(context));
	}
function getRandomColor(){
	var colors = ['#0066cc', '#e52e90', '#7FFF00', '#FFD700'];
	return colors[Math.floor(Math.random() * colors.length)];
}
function addExt(file){
	return file + '.png';
}
function getRandomCharacter(){
	var chars = ['Aisaka_Taiga', 'Zakuro'];
	return addExt(chars[Math.floor(Math.random() * chars.length)]);
}
function fillMain(){
	$('.main').height($(window).height());
}
$(window).resize(fillMain);
$(window).load(fillMain);