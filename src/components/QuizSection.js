import React, { useState, useEffect } from "react";
import QuizQuestions from "./QuizQuestions";

const QuizSection = ({
  state,
  resetLeftQuiz,
  side,
  showLeftResultPage,
  resetRightQuiz,
  showRightResultPage,
}) => {
  const [questionList, setquestionList] = useState([]); // questionlist array will contain all the questions to be asked
  useEffect(() => {
    var operandLimit = state.numOfOperands; // operand limit set
    var questions = [];
    var arrayWithOperators = ["n/a", ...state.operators]; // operators array created
    for (var i = 0; i < state.numOfQs; i++) {
      const randomNum1 = Math.floor(Math.random() * operandLimit) + 1; // first random number selected
      const randomNum2 = Math.floor(Math.random() * operandLimit) + 1; // second random number selected
      const randomNumForOperator =
        Math.floor(Math.random() * state.operators.length) + 1; //random number to select a operator from array
      var ans = parseInt(
        eval(randomNum1 + arrayWithOperators[randomNumForOperator] + randomNum2)
      ); // ans to the expression saved
      var obj = {
        id: i, // question number
        qs:
          randomNum1 +
          " " +
          arrayWithOperators[randomNumForOperator] +
          " " +
          randomNum2, // question expression
        ans: ans, // corrent ans to the qs
        isAnswered: false, // check if answered by user
        isCorrect: false, // check if correct ans entered by user
        ansEntered: "", // answer entered by user
        rowClassName: "danger", // add class to the table row
      };
      questions.push(obj);
    }
    // question list created
    setquestionList([...questions]);
  }, []);

  return (
    <div id={side}>
      <h1 className="quizHeadingName">Quiz Started</h1>
      <h5>Note : Answer Only in Integer, Decimals not supported</h5>
      <button
        className="btn btn-primary"
        onClick={() => {
          if (window.confirm("Are you sure you want to Reset the Quiz?")) {
            if (side == "left") {
              resetLeftQuiz();
            } else {
              resetRightQuiz();
            }
          }
        }}
        style={{ float: "right", position: "relative", top: "-60px" }}
      >
        Reset Quiz
      </button>
      <QuizQuestions
        questionList={questionList}
        side={side}
        showLeftResultPage={showLeftResultPage}
        showRightResultPage={showRightResultPage}
      />
    </div>
  );
};

export default QuizSection;
