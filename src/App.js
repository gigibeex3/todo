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

  /* When the component mounts, hook runs. Sets the current date to the current date, and only will show if task is entered */
  useEffect(() => {
    if (toDoList.length > 0) {
      setCurrentDate(new Date().toLocaleDateString());
    } else {
      setCurrentDate("");
    }
  }, [toDoList]);

  // The function takes in an event as an argument, and then sets the state of the toDoItem to the value of the input field
  const handleInput = (e) => {
    setToDoItems(e.target.value);
  };

  // When the form is submitted, prevent the default action, create a new task object with the current date and time as the id and the toDoItems as the task, add the new task to the toDoItems array, and reset the toDoItems state to an empty string
  const handleForm = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), task: toDoItems };
    addToDo(newTask);
    setToDoItems("");
  };

  return (
    <div className="background flex flex-row">
      <main className="flex h-screen w-full items-center justify-center p-4 lg:w-3/4">
        <div className="my-5 w-full max-w-xs space-y-4">
          <h1 className="lg:text-center lg:text-5xl">to-dos</h1>
          <BsJournalCheck className="mx-auto text-3xl" />
          <h2 className="text-center text-xl">Add your first to-do</h2>
          <p className="text-center">What do you want to get done today?</p>
          <form onSubmit={handleForm}>
            <div className="flex">
              <input
                type="text"
                value={toDoItems}
                onChange={handleInput}
                placeholder="i.e drink water!"
                aria-label="Enter a new to-do item"
                className="input input-sm w-full max-w-xs border-opacity-100"
              />
            </div>
          </form>
          {/* sm screen task */}
          <div className="w-full md:block lg:hidden">
            <p className="text-md text-left font-bold text-black underline underline-offset-2">
              {currentDate}
            </p>
            <ul>
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
          </div>
        </div>
      </main>
      {/* lg screen task */}
      <div className="hidden lg:block lg:w-1/4 lg:bg-black lg:bg-opacity-50 lg:p-3">
        <div className="w-full">
          <p className="text-md text-left font-bold text-white underline underline-offset-2">
            {currentDate}
          </p>
        </div>
        <ul>
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
      </div>
    </div>
  );
}

export default App;
