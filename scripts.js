    // Set the elapsed time to 0
    var elapsed = 0;
    
    // Create a variable to store the interval ID
  var intervalId;
	var smallBlind
  var bigBlind
	var time
	var count
  let completedIntervalsOld

    // Script refactored
    class Timer {
      constructor() {
        this.intervalTime = 0;
        this.elapsedTime = 0;
        this.startTime = 0;
        this.paused = true;
        this.completedIntervals = 0;
        this.remainingIntervalTime = 0;
      }
    
      start(intervalTime) {
        this.intervalTime = intervalTime;
        //console.log(this.intervalTime+": Blind Interval");
        if (this.paused) {
          this.startTime = new Date().getTime();
          this.remainingIntervalTime = this.intervalTime;
          this.paused = false;
          this.tick();
        }
      }
    
      pause() {
        if (!this.paused) {
          clearInterval(this.interval);
          this.elapsedTime += new Date().getTime() - this.startTime;
          this.paused = true;


        }
      }
    
      reset() {
        this.intervalTime = 0;
        this.elapsedTime = 0;
        this.startTime = 0;
        this.paused = true;
        this.completedIntervals = 0;
        this.remainingIntervalTime = 0;
        clearInterval(this.interval);



      }
    
      tick() {
        this.interval = setInterval(() => {
          this.elapsedTime = new Date().getTime() - this.startTime;
          this.remainingIntervalTime = Math.floor((this.intervalTime - (this.elapsedTime - this.completedIntervals * this.intervalTime))/1000);
          this.completedIntervals = Math.floor(this.elapsedTime / this.intervalTime);
        }, 10);
      }
    
      getCompletedIntervals() {
        return this.completedIntervals;
      }

      getTimeLeft() {
        return this.remainingIntervalTime;
      }
    
      getStatus() {
        if (this.paused) {
          return "paused";
        } else {
          return "running";
        }
      }
    }
    


  const timer = new Timer();
   
    function startTimer() {
    //  this.completedIntervals = 0;

    if (timer.completedIntervals<1){
      // Get the blinds and time from the input fields
      bigBlind = document.getElementById("big-blind").value;
      smallBlind = bigBlind/2;
      playerValue = document.getElementById("playerValue").value;
    }

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
      document.getElementById("playerValue").disabled = true;
      document.getElementById("buttonStart").disabled = true;
      document.getElementById("buttonPause").disabled = false;
      document.getElementById("buttonReset").disabled = true;

      // start Timer
      timer.start(time*60*1000);
      console.log(timer.getStatus());
      console.log(timer.intervalTime/1000+"sec Blind Interval");


      // Get starting Time
      const d = new Date();
      let timeStart = d.toLocaleString();
      document.getElementById("timeStarted").innerHTML = timeStart;
      console.log(timeStart+": started (" + smallBlind + "$/" + bigBlind + "$)");
      //document.getElementById("history").innerHTML=timeStart+"<br />";
      startingBBlinds = playerValue/bigBlind;
      document.getElementById("history").innerHTML="<br />"+timeStart+": started (" + smallBlind + "$/" + bigBlind + "$)"+" Coins pP: "+playerValue+ "$"+ " StartingBB: "+startingBBlinds+"<br />";

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
        
       // Update the intervals display
       document.getElementById("intervals").innerHTML = timer.completedIntervals;

       // Update the remaining time display
      document.getElementById("remaining").innerHTML = timer.remainingIntervalTime;

        // Decrement the count by 1
        //count--;
        
        // If the count reaches 0, double the blinds and reset the timer
        
        if (completedIntervalsOld < timer.completedIntervals) {
          smallBlind *= 2;
          bigBlind *= 2;
          //count = time * 60;
          console.log(new Date().toLocaleString()+": BlindRaise (" + smallBlind + "$/" + bigBlind + "$)")
          document.getElementById("history").innerHTML+=new Date().toLocaleString()+": BlindRaise (" + smallBlind + "$/" + bigBlind + "$)<br />";
		  

		// Display alert message
		alert("time 's up - Blind Raise!");
		//console.log("new blinds: " + smallBlind + "$/" + bigBlind + "$");
		
		  
        }
        
        completedIntervalsOld = timer.completedIntervals;

        // Update the blinds display
        document.getElementById("blinds").innerHTML = smallBlind + "$/" + bigBlind + "$";
      }, 1000);
    }
    
    function pauseTimer() {
      // Pause the timer by clearing the interval
      clearInterval(intervalId);
      timer.pause(); 
      console.log(timer.getStatus());
      document.getElementById("buttonStart").disabled = false;
      document.getElementById("buttonPause").disabled = true;
      document.getElementById("buttonReset").disabled = false;

    }
    
    function resetTimer() {
      // Reset the timer, elapsed time, and blinds
      elapsed = 0;
      completedIntervalsOld = 0;
      document.getElementById("time").disabled = false;      
      document.getElementById("big-blind").disabled = false;
      document.getElementById("playerValue").disabled = false;
      document.getElementById("big-blind").value = "";
      
      timer.reset();
      console.log(timer.getStatus());

	  }
	  

