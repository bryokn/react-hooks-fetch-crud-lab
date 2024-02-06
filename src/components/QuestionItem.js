import React from "react";

function QuestionItem({ question, onUpdate, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    // Make a DELETE request to the server to delete the question
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Call the onDelete function to remove the question from the list
        onDelete(id);
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleCorrectAnswerChange = (event) => {
    // Get the new correct answer index from the select dropdown
    const newCorrectIndex = parseInt(event.target.value);

    // Call the onUpdate function to update the question's correct answer
    onUpdate(id, newCorrectIndex);
  };
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}
        
        >{options} </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;