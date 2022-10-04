import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

// button-group
const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

const itemsData = [
  {
    key: uuid(),
    label: "Have fun",
  },
  {
    key: uuid(),
    label: "Spread Empathy",
  },
  {
    key: uuid(),
    label: "Generate Value",
  },
];

function App() {
  const [itemToDo, setItemTodo] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('Item'))||itemsData);
  const [type, setType] = useState("all");

  const handleItemToDo = (event) => {
    setItemTodo(event.target.value);
  };

  
  localStorage.setItem('Item', JSON.stringify(items))
  const handleAddItem = () => {
    const newObj = { key: uuid(), label: itemToDo };

    setItems([newObj, ...items]);

    setItemTodo("");
  };

 const handleDeleteItem = (key) =>{
     setItems([...items].filter((item)=>item.key!==key))
 };
 
  const handleItemDone = (key) => {
    const newArray = items.map((item) => {
      if (item.key === key) {
        return { ...item, isDone: !item.isDone };
      } else return item;
    });

    setItems(newArray);
  };

  

  const handleChangeStatus = (type) => {
    setType(type);
  };

  const doneItems = items.filter((item) => item.isDone);
  const notDoneItems = items.filter((item) => !item.isDone);

  const filteredItems =
    type === "active" ? notDoneItems : type === "done" ? doneItems : items;


    const [searchI, setSearchI] = useState("");

  const handleChange = (event) => {
    setSearchI(event.target.value);
  };

   console.log(searchI)

  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List </h1>
        <h2>
          {notDoneItems.length} more to do, {doneItems.length} done
        </h2>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
        <input
          type="text"
          value={searchI}
          onChange={handleChange}
          className="form-control search-input"
          placeholder="type to search"
        />
        {/* Item-status-filter */}
        <div className="btn-group">
          {buttons.map((itemB) => (
            <button
              key={itemB.type}
              type="button"
              // type
              className={`btn btn${type === itemB.type ? "" : "-outline"}-info`}
              onClick={() => handleChangeStatus(itemB.type)}
            >
              {itemB.label}
            </button>
          ))}
        </div>
      </div>


      {/* List-group */}
      <ul className="list-group todo-list">
        {filteredItems.filter((item) => {
          const search = (item.label).toLowerCase();
          return search.includes(searchI.toLowerCase())
        }).map((item) => (
          <li
           
            className="list-group-item"
            
          >
            <span className={`todo-list-item ${item.isDone ? "important" : ""}`}>
              <span  onClick={() => handleItemDone(item.key)}className="todo-list-item-label">{item.label}</span>

              <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
              >
                <i className="fa fa-exclamation" />
              </button>

              <button
                type="button"
                key={item.key}
                onClick={()=> handleDeleteItem(item.key)}
                className="btn btn-outline-danger btn-sm float-right"
              >
                <i className="fa fa-trash-o" />
              </button>
            </span>
          </li>
        ))}
      </ul>



      <div className="item-add-form d-flex">
        <input
          value={itemToDo}
          onChange={handleItemToDo}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>
          Add item
        </button>
      </div>
    </div>
  );
}

export default App;