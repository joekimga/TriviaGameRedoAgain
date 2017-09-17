

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
//var audio = new Audio("soulgloextended.mp3");
//audio.play();


// QUIZ
var quiz = {                

    ranQuestions: ['Movie this song is from\?','Who was too Legit to Quit\?',"Who sang Ice Ice Baby\?"
    ,"Who Pitied the Fool\?","Who is the true Master of the Octagon\?","Which long-nosed fellow from Melmac lived with the Tanners\?"
    ,"Name the shoes with the infamous pumps\?","Pachyderm that lived on Sesame Street\?","Which two characters had an Excellent Adventure\?",
    "Who was Livin’ on a Prayer\?","Who’s Achy Breaky Heart somehow lead to the Wreaking Ball\?","The person Inigo Montoya had to find to get revenge\?",
    "Where was the Zoo that had Magic and Wonder waiting for you\?"],

    //Answers
    ranAnswers: [
      ["The Breakfast Club","Big Trouble in Little China","Howard the Duck","Coming to America"],
      ["Doogie Howser","The Little Engine that Could","MC Hammer","Diana Ross and the Supremes"],
      ["Queen","Vanilla Ice","The Muppets","The Ice Queen"],
      ["Mr. Miyagi","Rambo","George Simmons","Mr. T"],
      ["Hulk Hogan","Connor McGreggor","Chuck Norris","Floyd Meriwether"],
      ["Uncle Jesse","Alf","Uncle Joey","The guy from America’s Home Videos"],
      ["LA Gear","Cinderella","Yves Saint Laurent","Reebok"],
      ["Big Bird","Oscar the Grouch","Snuffaluffagus","Elmo"],
      ["The Olsen Twins","Bill and Ted","Pee Wee Herman and Paul Reubens","Mario and Luigi"],
      ["Bon Jovi","Ozzy Osborn","Nick Nolte","Gary Busey"],
      ["That guy with the Tear in his Beer","John Belushi","Billy Ray Cyrus","Dan Aykroyd"],
      ["Andre the Giant","The Dread Pirate Roberts","The Six Fingered Man","Yo Mamma"],
      ["San Diego Zoo","Sea World","Bronx Zoo","Zoobilee Zoo"],
      ["Sho'nuff","Bruce Lee","Bruce Leroy","Yo Mamma"]
    ],
    answers: [3,2,1,3,2,1,3,2,1,0,2,2,3,2],    

    //Random Question Generator
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

              for (var j=0; j<4; j++){
                //generating radio type inputs with values and classes
                  var input = $('<input name = "choice"  class = ' +classInput+i.toString()+ ' type = "radio">'+'<span id="ans">'+this.ranAnswers[ran][j]+'</span></input>');
                      input.attr("value",this.ranAnswers[ran][j]);

                  form.append(input);
              }
          //Prevent redundant questions
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
      //Time is up
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

          //Possible 10 questions and answers going through all answers. 
          for (var i=0; i<10; i++){
              //Unanswered
              if(!$('.'+classInput+i.toString()).is(":checked")) {
                   numUnanswered++;
              }
              //Correct or Incorrect answer
              else {
              $("."+classInput+i.toString()+":checked").val() === selectedChoices[i][0][selectedAnswers[i][0]] ? (correctAnswers++) : (incorrectAnswers++);
              }
          }
          //Print Results
          $("#correct").html(correctAnswers);
          $("#incorrect").html(incorrectAnswers);
          $("#unAnswered").html(numUnanswered);

}
