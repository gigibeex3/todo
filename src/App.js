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

  useEffect(() => {
    if (toDoList.length > 0) {
      setCurrentDate(new Date().toLocaleDateString());
    } else {
      setCurrentDate("");
    }
  }, [toDoList]);

  const handleInput = (e) => {
    setToDoItems(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), task: toDoItems };
    addToDo(newTask);
    setToDoItems("");
  };

  return (
    <div className="flex flex-row">
    <main className="flex min-h-screen w-full justify-center p-4 lg:w-3/4 lg:items-center">
      <div className="w-full max-w-xs flex-grow lg:my-5 lg:space-y-4">
        <div className="my-3 flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-4">
          <h1 className="font-bold lg:text-center lg:text-5xl lg:font-normal">
            to-dos
          </h1>
          <BsJournalCheck className="lg:mx-auto lg:text-3xl" />
        </div>
          <h2 className="hidden lg:block lg:text-center lg:text-xl">
            Add your first to-do
          </h2>
          <p className="hidden lg:block lg:text-center">
            What do you want to get done today?
          </p>
          <div className="fixed bottom-0 mx-auto my-4 w-full lg:static lg:w-auto lg:p-0">
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
          </div>
          {/* sm screen task */}
          <div className="relative w-full md:block lg:hidden">
          <p className="text-md mt-5 text-left font-bold text-black underline underline-offset-2">
            {currentDate}
          </p>
          <ul className="tasks max-h-screen overflow-y-auto pb-16">
              {toDoList.map((toDoItems) => (
                <ToDoItem
                  key={toDoItems.id}
                  toDoItems={toDoItems}
                  isChecked={isChecked[toDoItems.id]}
                  onCheck={() => toggleCheck(toDoItems.id)}
                  onDelete={() => deleteToDo(toDoItems.id)}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>
      {/* lg screen task */}
      <div className="scrollable-right hidden lg:block lg:w-1/4 lg:bg-black lg:bg-opacity-50 lg:p-3">
        <div className="w-full">
          <p className="text-md text-left font-bold text-white underline underline-offset-2">
            {currentDate}
          </p>
        </div>
        <ul>
          {toDoList.map((toDoItems) => (
            <ToDoItem
              key={toDoItems.id}
              toDoItems={toDoItems}
              isChecked={isChecked[toDoItems.id]}
              onCheck={() => toggleCheck(toDoItems.id)}
              onDelete={() => deleteToDo(toDoItems.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
