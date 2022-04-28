import React, { useEffect, useState } from "react";
import "./App.css";
import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import Debounce from "./Debounce";
import Debounce2 from "./Debounce2";
import axios from "axios";

function App() {
  // const [users, setUsers] = useState(JsonData.slice(0, 100));
  const [users, setUsers] = useState([]);
  const initialState = {
    username: "",
    password: "",
    email: "",
    number: "",
  };
  const [formValues, setFormValue] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [text, setText] = useState("");
  const [listItem, setListItem] = useState([]);
  const [edit, setEdit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  };
  const addItemToList = () => {
    if (text === "") {
      alert("Please fill the input filed");
    } else {
      setListItem([...listItem, { title: text, id: Date.now() }]);
      setText("");
      setEdit(false);
      // setIsEditing(false);
    }
  };
  const deleteTodo = (id) => {
    const newList = listItem.filter((item) => item.id !== id);
    setListItem(newList);
  };
  const clearAll = () => {
    setListItem([]);
  };
  const editTodo = (id) => {
    setEdit(true);
    const newList = listItem.filter((item) => item.id !== id);

    const edit = listItem.find((item) => item.id === id);
    // console.log(edit);
    setListItem(newList);
    setText(edit.title);
  };
  const handleSubmit = () => {
    // setIsSubmit(true);
    if (
      formValues.username ||
      formValues.password ||
      formValues.email ||
      formValues.number
    ) {
      setIsValid(true);
    }
    setIsSubmit(true);
    setFormValue({ username: "", password: "", email: "", number: "" });
  };

  const getData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const data = res.data;
    setUsers(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  const pageVisited = pageNumber * userPerPage;
  const displayUsers = users
    .slice(pageVisited, pageVisited + userPerPage)
    .map((user) => <div key={user.id}>{user.id}</div>);

  const pageCount = Math.ceil(users.length / userPerPage);
  const onPageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="App">
      <br />
      <br />
      <Debounce />
      <br />
      <br />
      <Debounce2 />
      <br />
      <br />

      {displayUsers}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"PaginationBttns"}
        activeClassName={"paginationActive"}
      />

      <div className="input-field">
        {isSubmit && isValid ? <div>Form submission successful</div> : null}
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
        />
        {isSubmit && !formValues.username ? (
          <p>Please fill the user name</p>
        ) : null}
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        {isSubmit && !formValues.email ? (
          <p>Please fill the user email</p>
        ) : null}
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {isSubmit && !formValues.password ? (
          <p>Please fill the user password</p>
        ) : null}
        <input
          type="number"
          name="number"
          value={formValues.number}
          onChange={handleChange}
        />
        {isSubmit && !formValues.number ? (
          <p>Please fill the user numver</p>
        ) : null}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="add-todo">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addItemToList}>{edit ? "Save" : "Add"}</button>
      </div>
      {listItem.length > 0 ? (
        <div className="list">
          {listItem.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <button onClick={() => editTodo(item.id)}>Edit</button>
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div>No list to show</div>
      )}
      <button onClick={clearAll}>Clear all</button>
    </div>
  );
}

export default App;
