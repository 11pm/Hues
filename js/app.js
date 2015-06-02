angular.module('hues', ['ngAudio']);

angular.module('hues').service('data', function($http){

	var data_path = function(file){
		return '/assets/data/' + file;
	}

	return {

		songs: function(){
			return $http.get(data_path('songs.json'));
		},

		images: function(){
			return $http.get(data_path('images.json'));
		},

		colors: function(){
			return $http.get(data_path('colors.json'));
		}
	};

});

angular.module('hues').service('utils', function(){

	return {

		random: function(ar){
			return ar[Math.floor(Math.random()*ar.length)];
		}

	}

});

angular.module('hues').factory('player', function(ngAudio, utils){

	return {

		data: {},

		playing: {},

		init: function(data){

			this.data = data;

			//play an random song
			this.play(utils.random(this.data.songs));

		},

		play: function(song){

			var song = ngAudio.load('/assets/audio/' + song.source);
			song.loop = true;
			song.play();

			//set the current playing object
			this.playing = {
				song: song,
				image: utils.random(this.data.images),
				color: utils.random(this.data.colors)
			};

			//
			var that = this;
			setInterval(function(){
				that.playing.image = utils.random(that.data.images);
				console.log('setting new image from play()')
			}, 500);

		},

		resume: function(){

			this.playing.song.play();

		},

		pause: function(){

			this.playing.song.pause();

		}

	}

});

angular.module('hues').controller('HuesController', function($scope, $q, data, player){
	
	var promises = [
		data.songs(),
		data.images(),
		data.colors()
	];

	$q.all(promises).then(function(re){
		
		//Send data to the player class
		player.init({
			songs: re[0].data,
			images: re[1].data,
			colors: re[2].data
		});

		$scope.player = player;

		$scope.$watch('player.playing.image', function(newV, oldV){
			
			$scope.image = player.playing.image;

		});

		$scope.color = player.playing.color;

	});

	

});