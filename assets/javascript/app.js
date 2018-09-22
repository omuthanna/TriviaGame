
var trivTime = 0;
var rightCount = 0;
var wrongCount = 0;
var qACount = 1;
var seconds = 0;


var timer = '';
var qA = {
	1: {
		question: 'When do we celebrate Independence Day?',
		answers: ['Augest 11', 'July 7', 'April 1', 'November 20'],
		correct: 'July 7',
		right: 'Correct!',
		wrong: 'Wrong!',
	},
	2: {
		question: 'How many American cents make up a dime?',
		answers: ['5 Cents', '10 Cents', '15 Cents', '20 Cents'],
		correct: '10 Cents',
		right: 'Correct!',
		wrong: 'Wrong!',
	},
	3: {
		question: 'There are 45 apples. If you pick up 3 apples, how many apples are there?',
		answers: ['135 Apples', '90 Apples', '43 Apples', '42 Apples'],
		correct: '42 Apples',
		right: 'Correct!',
		wrong: 'Wrong!',
	}

};
//----------------------------------------
var start = function () {
	$('.startBtn').on('click', function () {
		//Emptys trivia section
		$('.trivSection').empty();
		$('.game-start').empty();
		createQuestions();
	});
}
var createQuestions = function () {

	timerStart();
	//displaySeconds()
	//Get question
	var question = qA[qACount]['question'];
	var newDiv = $('<div>');
	newDiv.addClass('question');
	newDiv.text(question);
	$('.trivSection').prepend(newDiv);
	createAnswers();
}
var createAnswers = function () {
	var answerLength = qA[qACount]['answers'].length;
	for (var i = 0; i < answerLength; i++) {
		//get answers
		var answers = qA[qACount]['answers'][i];
		//Create new div to hold answers
		var newBtn = $('<button>');
		//Add class to new Div
		newBtn.addClass('answers redBtn');
		//Give buttons attribute
		newBtn.attr('data-type', answers);
		newBtn.text(answers);
		$('.trivSection').prepend(newBtn);
	}
	//Prevents click event from being saved
	$(document).off('click', '.answers', checkAnswer);
	$(document).on('click', '.answers', checkAnswer);
}
var checkAnswer = function () {
	//Get users answer choice
	var userAnswer = $(this).data('type');
	var correctAnswer = qA[qACount]['correct'];

	var right = qA[qACount]['right'];
	//console.log(right);
	var wrong = qA[qACount]['wrong'];
	//console.log(wrong);
	//console.log(qACount);
	if (userAnswer === correctAnswer) {


		rightCount++;

		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src', 'assets/images/congrats.jpg');
		$('.trivSection').append(newImg);

		var newDiv = $('<div>');

		newDiv.addClass('rightAnswer');

		newDiv.text(right);

		$('.trivSection').append(newDiv);
		//Stops Time
		
		clearInterval(timer);
		//Add 1 to question count to move to the next question
		qACount++;
		if (qACount <= 3) {
			//removes CORRECT! text and continues to create next question after 3 seconds
			setTimeout(
				function () {
					$('.trivSection').empty();
					createQuestions();
				}, 3000);
		}
		else {
			$('.trivSection').empty();
			var newImg = $('<img>');
			newImg.attr('src', 'assets/images/congrats.jpg');
			$('.trivSection').append(newImg);

			var newDiv = $('<div>');

			newDiv.addClass('rightAnswer');

			newDiv.text(right);

			$('.trivSection').append(newDiv);
			//Stops Time
			
			clearInterval(timer);
			
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
	else {
		wrongCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src', 'assets/images/wrong.jpg');
		$('.trivSection').append(newImg);
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('wrongAnswer');

		//adds Wrong! text to div
		newDiv.text(wrong + " The correct answer is:  " + correctAnswer);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		
		clearInterval(timer);
		
		//Add 1 to question count to move to the next question
		qACount++;

		if (qACount <= 3) {
			setTimeout(function () {
				$('.trivSection').empty();
				createQuestions();
			}, 3500);
		}
		else {
			//Clears out triv Section
			$('.trivSection').empty();
			var newImg = $('<img>');
			newImg.attr('src', 'assets/images/wrong.jpg');
			$('.trivSection').append(newImg);
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('wrongAnswer');
			//console.log(wrong);
			//adds Wrong! text to div
			newDiv.text(wrong + " The correct answer is:  " + correctAnswer);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			
			clearInterval(timer);
			
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
}
//Timer
//==========================================
var timerStart = function () {
	$('.timerSection').empty();

	//Sets time to 10
	trivTime = 100;
	//Progress Bar
	var timeTag = $('<div>');
	timeTag.addClass('time');
	timeTag.addClass('progress');
	var progressBar = $('<div>');
	progressBar.addClass('progress-bar');
	progressBar.width(trivTime + '%');
	//


	//

	$('.timerSection').append(timeTag);
	$('.time').append(progressBar);

	//Decrements Time
	
	//console.log(seconds);
	timer = setInterval(timeDecrement, 100);
	// seconds = setInterval(displaySeconds, 1000);

	


}
// function displaySeconds() {
// 	seconds--;
	
// 	if (seconds === -8) {
// 		// 	//Clears Time

// 			clearInterval(seconds);

// 		//$('.game-start').append('Time remaining :  ');

// 	}

// 	console.log(seconds);
// }
var timeDecrement = function () {
	//Progress bar decrement


	$('.progress-bar').width(trivTime + '%');

	trivTime--;
	//console.log(trivTime);
	//if time gets to 0
	if (trivTime === -10) {
		userAnswer = false;
		//Clears Time

		clearInterval(timer);
		checkAnswer();
	}

}
var gameOver = function () {
	//Remove everything in trivia section
	$('.trivSection').empty();
	//Remove everthing in timer section
	$('.timerSection').empty();
	var scoreDiv = $('<div>');
	scoreDiv.addClass('score');
	scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
	$('.trivSection').append(scoreDiv);
	//Assign new div element to new Div
	var newDiv = $('<div>');
	//add class to new Div
	newDiv.addClass('gameOver');
	//add game over text
	newDiv.text('Game Over! Play Again ?');
	//Append game over text to DOM
	$('.trivSection').append(newDiv);
	//Create ResetButton
	var newBtn = $('<button>');
	//Give btn Class
	newBtn.addClass('redBtn resetBtn');
	//Give btn reset Text
	newBtn.text('...... Reset .....');
	//Append
	$('.trivSection').append(newBtn);
	//Reset all value
	trivTime = 100;
	qACount = 1;
	rightCount = 0;
	wrongCount = 0;
	//When reset button is clicked.......
	$('.resetBtn').on('click', function () {
		$('.trivSection').empty()
		//Starts game over
		createQuestions();
	});
}

///////////////////////////////////////////////
start();