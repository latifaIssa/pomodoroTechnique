// Global variables

var workClicks = 25;
var breakClicks = 5;
var workDisplay = document.getElementById("work-display");
var breakDisplay = document.getElementById("break-display");
var count = 0;
var workSession;
var breakSession;

// increase work time

var increaseWork = document.getElementById("addWorkButton");
increaseWork.addEventListener("click", function(){
	workClicks+= 1;
	workDisplay.innerHTML = workClicks;
}, false);

// decrease work time

var decreaseWork = document.getElementById("minusWorkButton");
decreaseWork.addEventListener("click", function(){
	workClicks-= 1;
	workDisplay.innerHTML = workClicks;
	if(workClicks < 1){
		workClicks = 1;
		workDisplay.innerHTML = workClicks;
	} // end of if
});

// increase break time

var increaseBreak = document.getElementById("addBreakButton");
increaseBreak.addEventListener("click", function(){
	breakClicks+= 1;
	breakDisplay.innerHTML = breakClicks;
}, false);

// decrease break time

var decreaseBreak = document.getElementById("minusBreakButton");
decreaseBreak.addEventListener("click", function(){
	breakClicks-= 1;
	breakDisplay.innerHTML = breakClicks;
	if(breakClicks < 1){
		breakClicks = 1;
		breakDisplay.innerHTML = breakClicks;
	} // end of if
}, false);

// function start

function start() {
	count = workClicks * 60;
	//alert(count);
	workSession = setInterval(workCountDown,1000);
}// end of function

// function workCountDown

function workCountDown() {
	//alert("hello");
	var seconds = count;
	var hours = Math.floor(seconds/3600);
	//alert(hours);
	seconds-= hours*3600;
	//seconds = seconds - (hours*3600);
	//alert(seconds);
	var minutes = Math.floor(seconds/60);
	seconds-= minutes*60;
	document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) +":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);
	count--;
	if(count < 0) {
		clearInterval(workSession);
		workSession = null;
		document.getElementById("showtime").innerHTML = "Starting Break";
		var breakDelay = setTimeout(function(){
			startBreak();
		}, 3000);	
	}// end of if
}// end of function

// function pause

function pause() {
	clearInterval(workSession);
	clearInterval(breakSession);
	workSession = null;
	breakSession = null;
}// end of function

// function resume 

function resume() {
	workSession = setInterval(workCountDown,1000);
}// end of function

// function reset 

function reset() {
	if(workSession) {
		clearInterval(workSession);
		workSession = null;
	} else {
		clearInterval(breakSession);
		breakSession = null;
	}
	document.getElementById("showtime").innerHTML = "";
	document.getElementById("timer-panel").style.backgroundColor = "#FC5D66";
	document.getElementById("pause").disabled = false;
	document.getElementById("resume").disabled = false;	
}// end of function

// function startBreak

function startBreak() {
	count = breakClicks * 60;
	breakSession = setInterval(breakCountDown,1000);
	document.getElementById("pause").disabled = true;
	document.getElementById("resume").disabled = true;
}// end of function

// function breakCountDown

function breakCountDown() {
	document.getElementById("timer-panel").style.backgroundColor = "lightblue";
	var seconds = count;
	var hours = Math.floor(seconds/3600);
	//alert(hours);
	seconds-= hours*3600;
	//seconds = seconds - (hours*3600);
	//alert(seconds);
	var minutes = Math.floor(seconds/60);
	seconds-= minutes*60;
	document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) +":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);
	count--;
	if(count < 0) {
		clearInterval(breakSession);
		breakSession = null;
		var message = setTimeout(function(){
			document.getElementById("showtime").innerHTML = "Congratulations pomodoro completed!";

		}, 3000);
	}// end of if
}// end of function