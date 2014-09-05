
var allSongs = [];

for(var i = 0; i < songs.length; i++){
	allSongs.push(songs[i]);
}
newSong(allSongs[0]);


function newSong(obj){
	var songName = obj.songName;
	var actions = [];

	console.log('Playing: ' + songName)
	var mySound = new buzz.sound('audio/' + songName,{
		formats: ['mp3']
	});
	mySound.play()
	   	.fadeIn()
	   	.loop()
	    .bind( "timeupdate", function() {
	       var timer = buzz.toTimer( this.getTime() );
	       //console.log(timer);
	       if(timer in obj.points){
	       		newAction(obj, timer);
	       }
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
	$('.songName').html(obj.songName);
	$('.main').css(bg.style, bg.fill);
	var currentChar = 'img/' + getRandomCharacter();
	console.log(currentChar);
	$('.main').css('background-image', 'url(' + currentChar + ')');
}
function getRandomColor(){
	var colors = ['#0066cc', '#e52e90', '#7FFF00', '#FFD700'];
	return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomCharacter(){
	var chars = ['rei.png', 'taiga.png'];
	return chars[Math.floor(Math.random() * chars.length)];
}
function fillMain(){
	$('.main').height($(window).height());
}
$(window).resize(fillMain);
$(window).load(fillMain);