

//Start
$(document).ready(function() {
  quiz.load();
  $("#btnStart").click(quiz.start);
  $("#btnDone").click(quiz.done);

});

//Globals
var time;                          //setTimeOut object
var count = 88;                    //duration of quiz seconds
var selectedQuestions = ["1"];     //random selected questions from ranQuestions pool
var selectedChoices = ["1"];       //Choices of random selected questions
var selectedAnswers = [1];         //Answers of random selected questions
var classInput = "ques";           //Class name for radio inputs for each question
var audio = new Audio("soulgloextended.mp3");
audio.play();


var quiz = {                // QUIZ

    ranQuestions: ["Movie this song is from\?",
    "Who was too Legit to Quit\?", 
    "Who sang Ice Ice Baby\?",
    "Who Pitied the Fool\?",
    "Who is the true Master of the Octagon\?",
    "Which long-nosed fellow from Melmac lived with the Tanners\?",
    "Name the shoes with the infamous pumps\?",
    "Pachyderm that lived on Sesame Street\?",
    "Which two characters had an Excellent Adventure\?",
    "Who was Livin’ on a Prayer\?"
    "Who’s Achy Breaky Heart somehow lead to the Wreaking Ball\?"
    "The person Inigo Montoya had to find to get revenge\?"
    "Where was the Zoo that had Magic and Wonder waiting for you\?"],

    ranAnswers: [
      ["a. The Breakfast Club", "b.  Big Trouble in Little China", "c. Howard the Duck", "d. Coming to America"],
      ["a. Doogie Howser", "b. The Little Engine that Could", "c.  MC Hammer", "d. Diana Ross and the Supremes"],
      ["a. Queen", "b. Vanilla Ice", "c. The Muppets", "d. The Ice Queen"],
      ["a. Mr. Miyagi", "b.  Rambo", "c. George Simmons", "d.  Mr. T"],
      ["a. Hulk Hogan", "b.  Connor McGreggor", "c.  Chuck Norris", "d.  Floyd Meriwether"],
      ["a. Uncle Jesse", "b. Alf", "c. Uncle Joey", "d.  The guy from America’s Home Videos",
      ["a. LA Gear", "b. Cinderella", "c.  Yves Saint Laurent", "d.  Reebok"],
      ["a. Big Bird", "b.  Oscar the Grouch", "c.  Snuffaluffagus", "d.  Elmo"],
      ["a. The Olsen Twins", "b. Bill and Ted", "c.  Pee Wee Herman and Paul Reubens", "d. Mario and Luigi"],
      ["a. Bon Jovi", "b.  Ozzy Osborn", "c. Nick Nolte", "d.  Gary Busey"],
      ["a. That guy with the Tear in his Beer", "b.  John Belushi", "c.  Billy Ray Cyrus", "d. Dan Aykroyd"],
      ["a. Andre the Giant", "b. The Dread Pirate Roberts", "c.  The Six Fingered Man", "d.  Yo Mamma"],
      ["a. San Diego Zoo", "b. Sea World", "c. Bronx Zoo", "d. Zoobilee Zoo"],
      ["a. Sho'nuff", "b. Bruce Lee", "c. Bruce Leroy", "d. Yo Mamma"]
    ],
    answers: [3,2,1,3,2,1,3,2,1,0,2,2,3,2],   

   
    //Random Question Generator with input choices//
      pickQuestion: function(){
          //creating forms and inputs for answers
          for (var i=0; i<10; i++){

              var ran = Math.floor(Math.random()*this.ranQuestions.length);
              var que = $("<h2>", {
                  text: this.ranQuestions[ran]
                });
                que.insertAfter($(".time"));

              var form = $("<form>");
              form.insertAfter(que);

              for (var j=0; j<10; j++){
                //generating radio type inputs with values and classes
                  var input = $('<input name = "choice"  class = ' +classInput+i.toString()+ ' type = "radio">'+'<span id="ans">'+this.ranAnswers[ran][j]+'</span></input>');
                      input.attr("value",this.ranAnswers[ran][j]);

                  form.append(input);
              }
          //Deleting the selected question from array to prevent repeating same process for answer arrays//
          selectedQuestions[i] = this.ranQuestions.splice(ran,1);
          selectedChoices[i]   = this.ranAnswers.splice(ran,1);
          selectedAnswers [i]  = this.answers.splice(ran,1);
          }
      },

//Start function button
    load: function(){
      $("#introSong").trigger("play");
      this.pickQuestion();
      $("#questions").hide();
      $("#results").hide();
    },
//Push start, timer starts
    start: function(){
      $("#start").hide();
      $("#questions").show();
      timer();
    },
//Done button
    done: function(){
      $("#results").show();
      $("#questions").hide();
      clearTimeout(time);
      click();
    }
};

//timer
function timer () {

      $("#countDown").html(count);
      count--;
      //recursive function callin it self till time is up
      if (count < 0){
      clearTimeout(time);
      click();
      $("#results").show();
      $("#questions").hide();
      }
      else {
      time = setTimeout(timer, 1000);
      }
}

//Results
function click(){

          var numUnanswered = 0;
          var correctAnswers = 0;
          var incorrectAnswers = 0;

          //Possible 10 questions and answers going through all answers. Number 10 picked for convinience. It can be any number depending on number of questions.
          for (var i=0; i<10; i++){
              //Unanswered condition//
              if(!$('.'+classInput+i.toString()).is(":checked")) {
                   numUnanswered++;
              }
              //If the answer is correct or incorrect
              else {
              $("."+classInput+i.toString()+":checked").val() === selectedChoices[i][0][selectedAnswers[i][0]] ? (correctAnswers++) : (incorrectAnswers++);
              }
          }
          //Printing Results//
          $("#correct").html(correctAnswers);
          $("#incorrect").html(incorrectAnswers);
          $("#unAnswered").html(numUnanswered);

}
