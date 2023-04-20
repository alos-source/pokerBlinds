    // Set the elapsed time to 0
    var elapsed = 0;
    
    // Create a variable to store the interval ID
  var intervalId;
	var smallBlind
  var bigBlind
	var time
	var count
   
    function startTimer() {
      // Get the blinds and time from the input fields
      bigBlind = document.getElementById("big-blind").value;
      smallBlind = bigBlind/2;
      //document.getElementById("small-blind").innerHTML = smallBlind;
      time = document.getElementById("time").value;
      
    if (bigBlind == "" ||time == ""){

      		// Display alert message
		alert("input must not be empty!");
		console.log("input must not be empty!");
    return
    }

      document.getElementById("big-blind").disabled = true;
      document.getElementById("time").disabled = true;

      // Get starting Time
      const d = new Date();
      let timeStart = d.toLocaleString();
      document.getElementById("timeStarted").innerHTML = timeStart;
       
      // Set the countdown timer to the specified time in minutes
      count = time * 60;
      
      // Update the timer every second
      intervalId = setInterval(function() {
        // Calculate the minutes and seconds remaining
        var minutes = Math.floor(count / 60);
        var seconds = count % 60;
        
        // Update the timer display
        document.getElementById("elapsed").innerHTML = minutes + ":" + seconds;
        
        // Increment the elapsed time by 1 second
        elapsed++;
        
        // Calculate the elapsed minutes and seconds
        var elapsedMinutes = Math.floor(elapsed / 60);
        var elapsedSeconds = elapsed % 60;
        
        // Update the elapsed time display
        document.getElementById("elapsed").innerHTML = elapsedMinutes + ":" + elapsedSeconds;
        
        // Decrement the count by 1
        count--;
        
        // If the count reaches 0, double the blinds and reset the timer
        if (count < 0) {
          smallBlind *= 2;
          bigBlind *= 2;
          count = time * 60;
		  
		// Display alert message
		alert("time 's up - Blind Raise!");
		console.log("new blinds: " + smallBlind + "$/" + bigBlind + "$");
		
		  
        }
        

        // Update the blinds display
        document.getElementById("blinds").innerHTML = smallBlind + "$/" + bigBlind + "$";
      }, 1000);
    }
    
    function pauseTimer() {
      // Pause the timer by clearing the interval
      clearInterval(intervalId);
    }
    
    function resetTimer() {
      // Reset the timer, elapsed time, and blinds
      elapsed = 0;
      document.getElementById("time").disabled = false;      
      document.getElementById("big-blind").disabled = false;
      document.getElementById("big-blind").value = "";


	  }
	  