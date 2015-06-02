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

angular.module('hues').factory('player', function($q, ngAudio, utils){

	return {

		data: {},

		playing: {},

		init: function(data){

			this.data = data;

			//play an random song
			this.play(utils.random(this.data.songs));

		},
		
		audioPromise: function(song){

			var deferred = $q.defer();
			console.log('from promise')
			var audio = ngAudio.load('/assets/audio/' + song.source);
			if(!audio){
				deferred.reject('Audio failed to play');
			}
			else{
				audio.loop = true;
				audio.volume = 0;
				console.log('playing song')
				audio.play()
				console.log(audio)
				console.log(audio.duration)
				deferred.resolve(audio);
			}

			return deferred.promise;
		},

		play: function(song){

			var promise = this.audioPromise(song);
			console.log('getting song')
			promise.then(function(audio){
				console.log(audio.duration)
			}, function(reason){
				alert(reason)
			});

			//set the current playing object
			// this.playing = {
			// 	song: audio,
			// 	image: utils.random(this.data.images),
			// 	color: utils.random(this.data.colors)
			// };

			// //
			// var that = this;
			// setInterval(function(){
			// 	console.log(dur)
			// 	that.playing.image = utils.random(that.data.images);
			// 	that.playing.color = utils.random(that.data.colors);
			// }, 500);

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

		$scope.$watch('player.playing.image', function(){
			$scope.image = player.playing.image;
		});

		$scope.$watch('player.playing.color', function(){
			$scope.color = player.playing.color;
		});

		$scope.color = player.playing.color;

	});

	

});