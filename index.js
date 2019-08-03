'use strict'

let questionNumber = 0;
let score = 0;

const STORE = [
    {
        question: "What was the Ramones first single?",
        answer: ["I Want To Be Sedated", "Teenage Lobotomy", "I Wanna Be Your Boyfriend", "Blitzkrieg Bop"],
        correctAnswer: "Blitzkrieg Bop"
},

    {
        question: "What was the name of the movie that featured the Ramones?",
        answer: ["Rock and Roll High School", "FM", "Heavy Metal", "Streets Of Fire"],
        correctAnswer: "Rock and Roll High School"
},

    {
        question: "Which borough of New York was home to the Ramones?",
        answer: ["The Bronx", "Queens", "Brooklyn", "Staten Island"],
        correctAnswer: "Queens"
},

    {
        question: "What is Joey Ramone's real name?",
        answer: ["Gordon Sumner", "Douglas Colvin", "Jeffrey Hyman", "Paul Hewson"],
        correctAnswer: "Jeffrey Hyman"
},

    {
        question: "What was the name of the NYC club where the Ramones played their first gig?",
        answer: ["CBGB", "The Bottom Line", "The Bitter End", "The Mud Club"],
        correctAnswer: "CBGB"
},

    {
        question: "Complete the lyric: Sheena is a…",
        answer: ["Pinhead", "Brat", "Punk Rocker", "Junkie"],
        correctAnswer: "Punk Rocker"
},

    {
        question: "What Steven King book is also the name of a Ramones song?",
        answer: ["Pet Sematary", "Misery", "The Dead Zone", "Firestarter"],
        correctAnswer: "Pet Sematary"
},

    {
        question: "Who was the first Ramone to leave the band?",
        answer: ["Johnny", "Joey", "Dee Dee", "Tommy"],
        correctAnswer: "Tommy"
},

    {
        question: "Which Ramone played the bass?",
        answer: ["Johnny", "Joey", "Dee Dee", "Tommy"],
        correctAnswer: "Dee Dee"
},

    {
        question: "Which famous producer worked with the Ramones on the album 'End of the Century'?",
        answer: ["Phil Spector", "Brian Wilson", "George Martin", "Mutt Lange"],
        correctAnswer: "Phil Spector"
}
];

//starts game
function startGame() {
    $('.home').on('click', '.start-game', function (event) {
        $('.question-number').text(1);
        $('.current-score').text(0);
        $('.home').html("");
        $('.question-view').css('display', 'block');
    })
}

//prepares question for loading
function createQuestion() {
    return `<form class="quiz-form">
            <fieldset name="quiz-question" role="radiogroup">

                <legend>${STORE[questionNumber].question}</legend>
                
                    <label class="choice"><input type="radio" role="radio" name="answer" checked  value="${STORE[questionNumber].answer[0]}" required>
                    <span>${STORE[questionNumber].answer[0]}</span></label>
                
                    <label class="choice"><input type="radio" role="radio" name="answer" value="${STORE[questionNumber].answer[1]}" required>
                    <span>${STORE[questionNumber].answer[1]}</span></label>
                
                    <label class="choice"><input type="radio" role="radio" name="answer" value="${STORE[questionNumber].answer[2]}" required>
                    <span>${STORE[questionNumber].answer[2]}</span></label>

                    <label class="choice"><input type="radio" role="radio" name="answer" value="${STORE[questionNumber].answer[3]}" required>
                    <span>${STORE[questionNumber].answer[3]}</span></label>
                
                <button type="submit" class="submit-answer">Submit</button>

            </fieldset>
        </form>`;
}

//loads question in DOM
function renderQuestion() {
    if (questionNumber < STORE.length) {
        $('.question-view').html(createQuestion());
    } else {
        endGame();
    }
}

//submits user's answer
function playerSubmitAnswer() {
    $('form').on('click', '.submit-answer', function (event) {
        event.preventDefault();
        let selectedAnswer = $('input:checked').val();
        $('.quiz-form').remove();
        let rightAnswer = `${STORE[questionNumber].correctAnswer}`;

        if (selectedAnswer === rightAnswer) {
            correctAnswer();
            updateScore();
        } else {
            incorrectAnswer();
        }
    });
}

