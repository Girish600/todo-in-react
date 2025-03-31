import { useState } from 'react';
import './App.css'

function App() {

  const [text, setText]= useState("");
  const [todo,setTodo]= useState([]);

  const handleSubmit=()=>{
    const todoObj={
      id:Date.now(),
      title:text,
      status:false
    }
    setTodo((prev)=>[...prev,todoObj]);
    setText('');
  }

  const handleStatus=(id)=>{
    setTodo((prev)=>prev.map((item)=>item.id === id ? {...item, status: !item.status} : item));
  }

  const handleDelete=(id)=>{
    setTodo((prev)=>prev.filter((item)=>item.id !== id))
  }

  return (
    <>
      <div>
        <h1>Add your task...</h1>
        <input type='text' value={text} name='text' onChange={(e)=>setText(e.target.value)} placeholder='enter your task...'/>
        <button onClick={handleSubmit}>Add</button>
      </div>
      {
        todo.map((item)=>(
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.status ? 'completed' : 'pending'}</p>
            <button onClick={()=>handleStatus(item.id)}>status</button>
            <button onClick={()=>handleDelete(item.id)}>Delete</button>
          </div>
        ))
      }
    </>
  )
}

export default App
