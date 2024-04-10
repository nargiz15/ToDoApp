import { useState } from "react";
import "./App.css";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";


import { CiCircleCheck } from "react-icons/ci";
import useLocalStorage from "use-local-storage";

function App() {
  const [todos, setTodos] = useState(["Reading a book", "Meeting"]);
  const [newTodo, setNewTodo] = useState("");

  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
    setTheme(newTheme);
   
  };

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };
  const addTask = () => {
    if (newTodo.trim() !== "") {
      setTodos((t) => [...t, newTodo]);
      setNewTodo("");
    }
  };

  return (
    <div className="app" data-theme={theme}>
      <div className="pageContainer">
        <div className="title">
          <h1>TO DO</h1>
          {/* <BsFillMoonFill
            fontSize={"30px"}
            className="moonIcon"
            onClick={switchTheme}
          /> */}
           {theme === 'light' ? (
            <BsFillMoonFill
              fontSize={"30px"}
              className="moonIcon"
              onClick={switchTheme}
            />
          ) : (
            <BsFillSunFill
              fontSize={"30px"}
              className="sunIcon"
              onClick={switchTheme}
            />
          )}
        </div>
        <div className="gradient"> </div>
      </div>
      <div className="todosContainer">
        <div className="input-icon">
          <form>
            <CiCircleCheck className="circleIcon" onClick={addTask} />
            <input
              className="mainInput"
              type="text"
              value={newTodo}
              onChange={handleChange}
              placeholder="Create a new Todo..."
            />
          </form>
        </div>

        <ol className="newTodosContainer">
          {todos.map((todo, index) => (
            <ListItem
              todos={todos}
              setTodos={setTodos}
              todo={todo}
              key={index}
              index={index}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;






const ListItem = ({ todo, todos, setTodos, index }) => {
  const [state, setState] = useState();

  const deleteTask = (index) => {
    const updatedTask = todos?.filter((_, i) => i !== index);
    setTodos(updatedTask);
  };
  console.log(state);
  return (
    <li className="list">
      <input
        type="checkbox"
        checked={todo === state ? true : false}
        onChange={(e) => {
          if (e.target.checked) {
            setState(todo);
          } else {
            setState(null);
          }
        }}
        className="checkbox"
      />
      <span
        style={{ textDecorationLine: state === todo ? "line-through" : "" }}
        className="text"
      >
        {todo}
      </span>
      <span
        className="deleteList"
        onClick={() => {
          deleteTask(index);
          setState(null);
        }}
      >
        X
      </span>
    </li>
  );
};
