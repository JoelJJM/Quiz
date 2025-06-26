import React, { useState } from "react";
import Results from "./results";

//Stores questions, answers and the correct option.
const questionBank = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  },
  {
    question: "Which lanuage is used for web apps?",
    answers: ["PHP", "Python", "JavaScript", "All"],
    correct: "All",
  },
  {
    question: "What does JSX stand for?",
    answers: [
      "JavaScript XML",
      "Java Syntax eXtension",
      "Just a simple example",
      "None of the above",
    ],
    correct: "JavaScript XML",
  },
];

//Storing user answers into a predefined list.
let initialAnswers = [null, null, null];

function Quiz() {
  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  //Using useState to manage the current question index
  const [questionIndex, setQuestionIndex] = useState(0);
  //Using useState to manage the current option selected for the question to assist user experience
  const [selectedOption, setSelectedOption] = useState(null);

  const [isQuizFinished, setisQuizFinished] = useState(false);

  //Function which handles when option is selected
  function handleSelectOption(option) {
    setSelectedOption(option);
  }

  //Function for handling when user clicks the next button
  function handleNext() {
    //If statement to check for the end of quiz if not change question
    if (questionIndex >= questionBank.length - 1) {
      userAnswers[questionIndex] = selectedOption;
      setisQuizFinished(true);
      // maybe show a results screen here later
    } else {
      //If it's not the end of the quiz we save the users new answer, change selected option to ensure it changes across questions, and change question index which changes the html structure.
      userAnswers[questionIndex] = selectedOption;
      handleSelectOption(userAnswers[questionIndex + 1]);
      setQuestionIndex((prev) => prev + 1);
    }
  }

  //Function for handling when user clicks the previous button
  function handlePrevious() {
    //If statement to check for the start of quiz if not change question
    if (questionIndex <= 0) {
    } else {
      //If it's not the start of the quiz we save the users new answer, change selected option to ensure it changes across questions, and change question index which changes the html structure.
      userAnswers[questionIndex] = selectedOption;
      handleSelectOption(userAnswers[questionIndex - 1]);
      setQuestionIndex((prev) => prev - 1);
    }
  }

  function restartQuiz() {
    setUserAnswers(initialAnswers);
    setQuestionIndex(0);
    setSelectedOption(null);
    setisQuizFinished(false);
  }

  if (isQuizFinished) {
    return (
      <Results
        userAnswers={userAnswers}
        questionBank={questionBank}
        restartQuiz={restartQuiz}
      />
    );
  }

  return (
    <div>
      {/*Displaying dynamic question and title texts for each question*/}
      <h2> Question {questionIndex + 1}</h2>
      <p>{questionBank[questionIndex].question}</p>

      {/*Mapping through the answers array to display each answer as a button, giving it a unique key / identifier*/}
      {questionBank[questionIndex].answers.map((answer, index) => (
        //CSS differs from non-selected option based on selectOption useState()
        <button
          className={`${
            selectedOption === answer ? "option-selected" : "option"
          }`}
          value={answer}
          id={answer}
          key={index}
          onClick={() => handleSelectOption(answer)}
        >
          {answer}
        </button>
      ))}

      <div className="nav-buttons">
        <button onClick={handlePrevious}> Previous </button>
        {/*If at the finish of quiz show finish button, if not show next.*/}
        {questionIndex >= questionBank.length - 1 ? (
          <button onClick={handleNext}> Finish Quiz </button>
        ) : (
          <button onClick={handleNext}> Next </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
