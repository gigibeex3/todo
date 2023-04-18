import { useState } from "react";
import LocalStorage from "./LocalStorage";

const useToDoList = () => {
    /* Using the LocalStorage hook to create a toDoList state and a setTodoList function. */
    const [toDoList, setTodoList] = LocalStorage("myToDoList", []);
    const [isChecked, setIsChecked] = useState([]);

    //  add item to TodoList
    const addToDo = (toDoItem) => {
        setTodoList([...toDoList, toDoItem]);
        setIsChecked([...isChecked, false]);
    };

    // checks or unchecks
    const toggleCheck = (index) => {
        const newCheckedList = isChecked.map((isCheckedItem, itemIndex) => {
            if (itemIndex === index) {
                return !isCheckedItem;
            }
            return isCheckedItem;
        });
        setIsChecked(newCheckedList);
    };

    // deletes list
    const deleteToDo = (id) => {
        const index = toDoList.findIndex((toDoItem) => toDoItem.id === id);
        if (index > -1) {
            const newToDoList = [...toDoList];
            newToDoList.splice(index, 1);
            setTodoList(newToDoList);
            const newCheckedList = [...isChecked];
            newCheckedList.splice(index, 1);
            setIsChecked(newCheckedList);
        }
    };

    return { toDoList, addToDo, toggleCheck, deleteToDo, isChecked };
};

export default useToDoList;
