import React from "react";
import { useGlobalContext } from "./Context/context";

import SetupForm from "./Components/SetupForm";
import Loading from "./Components/Loading";
import Modal from "./Components/Modal";

import Countdown from "react-countdown";
import CountDownTimer from "./Components/CountDownTimer";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    isModalOpen,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];

  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          <CountDownTimer
            onEnd={nextQuestion}
            modalOpen={isModalOpen}
            timeLimit={60}
          />
        </p>
        <article className='container'>
          <p dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>

      
    </main>
  );
}

export default App;
