function Results({ questionBank, userAnswers, restartQuiz }) {
  function getScore() {
    let finalScore = 0;

    userAnswers.forEach((answer, index) => {
      if (answer === questionBank[index].correct) {
        finalScore++;
      }
    });
    return finalScore;
  }

  const score = getScore();

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>
        Your score: {score}/{questionBank.length}
      </p>
      <button className="restart-button" onClick={restartQuiz}>
        Restard Quiz
      </button>
    </div>
  );
}

export default Results;
