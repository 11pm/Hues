
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
	       console.log(timer);
	       if(timer in obj.points){
	       		newAction(obj, timer);
	       }
	    });
	updateTemplate(obj);
	//newSong(allSongs[Math.floor(Math.random() * allSongs.length)])
}
function newAction(obj, time){
	var points = obj.points;
	var action = points[time];
	var color = 'background-color: ';
	switch(action){
		//change
		
		case 1:
			obj.color = color + getRandomColor();
			updateTemplate(obj);
			break;
		//black bg
		case 2:
			obj.color = color + 'black';
			updateTemplate(obj);
			break
	}
}
function updateTemplate(obj){
	var template = Handlebars.compile($('#main').html());
	var content = {
		songName: obj.songName,
		style: obj.color
	}
	var html = template(content);
	$('body').html(html);
}
function getRandomColor(){
	var colors = ['#0066cc', '#e52e90'];
	return colors[Math.floor(Math.random() * colors.length)];
}