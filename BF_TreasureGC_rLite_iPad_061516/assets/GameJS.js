/********** GAMEPLAY SPECIFIC JAVASCRIPT **********/
//This function resets the entire game and includes everything that needs to be reset, including updating the numbers. This will be different for each game
var restartGame = function() {
	totalSpin = 0;
	spinClickable = true;
	mNectarGame.totalNum = 100000;
	mNectarGame.totalBet = 3000;
	mNectarGame.wonNum = 0;
	mNectarGame.shadow = 0;
	mNectarGame.animationTime = 1500;
	mNectarGame.animationSteps = 50;
	updateNum();
	slightOfHand(spin1);
	clearEffect();
	document.getElementById("outro-container").style.display = 'none';
}
// CALL THIS WHEN THE USER FINISHES PLAYING YOUR BUILD
// this sends the user to the end of the game if the retry is clicked and the dl is not clicked
var finishGameplay = function() {
	if (typeof gotoEndScreen != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		gotoEndScreen();
		//report that the user has finished the game
		if (typeof mn != 'undefined'){mn("play","100%");}
	}
	else {
		displayInstallScreen();
	}
}

/********** EXAMPLE JAVASCRIPT **********/


var spin1 = [
				[10,2,10,9,3,3,2,8,5,8,9,3,5,5,2,5,8,4], //reel1
				[4,6,9,3,2,7,2,8,5,3,5,3,5,9,4,6,3,2],  //reel2
				[10,9,5,3,3,5,2,8,5,6,9,3,5,5,2,7,9,5], //reel3
				[5,7,9,10,3,7,2,8,5,5,9,3,5,9,2,6,4,3], //reel4
				[9,2,10,6,3,7,2,5,5,10,9,3,5,5,6,8,9,10] //reel5
			];

var spin2 = [
				[2,2,10,7,3,7,2,7,7,5,9,3,5,3,10,2,10,9],
				[6,7,4,7,3,7,2,8,7,2,9,3,5,9,4,6,9,3],
				[7,2,10,6,9,7,2,8,5,8,9,3,5,9,10,9,5,3],
				[9,4,5,1,3,7,2,8,4,9,2,3,5,9,5,7,9,10],
				[2,2,9,7,3,7,7,8,7,4,9,3,5,9,9,2,10,6]
			];

var spin3 = [
				[2,6,6,10,3,7,2,8,2,5,5,3,5,8,2,2,10,7],
				[7,6,6,4,3,7,2,8,7,8,9,3,5,9,6,7,4,7],
				[3,2,9,10,3,6,2,8,3,8,9,3,5,6,7,2,10,6],
				[10,8,4,5,3,7,2,8,2,3,9,3,5,9,9,4,5,1],
				[6,3,8,4,3,2,2,8,2,6,9,3,5,9,2,2,9,7]
			];

var spin4 = [
				[1,2,3,10,3,7,2,8,6,6,9,3,5,8,2,6,6,10],
				[1,1,9,1,3,1,2,8,7,2,9,3,5,9,7,6,6,4],
				[3,5,9,4,3,7,2,8,8,4,9,8,5,9,3,2,9,10],
				[3,7,10,8,3,7,2,8,3,10,9,3,5,9,10,8,4,5],
				[4,2,3,1,6,7,2,8,3,6,9,3,6,9,6,3,8,4]
			];

var totalSpin = 0;
var spinClickable = true;
var mNectarGame = {};
	mNectarGame.totalNum = 100000;
	mNectarGame.totalBet = 3000;
	mNectarGame.wonNum = 0;
	mNectarGame.shadow = 0;
	mNectarGame.animationTime = 1500;
	mNectarGame.animationSteps = 50;

function delimitNumbers(str) {
return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
  return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
});
}

var updateNum = function(){
	var totalNum = delimitNumbers(mNectarGame.totalNum);
	document.getElementById("totalNum").innerHTML = totalNum;
	var wonNum = delimitNumbers(mNectarGame.wonNum);
	document.getElementById("wonNum").innerHTML = wonNum;
	var shadow = delimitNumbers(mNectarGame.shadow);
	document.getElementById("shadow").innerHTML = shadow;
}
updateNum();

