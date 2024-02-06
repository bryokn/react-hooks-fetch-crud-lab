import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  //Function to update the state with a new question
  const addQuestion =(newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  //Function to update a question's correct answer in state and on the server
  const updateQuestion = (questionId, newCorrectIndex) => {
    //Find the question in the list by its ID
    const updatedQuestions = questions.map((question) => {
      if (question.id ===questionId) {
        return {
          ...question,
          correctIndex: newCorrectIndex,
        };
      }
      return question;
    });

    // Update the state with the updated list of questions
    setQuestions(updatedQuestions);


    // Send a PATCH request to the server to update the correct answer
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error updating question:", error));
  };
  


  // Function to delete a question from the list and the server
  const deleteQuestion = (questionId) => {
    // Filter out the deleted question from the list
    const updatedQuestions = questions.filter(
      (question) => question.id !== questionId
    );

    // Update the state with the filtered list
    setQuestions(updatedQuestions);

    // Make a DELETE request to the server to delete the question
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error deleting question:", error));
  };
    
  useEffect(() => {
    // Fetch questions from the server when the component mounts
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onQuestionAdded={addQuestion} /> : 
      <QuestionList questions={questions} onUpdate={updateQuestion}
      onDelete={deleteQuestion}/>}
    </main>
  );
}

export default App;