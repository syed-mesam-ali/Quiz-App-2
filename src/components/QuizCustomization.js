// all the input fields and validation of the fields in Home page are present here
import React from "react";
import $ from "jquery";

const QuizCustomization = ({ side, renderQuestions }) => {
  const validationBeforeStart = () => {
    // validation for all the input fields in customise quiz section
    var operators = [];
    $("#" + side + " input.operator:checkbox:checked").each(function () {
      var sThisVal = $(this).val();

      if (sThisVal == "plus") {
        operators.push("+");
      } else if (sThisVal == "minus") {
        operators.push("-");
      } else if (sThisVal == "multiply") {
        operators.push("*");
      } else if (sThisVal == "divide") {
        operators.push("/");
      }
    });

    if (
      $("#" + side + " #qsNumInput").val() == "" ||
      $("#" + side + " #qsNumInput").val() > 20 ||
      $("#" + side + " #qsNumInput").val() < 5
    ) {
      alert("Enter Number of Questions to proceed & Max 20 Allowed & Min 5");
      return false;
    } else if (
      $("#" + side + " #qsOperandInput").val() == "" ||
      $("#" + side + " #qsOperandInput").val() > 15
    ) {
      alert("Enter Operand to proceed & Max 15 is allowed");
      return false;
    } else if (operators.length === 0) {
      alert("Select some operators to proceed");
      return false;
    } else {
      return true;
    }
  };
  return (
    <div id={side}>
      <h1 className="quizHeadingName">Customize Quiz</h1>
      <ul>
        <li>Customize your own quiz settings</li>
        <li>For each question you will get 20 seconds time</li>
        <li>Select Operator and Number range</li>
      </ul>
      <div className="row">
        <div className="col-sm-12">
          <label>Enter Number of Questions : &nbsp;</label>
          <input id="qsNumInput" type="number" />
        </div>
        <div className="col-sm-12">
          <label>Enter Operand (max is 15) : &nbsp;&nbsp;&nbsp;</label>
          <input id="qsOperandInput" type="number" />
        </div>
        <div className="col-sm-12">
          <label>Select which Operators you want to Practice : &nbsp;</label>
          <br />
          <input
            className="operator"
            type="checkbox"
            name="operator"
            value="plus"
          />
          <label>&nbsp; Plus (+)</label>
          <br />
          <input
            className="operator"
            type="checkbox"
            name="operator"
            value="minus"
          />
          <label> &nbsp; Minus (-)</label>
          <br />
          <input
            className="operator"
            type="checkbox"
            name="operator"
            value="multiply"
          />
          <label> &nbsp; Multiply (*)</label>
          <br />
          <input
            className="operator"
            type="checkbox"
            name="operator"
            value="divide"
          />
          <label> &nbsp; Divide (/)</label>
        </div>
        <div className="col-sm-12">
          <button
            className="btn btn-primary"
            onClick={() => {
              var x = validationBeforeStart();

              if (x) {
                var operators = [];
                $("#" + side + " input.operator:checkbox:checked").each(
                  function () {
                    var sThisVal = $(this).val();

                    if (sThisVal == "plus") {
                      operators.push("+");
                    } else if (sThisVal == "minus") {
                      operators.push("-");
                    } else if (sThisVal == "multiply") {
                      operators.push("*");
                    } else if (sThisVal == "divide") {
                      operators.push("/");
                    }
                  }
                );
                var obj = {
                  numOfQs: $("#" + side + " #qsNumInput").val(),
                  numOfOperands: $("#" + side + " #qsOperandInput").val(),
                  operators: operators,
                  side: side,
                };

                renderQuestions(obj, side);
              }
            }}
            style={{ float: "right" }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCustomization;