var animateNum = function(winValues){
	//time per step
	var duration = mNectarGame.animationTime / mNectarGame.animationSteps;
	// value of each step
	var singleAmount = winValues / mNectarGame.animationSteps;

	incrementNum(duration, singleAmount, winValues);
}

var incrementNum = function(duration, singleAmount, winValues){
	mNectarGame.wonNum += singleAmount;
	mNectarGame.shadow += singleAmount;
	mNectarGame.totalNum += singleAmount;
	updateNum();
	setTimeout(function(){
		if (mNectarGame.wonNum != winValues){
			incrementNum(duration, singleAmount, winValues);
		}
	}, duration);
}


var replaceImages = function (reelInfo){
	for (var r = 1; r <= 5; r++) {
		var currentReel = reelInfo[r-1];
		for (var e = 1 ; e <=18 ; e++) {
			var element = "reel" + r + "-" + e;  
			document.getElementById(element).className = "image" + currentReel[e-1];
		};
	};
}
replaceImages(spin1);

//set top px
for (var r = 1; r <= 5; r++) {
	for (var e = 1 ; e <=18 ; e++) {
		var element = "reel" + r + "-" + e;  
		var currentReel
		document.getElementById(element).style.top =(e-1)*106 + "px" ;
	};
};

var spin = function (){
	totalSpin++;
	mNectarGame.wonNum = 0;
	mNectarGame.shadow = 0;
	document.getElementById("text").className += " enlarge";
	document.getElementById("wheel").className = "wheel2";
	document.getElementById("sparkles").className = "sparkles";

	mNectarGame.totalNum -= mNectarGame.totalBet;
	updateNum();

	document.getElementById("reel1").className = "reel-spin";
	setTimeout(function(){
		document.getElementById("reel2").className = "reel-spin";
	 }, 200);
	setTimeout(function(){
		document.getElementById("reel3").className = "reel-spin";
	 }, 400);
	setTimeout(function(){
		document.getElementById("reel4").className = "reel-spin";
	 }, 600);
	setTimeout(function(){
		document.getElementById("reel5").className = "reel-spin";
	 }, 800);

	setTimeout(function(){
		if(totalSpin===1){
		 	slightOfHand(spin2);
		 	document.getElementById("reel1-18").className += " wildmove";
		 	document.getElementById("reel2-17").className += " wildmove";
			document.getElementById("reel3-16").className += " wildmove";
			document.getElementById("reel4-17").className += " wildmove";

		 	document.getElementById("line1").className = "line1";
		 	document.getElementById("effect1").style.display ="block";
		 	document.getElementById("effect2").style.display ="block";
		 	document.getElementById("rightB1").className = "bomb";
	 		document.getElementById("rightB2").className = "bomb2";
	 		document.getElementById("leftB1").className = "bombL";
	 		document.getElementById("leftB2").className = "bombL2";
	 		document.getElementById("rightF1").className = "rightF1";
	 		document.getElementById("rightF2").className = "rightF2";
	 		document.getElementById("leftF1").className = "leftF1";
	 		document.getElementById("leftF2").className = "leftF2";
		 	setTimeout(function(){
		 		document.getElementById("wonNum").style.display ="block";
				document.getElementById("shadow").style.display ="block";
			 	var winAmount = mNectarGame.totalBet*1.5;
			 	mNectarGame.totalNum +=winAmount;
			 	animateNum(winAmount);
		    }, 800);
		setTimeout(function(){
			spinClickable=true;
			clearEffect();
			document.getElementById("text").className = "text";
			document.getElementById("wheel").className = "wheel";
		 	document.getElementById("sparkles").className = " ";
	 	}, 4500);	

		 }
	 }, 1800);

	setTimeout(function(){
		if(totalSpin===2){
		 	slightOfHand(spin3);

			setTimeout(function(){
				spinClickable=true;
		 		document.getElementById("text").className = "text";
				document.getElementById("wheel").className = "wheel";
		 		document.getElementById("sparkles").className = " ";
			}, 1000);
		}
	}, 1800);

	setTimeout(function(){
		if (totalSpin===3){
		 	slightOfHand(spin4);
		 	document.getElementById("reel1-16").className += " piratemove";
		 	document.getElementById("reel1-17").className += " piratemove";
			document.getElementById("reel2-16").className += " piratemove";
			document.getElementById("reel2-17").className += " piratemove";

			document.getElementById("bigwin").className += " bigwin";
		 	document.getElementById("line2").className = "line2";
		 	document.getElementById("effect1").style.display ="block";
		 	document.getElementById("effect2").style.display ="block";
		 	document.getElementById("rightB1").className = "bomb";
	 		document.getElementById("rightB2").className = "bomb2";
	 		document.getElementById("rightB3").className = "bomb";
	 		document.getElementById("leftB1").className = "bombL";
	 		document.getElementById("leftB2").className = "bombL2";
	 		document.getElementById("leftB3").className = "bombL";
	 		document.getElementById("rightF1").className = "rightF1";
	 		document.getElementById("rightF2").className = "rightF2";
	 		document.getElementById("rightF3").className = "rightF3";
	 		document.getElementById("leftF1").className = "leftF1";
	 		document.getElementById("leftF2").className = "leftF2";
	 		document.getElementById("leftF3").className = "leftF3";
		 	document.getElementById("text").className = "text";
			document.getElementById("wheel").className = "wheel";
		 	document.getElementById("sparkles").className = " ";
		 	setTimeout(function(){
		 		document.getElementById("wonNum").style.display ="block";
				document.getElementById("shadow").style.display ="block";
			 	var winAmount = mNectarGame.totalBet*4.5;
			 	mNectarGame.totalNum +=winAmount;
			 	animateNum(winAmount);
		    }, 800);
		 	
			setTimeout(function(){
				if (typeof gotoEndScreen != 'undefined') {
					gotoEndScreen();
					if(typeof mn != 'undefined'){mn("play","100%");}
				}
				else {
				 	document.getElementById("reel1-16").className = "image6";
				 	document.getElementById("reel1-17").className = "image6";
					document.getElementById("reel2-16").className = "image6";
					document.getElementById("reel2-17").className = "image6";
					displayInstallScreen();
				}

			}, 6500);
		}
	}, 1800);

	if (totalSpin === 1){
		if (typeof mn != 'undefined'){mn("play","25%");}
	}

	if (totalSpin === 2){
		if (typeof mn != 'undefined'){mn("play","50%");}
	}
	
	if (totalSpin === 3){
		if (typeof mn != 'undefined'){mn("play","75%");}
	}
}