//calls correct answer display
function correctAnswer() {
    $('.answer-view').html(correctAnswerText());
}

//correct answer display
function correctAnswerText() {
    return '<section class="correct-reply"><img class="correct-icon" src="https://image.flaticon.com/icons/svg/1288/1288453.svg"><p><strong>You rock!</strong></p><button type="button" class="next-question">Next Question</button></section>';
}

//calls incorrect answer display
function incorrectAnswer() {
    $('.answer-view').html(incorrectAnswerText());
}

//incorrect answer display
function incorrectAnswerText() {
    return `<section class="correct-reply"><img class="incorrect-icon" src="https://live.staticflickr.com/5146/5834969359_50895f5535_b.jpg"><p><strong>Bummer, you hit a bad note! The correct answer is<span class="incorrect-answer-text"> ${STORE[questionNumber].correctAnswer}.</span></strong></p><button type="button" class="next-question">Next Question</button></section>`;
}

//updates score of game
function updateScore() {
    score++;
    $('.current-score').text(score);
}

//updtes question number
function updateQuestionNumber() {
    questionNumber++;
    $('.question-number').text(questionNumber + 1);
    console.log(questionNumber);
}

//loads next question
function postNextQuestion() {
    $('main').on('click', '.next-question', function (event) {
        updateQuestionNumber();
        renderQuestion();
        playerSubmitAnswer();
        resetGame();
        $('.answer-view').html("");  
    })
}

//signifies end of game
function endGame() {
    $('.question-number').text(10);
    if (questionNumber === 10) {
        if (score >= 8) {
            $('.results-view').html(`<img class="top-score" src="https://media3.giphy.com/media/I1SLS2om702u4/giphy.gif?cid=790b76115cc0ab954458324b73f8fdc9">Gabba Gabba Hey! Great score: you have ${score} right answers!<button class="reset-game" type="button" style="display:block">Play Again</button>`);
            questionNumber = 0;
        } else if (score >= 5 && score <= 7) {
            $('.results-view').html(`<img class="middle-score" src="https://media3.giphy.com/media/dZ7KN0t59bEas/giphy.gif?cid=790b76115cc0ad29766a4e356bfc7e6a">Not bad, you scored ${score} right answers.<button class="reset-game" type="button" style="display:block">Play Again</button>`);
        } else if (score >=1 && score <=4) {
            $('.results-view').html(`<img class="bottom-score" src="https://media1.giphy.com/media/xT9DPOvZDshZdH3mJa/giphy.gif?cid=790b76115cc0ab7f5438314863afa6d7">Sorry, you have only ${score} right answers. You need to listen to more Ramones music.<button class="reset-game" type="button" style="display:block">Play Again</button>`);
        } else {
            $('.results-view').html(`<img class="bottom-score" src="https://media1.giphy.com/media/xT9DPOvZDshZdH3mJa/giphy.gif?cid=790b76115cc0ab7f5438314863afa6d7">Sorry, you have <em>ZERO</em> right answers. You need to listen to more Ramones music.<button class="reset-game" type="button" style="display:block">Play Again</button>`);
        }
    }
}


// reset score and question numers to restart game
function gameOver() {
    score = 0;
    $('.current-score').text(0);
    questionNumber = 0;
    $('.question-number').html(questionNumber);
}

function resetGame() {
    $('main').on('click', '.reset-game', function (event) {
        location.reload(true);
//        $('.results-view').html("");
//        $('.answer-view').html("");
        
        // aleady inactive before fix attempt
//        $('.home').html(`<section class="home">
//                <h1 class="introduction">Think you know a lot about the Ramones?</h1>
//
//                <button type="button" class="start-game">Hey Ho, Let's Go!</button>
//            </section>`)
        
        //end of already inactive section
        
        $('.home').html("");
        gameOver();
        startGame();
        renderQuestion();
        playerSubmitAnswer();
        postNextQuestion();
    });
};

function createQuizGame() {
    startGame();
    renderQuestion();
    playerSubmitAnswer();
    postNextQuestion();
    //resetGame();
}

$(createQuizGame);
