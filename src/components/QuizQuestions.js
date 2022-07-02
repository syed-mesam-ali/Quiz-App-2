import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";

const QuizQuestions = ({
  questionList,
  side,
  showLeftResultPage,
  showRightResultPage,
}) => {
  const [questionCounter, setquestionCounter] = useState(0);
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  const [currentScore, setCurrentScore] = useState(0);

  const goToNextQuestion = () => {
    // next question moved while timer ends
    if ($("#" + side + " #btnNextRandomQuiz").is(":hidden")) {
      $("#" + side + " #btnSubmitRandomQuiz").off("click");
      $("#" + side + " #btnSubmitRandomQuiz").click();
    } else {
      $("#" + side + " #btnNextRandomQuiz").off("click");
      $("#" + side + " #btnNextRandomQuiz").click();
    }
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearInterval(Ref.current);
      goToNextQuestion();
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:20");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) {
      clearInterval(Ref.current);
    }
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 20);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    // on trying to reload the page
    // window.onbeforeunload = function () {
    //   return "Data will be lost if you leave the page, are you sure?";
    // };
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  const saveAnswer = () => {
    // store the answer by changing the object
    questionList[questionCounter].ansEntered = $(
      "#" + side + " #answerInput"
    ).val();

    if (questionList[questionCounter].ansEntered !== "") {
      questionList[questionCounter].isAnswered = true;
      if (
        questionList[questionCounter].ans ==
        $("#" + side + " #answerInput").val()
      ) {
        questionList[questionCounter].isCorrect = true;
        questionList[questionCounter].rowClassName = "success";
        setCurrentScore(currentScore + 1);
      }
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-4">
          <h2 style={{ color: "blue" }}>
            Score : {currentScore} / {questionList.length}
          </h2>
        </div>
        <div className="col-sm-6">
          <h2 style={{ color: "orangered" }}>Timer : {timer}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h1>
            {questionCounter + 1}.) &nbsp;
            {questionList[questionCounter] &&
              questionList[questionCounter].qs}{" "}
            ?
          </h1>
        </div>
        <div className="col-sm-6">
          <input
            id="answerInput"
            type="number"
            placeholder="Enter your answer"
            className="form-control"
          />
        </div>
        <div className="col-sm-2">
          <button
            className="btn btn-primary"
            id="btnNextRandomQuiz"
            onClick={() => {
              onClickReset();
              saveAnswer();
              if (questionList.length - 1 == questionCounter + 1) {
                $("#" + side + " #btnNextRandomQuiz").hide();
                $("#" + side + " #btnSubmitRandomQuiz").show();
              }
              setquestionCounter(questionCounter + 1);
              $("#" + side + " #answerInput").val("");
            }}
            style={{ float: "left" }}
          >
            Next
          </button>
          <button
            className="btn btn-primary"
            id="btnSubmitRandomQuiz"
            onClick={() => {
              saveAnswer();
              if (side == "left") {
                showLeftResultPage(questionList);
              } else {
                showRightResultPage(questionList);
              }
            }}
            style={{ float: "left", display: "none" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
