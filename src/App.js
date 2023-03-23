import "./App.css";
import { BsJournalCheck } from "react-icons/bs";
import React, { useState } from "react";

function App() {
  const [toDoItem, setToDoItem] = useState("");
  const [toDoList, setTodoList] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  // The function takes in an event as an argument, and then sets the state of the toDoItem to the value of the input field
  const handleInput = (e) => {
    setToDoItem(e.target.value);
  };

  //  When the form is submitted, the todo list is updated with the new todo item, the checked status of the new item is set to false, and the input field is cleared
  const handleForm = (e) => {
    e.preventDefault();
    setTodoList([...toDoList, toDoItem]);
    setIsChecked([...isChecked, false]);
    setToDoItem("");
  };

  // When a checkbox is clicked, the function will create a new array of booleans, and then set the value of the boolean at the index of the checkbox that was clicked to the opposite of what it was before
  const handleCheck = (index) => {
    const newCheckedList = [...isChecked];
    newCheckedList[index] = !isChecked[index];
    setIsChecked(newCheckedList);
  };

  return (
    <div className="flex flex-row">
      <main className="flex h-screen w-3/4 items-center justify-center p-4">
        <div>
          <h1 className="flex justify-center text-5xl">to-dos</h1>
          <div className="my-5 space-y-4">
            <BsJournalCheck className="mx-auto text-3xl" />
            <h2 className="flex justify-center text-xl">
              Add your first to-do
            </h2>
            <p className="flex justify-center">
              What do you want to get done today?
            </p>
            <form className="flex justify-center" onSubmit={handleForm}>
              <input
                type="text"
                value={toDoItem}
                onChange={handleInput}
                aria-label="Enter a new to-do item"
                placeholder="i.e drink water!"
                className="input input-sm w-full max-w-xs border-opacity-100"
              />
            </form>
          </div>
        </div>
      </main>
      <aside className="w-1/4 bg-secondary p-4">
        <ul className="divide-y divide-primary-content text-center align-middle">
          {toDoList.map((toDoItem, index) => (
            <div
              className="flex items-center space-x-2 space-y-3 "
              key={index}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={isChecked[index]}
                onChange={() => handleCheck(index)}
              />
              <li className={isChecked[index] ? "line-through opacity-50" : ""}>
                {toDoItem}
              </li>
            </div>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default App;
