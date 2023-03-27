import React from "react";
import { VscChromeClose } from "react-icons/vsc";

/* A function that takes in props and returns a div. */
const ToDoItem = ({ toDoItems, isChecked, onCheck, onDelete }) => {
    return (
        <div className="flex items-center py-3">
            {/* Creating a checkbox that is checked if the isChecked prop is true. */}
            <input
                type="checkbox"
                className="checkbox h-5 w-5 rounded-full border-2 lg:border-white"
                checked={isChecked}
                onChange={onCheck}
            />
            {/* This is a ternary operator. It is saying if isChecked is true, then apply the first
            className, otherwise apply the second className. */}
            <li
                className={
                    isChecked
                        ? "ml-2 line-through opacity-50 md:text-black lg:text-white"
                        : "ml-2 align-middle md:text-black lg:text-white"
                }
            >
                {toDoItems.task}
            </li>
            <VscChromeClose
                className="ml-auto cursor-pointer text-sm text-black hover:text-primary lg:text-lg lg:text-white"
                onClick={onDelete}
            />
        </div>
    );
};

export default ToDoItem;
