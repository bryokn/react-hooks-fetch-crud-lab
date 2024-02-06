import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList({ onUpdate, onDelete }) {
   const [questions, setQuestions] =useState([]);

   useEffect(() => {
    // Fetch questions from the API when the component mounts
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return (
          <li key={question.id}>
             {question.prompt} <QuestionItem
            key={question.id}
            question={question}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          </li>
          
        )
        })}
      </ul>
    </section>
  );
}

export default QuestionList;