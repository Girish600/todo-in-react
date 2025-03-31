import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const App1 = () => {

    const [text, setText]= useState('');
    const [todo, setTodo]= useState(()=> {return JSON.parse(localStorage.getItem('todo')) || []});

    const handleSubmit=()=>{
        const todoObj={
            id:Date.now(),
            title:text,
            status:false
        }
        setTodo((prev)=>[...prev, todoObj]);
        setText('');
    }

    useEffect(()=>{
        localStorage.setItem('todo', JSON.stringify(todo));
    },[todo])

    const handleDelete=(id)=>{
        setTodo((prev)=>prev.filter((item)=>item.id !== id))
    }

    const handleStatus=(id)=>{
        setTodo((prev)=>prev.map((item)=> item.id === id ? {...item, status: !item.status} : item))
    }


  return (
    <>
        <div>
            <h1>Add your task...</h1>
            <input type='text' onChange={(e)=>setText(e.target.value)} value={text} placeholder='enter your task...'/>
            <button onClick={handleSubmit}>Add</button>
        </div>
        {
            todo.map((item)=>(
                <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.status ? "completed" : "pending"}</p>
                    <button onClick={()=>handleStatus(item.id)}>status</button>
                    <button onClick={()=>handleDelete(item.id)}>Delete</button>
                </div>
            ))
        }
    </>
  )
}

export default App1