import "./App.css";
import { BsJournalCheck } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import useToDoList from "./useToDoList";
import ToDoItem from "./ToDoItem";

function App() {
  const [toDoItems, setToDoItems] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { toDoList, addToDo, toggleCheck, deleteToDo, isChecked } = useToDoList(
    {}
  );

  /* It's a hook that runs when the component mounts. It sets the current date to the current date. */
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  // The function takes in an event as an argument, and then sets the state of the toDoItem to the value of the input field
  const handleInput = (e) => {
    setToDoItems(e.target.value);
  };

  //  When the form is submitted, the todo list is updated with the new todo item, the checked status of the new item is set to false, and the input field is cleared
  const handleForm = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), task: toDoItems };
    addToDo(newTask);
    setToDoItems("");
  };

  return (
    <div className="background flex flex-row">
      <main className="flex h-screen w-full items-center justify-center p-4 lg:w-3/4">
        <div className="my-5 space-y-4">
          <h1 className="text-center text-5xl">to-dos</h1>
          <BsJournalCheck className="mx-auto text-3xl" />
          <h2 className="text-center text-xl">Add your first to-do</h2>
          <p className="text-center">What do you want to get done today?</p>
          <form className={""} onSubmit={handleForm}>
            <input
              type="text"
              value={toDoItems}
              onChange={handleInput}
              aria-label="Enter a new to-do item"
              placeholder="i.e drink water!"
              className="input input-sm w-full max-w-xs border-opacity-100"
            />
          </form>
        </div>
      </main>
      <aside className="hidden bg-base-content bg-opacity-50 p-4 lg:block lg:w-1/4">
        <ul className="block text-center align-middle">
          <p className="text-md text-left font-bold text-white underline underline-offset-2">
            {currentDate}
          </p>{" "}
          {/* Maps over the toDoList array and returning a div element for each item in the array. */}
          {toDoList.map((toDoItems, index) => (
            <ToDoItem
              key={index}
              toDoItems={toDoItems}
              isChecked={isChecked[index]}
              onCheck={() => toggleCheck(index)}
              onDelete={() => deleteToDo(index)}
            />
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default App;