var slightOfHand = function(reelInfo){

	document.getElementById("reel1").className = "reel-top";
	document.getElementById("reel2").className = "reel-top";
	document.getElementById("reel3").className = "reel-top";
	document.getElementById("reel4").className = "reel-top";
	document.getElementById("reel5").className = "reel-top";
	replaceImages(reelInfo);
}

var clickSpin = function(){
	if(spinClickable===true){
		spin();
		spinClickable=false;
	}
}

var clearEffect = function(){
	document.getElementById("rightB1").className = " ";
	document.getElementById("rightB2").className = " ";
	document.getElementById("rightB3").className = " ";
	document.getElementById("leftB1").className = " ";
	document.getElementById("leftB2").className = " ";
	document.getElementById("leftB3").className = " ";
	document.getElementById("rightF1").className = " ";
	document.getElementById("rightF2").className = " ";
	document.getElementById("rightF3").className = " ";
	document.getElementById("leftF1").className = " ";
	document.getElementById("leftF2").className = " ";
	document.getElementById("leftF3").className = " ";
	document.getElementById("line1").className = " ";
	document.getElementById("line2").className = " ";
	document.getElementById("effect1").style.display ="none";
	document.getElementById("effect2").style.display ="none";
	document.getElementById("wonNum").style.display ="none";
	document.getElementById("shadow").style.display ="none";
	document.getElementById("bigwin").className = " ";

}

