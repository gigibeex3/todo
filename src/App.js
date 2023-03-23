import "./App.css";
import { BsJournalCheck } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";
import LocalStorage from "./LocalStorage";

function App() {
  const [toDoItem, setToDoItem] = useState("");
  const [toDoList, setTodoList] = LocalStorage('myToDoList', []);
  const [isChecked, setIsChecked] = useState([]);
  const [currentDate, setCurrentDate] = useState("");;


/* It's a hook that runs when the component mounts. It sets the current date to the current date. */
  useEffect(() => { 
    setCurrentDate(new Date().toLocaleDateString()) 
  }, []);

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


  // We're creating a new array called newToDoList that is a copy of the toDoList array. We then remove the item at the index that was passed in as an argument. We then set the toDoList state to the new array
  const handleDelete = (index) => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setTodoList(newToDoList);

    const newCheckedList = [...isChecked];
    newCheckedList.splice(index, 1);
    setIsChecked(newCheckedList);
    if (newCheckedList.every(checked => checked)) {
      setCurrentDate("");
    }
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
      <aside className="w-1/4 bg-base-content p-4">
        <ul className="text-center align-middle">
        <p className="text-white bg-neutral-focus">{currentDate}</p> {/* Date will be displayed here */}
          {toDoList.map((toDoItem, index) => (
            <div
              className="flex items-center py-3"
              key={index}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={isChecked[index]}
                onChange={() => handleCheck(index)}
              />
              <li className={isChecked[index] ? "line-through text-white opacity-50 ml-2" : "text-white align-middle ml-2"}>
                {toDoItem}
              </li>
              <VscChromeClose className="text-white text-lg hover:text-primary cursor-pointer ml-auto" onClick={() => handleDelete(index)} />
            </div>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default App;
