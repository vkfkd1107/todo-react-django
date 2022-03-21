import './App.css';
import { useEffect, useState } from 'react';
import { TodoList } from './api/api';


function App() {

  let [ todolist, setTodoList ] = useState([])

  let list = todolist.map((list) =>
    <li className='list' key={list.id}>
        {list.title}
        <input type='submit' className='update' value="수정"/>
    </li>
  );

  useEffect(() => {
    AxiosList();
  }, []);

  const AxiosList = async () => {
    try {
      const list = await TodoList();
      setTodoList([...list.data])
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

        <div className='todo'>
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
