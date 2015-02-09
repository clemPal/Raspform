var led = {};
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
			led[ledNum.toString()] = new Gpio(ledNum, 'out');
			led[ledNum.toString()].writeSync(led[ledNum.toString()].readSync() === 0 ? 1 : 0)
		}, 1000/freq);
		//it stops after time ms
		setTimeout(function() {
		    clearInterval(blinkInterval[ledNum.toString()]); // Stop blinking
		    led[ledNum.toString()].writeSync(0);  // Turn LED off.
		    led[ledNum.toString()].unexport();    // Unexport GPIO and free resources
		    led_occupied[ledNum.toString()] = false; // free the ressource
		}, time);
	}
}

exports.blinkDuring  = blinkDuring;
