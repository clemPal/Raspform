var blinkDuring = function(Gpio, led, freq, time) {
	var led = new Gpio(led, 'out');
	iv = setInterval(function(){
		led.writeSync(led.readSync() === 0 ? 1 : 0)
	}, 1000/freq);
	setTimeout(function() {
	    clearInterval(iv); // Stop blinking
	    led.writeSync(0);  // Turn LED off.
	    led.unexport();    // Unexport GPIO and free resources
	}, time);
}

exports.blinkDuring  = blinkDuring;