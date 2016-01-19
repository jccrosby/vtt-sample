var App = function(player){
	this.initialize(player);
}

App.prototype = _.extend(App.prototype, {
	
	playerRef:undefined,
	cues: undefined,
	cueLookup: undefined,
	cueTime: undefined,
	currentCue: undefined,
	
	
	initialize: function(player){
		var self = this;
		console.log('App::initialize()', player);
		this.playerRef = player;
		this.cueTime = 0;
		
		this.cues = this.playerRef.textTracks[0].cues;
		console.log(this.cues);
		this.cueLookup = {};
		
		captionator.captionify();
		
		for(var i=0; i < this.cues.length; i++) {
			var cue = this.cues[i];
			this.cueLookup[Math.round(cue.startTime)] = cue;
		}
		
		this.playerRef.addEventListener('loadeddata', function(event){
			console.log('loadeddata');
		});
		
		this.playerRef.addEventListener('loadedmetadata', function(event){
			console.log('loadedmetadata');
		});
		
		this.playerRef.addEventListener('timeupdate', function(event){
			var start = undefined;
			var end = undefined;
			var time = self.playerRef.currentTime;
			var current = Math.round(time);
			var cue = self.getCueForTime(current);
			
			if(cue) {
				start = cue.startTime;
				end = cue.endTime;
				//console.log(start + ' >=', current, '<= ' + end);
				
				if((current >= start && current <= end) && cue !== self.currentCue) {
					self.currentCue = cue;
					var thumbText = self.currentCue.text;
					var display = document.getElementById('thumb');
					
					// messy but this is a poc
					var positionSize = thumbText.split('#')[1];
					var values = positionSize.split('=')[1];
					var valueList = values.split(',');
					var x = valueList[0] * -1;
					//x = x == 0 ? x: -x;
					var y = valueList[1] * -1;
					//y = y == 0 ? y: -y;
					var newWidth = valueList[2];
					var newHeight = valueList[3];
					
					var newPosition = x + 'px ' + y + 'px';
					
					/*console.log('Thumb: ', start, "-->", end);
					console.log('row: ', y/74*-1, "column", x/128*-1);
					console.log('Thumb: ', thumbText);
					console.log('newPosition', newPosition);
					console.log('//////////////////////////////////');*/
					
					display.style.backgroundPosition =  newPosition;
					display.style.width = newWidth;
					display.style.height = newHeight;
				}
				
			} else {
				
			}
		});
		
		console.log(this.cueLookup);
	},
	
	getCueForTime: function(time) {
		for(var i = 0; i < this.cues.length; i++) {
			var cue = this.cues[i];
			if(time >= cue.startTime && 
			   time <= cue.endTime) {
				return cue;
			}
		}
	}
	
});