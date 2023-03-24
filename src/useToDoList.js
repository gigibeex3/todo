import { useState } from 'react';
import LocalStorage from './LocalStorage';


const useToDoList = () => {
    /* Using the LocalStorage hook to create a toDoList state and a setTodoList function. */
    const [toDoList, setTodoList] = LocalStorage('myToDoList', []);
    const [isChecked, setIsChecked] = useState([]);


    //  AddToDo takes a toDoItem and adds it to the toDoList array, and adds a false value to the isChecked array. @param toDoItem - the item that is being added to the list
    const addToDo = (toDoItem) => {
        setTodoList([...toDoList, toDoItem]);
        setIsChecked([...isChecked, false]);
    };

    /**
     * When the user clicks on a checkbox, toggle the value of the checkbox at the index of the
     * checkbox that was clicked.
     * @param index - the index of the item in the list
     */
    const toggleCheck = (index) => {
        const newCheckedList = [...isChecked];
        newCheckedList[index] = !isChecked[index];
        setIsChecked(newCheckedList);
    };

    /**
     * When the delete button is clicked, the todo item is removed from the todo list and the
     * corresponding checkbox is removed from the checked list.
     * @param index - the index of the todo item in the todo list
     */
    const deleteToDo = (index) => {
        const newToDoList = [...toDoList];
        newToDoList.splice(index, 1);
        setTodoList(newToDoList);
        const newCheckedList = [...isChecked];
        newCheckedList.splice(index, 1);
        setIsChecked(newCheckedList);
    };

    return { toDoList, addToDo, toggleCheck, deleteToDo, isChecked };
}

export default useToDoList