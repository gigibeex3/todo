import React from "react";
import { VscChromeClose } from "react-icons/vsc";

/* A function that takes in props and returns a div. */
const ToDoItem = ({ toDoItems, isChecked, onCheck, onDelete }) => {
    return (
        <div className="flex items-center py-3">
           {/* Creating a checkbox that is checked if the isChecked prop is true. */}
            <input
                type="checkbox"
                className="checkbox border-white rounded-full w-5 h-5 border-2"
                checked={isChecked}
                onChange={onCheck}
            />
            {/* This is a ternary operator. It is saying if isChecked is true, then apply the first
            className, otherwise apply the second className. */}
            <li
                className={
                    isChecked
                        ? "ml-2 text-white line-through opacity-50"
                        : "ml-2 align-middle text-white"
                }
            >
                {toDoItems.task}
            </li>
            <VscChromeClose
                className="ml-auto cursor-pointer text-lg text-white hover:text-primary"
                onClick={onDelete}
            />
        </div>
    );
};

export default ToDoItem;
