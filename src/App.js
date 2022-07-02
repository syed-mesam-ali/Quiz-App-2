import "./App.css";
import Header from "./components/Header";
//import QuizSection from "./components/QuizSection";
//import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
//import ResultPage from "./components/ResultPage";

function App() {
  // create route with 3 pages
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
