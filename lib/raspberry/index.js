var leds = {};
var blinkInterval = {};
var led_occupied = {}; //it will act as a mutex

var blinkDuring = function(Gpio, ledNum, freq, time) {
	//Init of the mutex
	if (typeof(led_occupied[ledNum.toString()]) == "undefined") {
		led_occupied[ledNum.toString()] = false;
	}
	// if the ressource is available
	if (led_occupied[ledNum.toString()] == false) {
		led_occupied[ledNum.toString()] = true; //lock the ressource
		//the led blinks
		blinkInterval[ledNum.toString()] = setInterval(function(){
			leds[ledNum.toString()] = new Gpio(ledNum, 'out');
			leds[ledNum.toString()].writeSync(leds[ledNum.toString()].readSync() === 0 ? 1 : 0)
		}, 1000/freq);
		//it stops after time ms
		setTimeout(function() {
		    clearInterval(blinkInterval[ledNum.toString()]); // Stop blinking
		    leds[ledNum.toString()].writeSync(0);  // Turn LED off.
		    leds[ledNum.toString()].unexport();    // Unexport GPIO and free resources
		    led_occupied[ledNum.toString()] = false; // free the ressource
		}, time);
	}
}

// function to free the led pins
var stopGPIO = function () {
	for (var ledNum in leds) {
		if (led_occupied[ledNum] == true) {
			leds[ledNum].writeSync(0); 
    		leds[ledNum].unexport();
    	}
	}
}

exports.blinkDuring  = blinkDuring;
exports.stopGPIO = stopGPIO;
