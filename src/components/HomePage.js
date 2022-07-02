// home page contains the page on load
import { useState } from "react";
import QuizCustomization from "./QuizCustomization";
import QuizSection from "./QuizSection";
import ResultPage from "./ResultPage";

const HomePage = () => {
  const [leftQuestionList, setleftQuestionList] = useState({}); // set question list for left section
  const [resultDataLeft, setresultDataLeft] = useState([]); // final result for left section
  const [rightQuestionList, setrightQuestionList] = useState({}); // set question list for right section
  const [resultDataRight, setresultDataRight] = useState([]); // final result for right section

  const renderQuestions = (questionList, side) => {
    // render and questions based on section
    if (side == "left") {
      setleftQuestionList({ ...questionList });
    } else {
      setrightQuestionList({ ...questionList });
    }
  };
  const resetLeftQuiz = () => {
    // reset button on click call reset left section of quiz
    setleftQuestionList({});
  };
  const showLeftResultPage = (resultDataLeft) => {
    // setting result data for result page
    setleftQuestionList({});
    setresultDataLeft([...resultDataLeft]);
  };
  const goToHome = (side) => {
    // go home button click on final result page
    if (side == "left") {
      // checks which section is sent to home page
      setleftQuestionList({});
      setresultDataLeft([]);
    } else {
      setrightQuestionList({});
      setresultDataRight([]);
    }
  };
  const resetRightQuiz = () => {
    // reset the right section of the quiz on reset button click
    setrightQuestionList({});
  };
  const showRightResultPage = (resultDataRight) => {
    //display result with result data in the right section of the page
    setrightQuestionList({});
    setresultDataRight([...resultDataRight]);
  };
  return (
    <div>
      <div className="row">
        <div
          className="col-sm-6"
          style={{
            borderRight: "1px solid gold",
            height: "calc(100vh - 85px)",
          }}
        >
          {Object.keys(leftQuestionList).length > 0 ? (
            <QuizSection
              state={leftQuestionList}
              resetLeftQuiz={resetLeftQuiz}
              side="left"
              showLeftResultPage={showLeftResultPage}
            />
          ) : resultDataLeft.length > 0 ? (
            <ResultPage
              state={resultDataLeft}
              side="left"
              goToHome={goToHome}
            />
          ) : (
            <QuizCustomization side="left" renderQuestions={renderQuestions} />
          )}
        </div>
        <div className="col-sm-6">
          {Object.keys(rightQuestionList).length > 0 ? (
            <QuizSection
              state={rightQuestionList}
              resetRightQuiz={resetRightQuiz}
              side="right"
              showRightResultPage={showRightResultPage}
            />
          ) : resultDataRight.length > 0 ? (
            <ResultPage
              state={resultDataRight}
              side="right"
              goToHome={goToHome}
            />
          ) : (
            <QuizCustomization side="right" renderQuestions={renderQuestions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
