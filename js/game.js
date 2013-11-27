window.Game = new CircleGame();

function CircleGame() {
	this.score = 0;
	this.timer = 30;
	this.duration = 0;
	this.initialCircleDuration = 1250; //1.5 seconds
	this.scrX = window.innerWidth || document.body.clientWidth;
	this.scrY = window.innerHeight || document.body.clientHeight;
}

function playCircleGame() {
	window.Game = new CircleGame();
	updateScore();
	updateTimer();
	nextCircle();
	var loop = setInterval(function() {
		if(!isGameOver()) {
			Game.timer--;
			Game.duration++;
			updateTimer();
		} else {
			clearInterval(loop);
			document.getElementById('playbox').innerHTML = "<a href=\"#\" class=\"play\">Play Again?</a>";
			document.getElementById('playbox').style.display = "block";
		}
	}, 1000);
}

function updateTimer() {
	var timerbox = document.getElementById('timer');
	timerbox.innerHTML = Game.timer + " <small>sec(s)</small>";
	if(Game.timer <= 10)
		timerbox.style.color = "#993300";
	else if(Game.timer <= 20)
		timerbox.style.color = "#ffd700";
	else
		timerbox.style.color = "#00aa00"
}

function updateScore() {
	document.getElementById('score').innerHTML = Game.score;
}

function randBtwn(min,max) {
	return Math.floor(Math.random() * max) + min;
}

function addScore(val) {
	Game.score+=val;
	var scorebox = document.getElementById('score');
 	updateScore();
 	scorebox.style.background = "#00aa00";
	setTimeout(function() {scorebox.style.background="#ccc";},100);
}

function addTime(val) {
	Game.timer+=val;
	var timerbox = document.getElementById('timer');
	updateTimer();
	timerbox.style.background = "#00aa00";
	setTimeout(function() {timerbox.style.background="#ccc";},100);
}

function isGameOver() {
	return Game.timer <= 0;
}

function nextCircle() {
	if(Math.random() <= 0.3) {
		genTimeCircle();
		genScoreCircle();
	} else
		genScoreCircle();
}

function genScoreCircle() {
  var circle = genCircle(true);
  circle.style.background = "#00f";
  var score = [50,45,40,35,30,25,20,15,10,5][parseInt(circle.style.width)-1];
  circle.innerHTML = score;
  circle.setAttribute('onclick',"if(!isGameOver()) {addScore("+score+");document.body.removeChild(this); nextCircle();}");
  document.body.appendChild(circle);
}

function genTimeCircle() {
	var circle = genCircle(false);
	circle.style.background = "#000";
	var timeBonus = [20,18,16,14,12,10,8,6,4,2][parseInt(circle.style.width)-1];
	circle.innerHTML = timeBonus;
	circle.setAttribute('onclick',"if(!isGameOver()) {addTime("+timeBonus+");document.body.removeChild(this);}");
	document.body.appendChild(circle);
}

function genCircle(duplicate) {
  var circle = document.createElement("div");
  circle.style.width = randBtwn(1,10) + 'em';
  circle.style.height = circle.style.width;
  var diameter = parseInt(circle.style.width);
  circle.style.lineHeight = diameter + "em";
  circle.style.top = randBtwn(0,Game.scrY-160) + "px";
  circle.style.left = randBtwn(0,Game.scrX-160) +"px";
  circle.setAttribute('class','circle');
  setTimeout(function() {
  	document.body.removeChild(circle); 
  	if(!isGameOver() && duplicate) 
  		nextCircle();
  }, Game.initialCircleDuration - ((8*Game.duration > 1000) ? 1000:(8*Game.duration)));
  return circle;
}
