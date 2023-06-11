import React, {useEffect} from 'react';
import {nanoid} from "nanoid";

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {

    const updateTodo = ( id, title, completed) => {
        const newTodo = todos.map(todo =>
        todo.id === id ? { id, title, completed} : todo
        )
        setTodos(newTodo)
        setEditTodo('')
    }

    useEffect(() => {
        if(editTodo) {
            setInput(editTodo.title);
        } else {
            setInput('')
        }
    }, [setInput, editTodo])

    const onInputChange = (e) => {
        setInput(e.target.value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()

        if (!editTodo) {
            setTodos([...todos, {id: nanoid(), title: input, completed: false}])
            setInput('')
        } else {
            updateTodo( editTodo.id,input, editTodo.completed)
        }
    }

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                placeholder='Enter Task'
                className='task-input'
                value={input}
                required
                onChange={onInputChange}
            />

            <button
            className={`${editTodo ? "change" : "button-add"}` }
                type='submit'
            >
                {editTodo ? 'Change' : 'Add'}
            </button>
        </form>
    );
};

export default Form;