import React, { useState, useEffect } from "react";
import "./ResultPage.css";

const ResultPage = ({ state, goToHome, side }) => {
  const [score, setscore] = useState(0); // final score of user
  useEffect(() => {
    var counter = 0;
    state.forEach((x) => {
      if (x.isCorrect) {
        counter++;
      }
    });
    setscore(counter);
  }, []);

  return (
    <div>
      <h1 style={{ color: "red" }}>Result Page</h1>
      <h3 style={{ color: "blue" }}>
        Your score : {score} / {state.length} &nbsp;&nbsp;
        {score > state.length * 0.4 ? (
          <span style={{ color: "lime" }}>Pass!</span>
        ) : (
          <span style={{ color: "red" }}>Fail!</span>
        )}
      </h3>
      <button
        className="btn btn-primary"
        onClick={() => {
          if (window.confirm("Are you sure you want to go to Home page?")) {
            //history.push("/");
            goToHome(side);
          }
        }}
        style={{ float: "right", position: "relative", top: "-60px" }}
      >
        Home
      </button>
      <table className="table table-responsive table-hover">
        <thead>
          <tr>
            <th>Number</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {state &&
            state.map((x, index) => (
              <tr key={index} className={x.rowClassName}>
                <td>{index + 1}</td>
                <td>{x.qs}</td>
                <td>{x.ansEntered}</td>
                <td>{x.ans}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultPage;
