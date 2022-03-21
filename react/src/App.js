import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoList } from './api/api';


function App() {

  let [ todolist, setTodoList ] = useState([
    { id:1, todo:'리액트 공부하기' },
    { id:2, todo:'장고 공부하기' },
  ]);

  let [ axios_list, setList ] = useState([])  

  let list = todolist.map((list) =>
    <div className='todo'>
      <li key={list.id}>{list.todo}</li>
      <input type='submit' className='update' value="수정"/>
    </div>
  );

  useEffect(() => {
    AxiosList();
  }, []);

  const AxiosList = async () => {
    try {
      const list = await TodoList();
      setList([...list.data])
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TodoList</h1>
      </header>
      <div className='content'>
      <button onClick={() => {
        axios
          .get("http://127.0.0.1:8000/api/Todo/")
          .then((res) => {
            setList([...res.data])
          })
          .catch(function (err) {
            console.log(err)
          })
      }}>Button</button>

        <div className='list'>
          { list }
        </div>

        <div className='Create'>
          <input type="text" placeholder="todo" className="input-todo"/>
          <input type='submit' onClick={() => {
            var todo = document.querySelector(".input-todo").value;
            var _todolist = [ ...todolist ];
            var len_todolist = _todolist.length+1;
            var new_todo_dict = {
              id: len_todolist,
              todo: todo
            }
            _todolist.push(new_todo_dict)
            setTodoList(_todolist)
          }}/>
        </div>

      </div>
    </div>
  );
}

export default App;
