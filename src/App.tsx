import React, { useState } from 'react';
import './App.css';

type Props = {}

interface item {
  id: number,
  name: string,
  lastName: string,
  status: number
}

export default function App({}: Props) {

  const [todos, setTodos] = useState<item[]>([]);
  
  var [todosFind, setTodosFind] = useState<item[]>([]);

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [editName, editSetName] = useState<string>("");
  const [editLastName, editSetLastName] = useState<string>("");

  const [value, setValue] = useState<string>("");

  const addPerson = () => {
    const newTodo: item = {
      id: + new Date(),
      name: name,
      lastName: lastName,
      status: 1,
    }
    setTodos([...todos, newTodo]);
    setName("");
    setLastName("");
  }

  const editPerson = (index: number) => {
    todos[index].status = 8;
    editSetName(todos[index].name);
    editSetLastName(todos[index].lastName);
    setTodos([...todos]);
  }

  const savePerson = (index: number) => {
    todos[index].name = editName;
    todos[index].lastName = editLastName;
    todos[index].status = 1;
    setTodos([...todos]);
  }

  const removePerson = (index: number) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  }

  const backEdit= (index: number) => {
    todos[index].status = 1;
    setTodos([...todos]);
  }
  
  const findData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    var textFind = event.target.value;
    if (textFind.length > 2) {
      const array = todos.filter((todos) => todos.name.includes(textFind) || todos.lastName.includes(textFind));
      todosFind = array;
      setTodosFind([...todosFind]);
    }
  }
 
  return (
    <div>
      <h1>App to do list</h1>

      <ul>
        {
          todos.map((todo: item, index:number) => {
            if (todo.status == 1) {
              return (
                <li key={todo.id}>
                  ชื่อ: {todo.name} สกุล: {todo.lastName}
                  <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={() => editPerson(index)}>แก้ไข</button>
                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={() => removePerson(index)}>ลบข้อมูล</button>
                </li>
              )
            } else {
              return (
                <li key={todo.id}>
                  ชื่อ:
                  <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500 border-solid border-2 mx-3' type="text" value={editName} onChange={(e) => editSetName(e.target.value)} />
                  สกุล: {todo.lastName}
                  <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500 border-solid border-2 mx-3' type="text" value={editLastName} onChange={(e) => editSetLastName(e.target.value)} />
                  <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={() => savePerson(index)}>บันทึกข้อมูล</button>
                  <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={() => backEdit(index)}>ย้อนกลับ</button>
                </li>
              )
            }
          })
        }
      </ul>

      <form className='mt-3 mb-3'>
        <label>ชื่อ:</label>
        <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500 border-solid border-2 mx-3' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>สกุล:</label>
        <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500 border-solid border-2 mx-3' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      
      </form>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={addPerson}>add person</button>
      
      <div className='mt-3 mb-3'>
        <h3>ค้นหาข้อมูล</h3>
        <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500 border-solid border-2 mx-3' type="text" value={value} onChange={findData} />
        <ul>
          {
            todosFind.map((todo: item) => {
              return (
                <li key={todo.id}>
                  ชื่อ: {todo.name} สกุล: {todo.lastName}
                </li>
              )
            })
          }
        </ul>
      </div>

    </div>
  )
}