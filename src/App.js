import List from "./List";
// import AddTask from "./Pages/AddTask";
import './App.css';
import {useState, useEffect} from "react"
import { uid } from "uid";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
                
    const [todo, setTodo] = useState ([])

  const [formData, setFormData] = useState ({
    task : ""
  })

  useEffect(() => {
    //Fetch Data
    axios.get('http://localhost:3000/Tasks').then((res) => {
      console.log(res.data)
      setTodo(res.data)
    })
  },[])

  const [isUpdate, setIsUpdate] = useState ({id: null, status: false})

  function handleChange(e){
    let data = {...formData}
    data[e.target.name] = e.target.value
    setFormData(data)
  }

  function handleSubmit(e){
    e.preventDefault()
    // alert("Done")
    let data = [...todo]

    if(formData.task === ""){
      return false
    }

    if (isUpdate.status) {
      data.forEach((todo) => {
        if (todo.id === isUpdate.id) {
          todo.task = formData.task
        }
      })

      axios.put(`http://localhost:3000/Tasks/${isUpdate.id}`, {
        task: formData.task
      }).then (res => {
        alert('Berhasil Update Task')
      })

    } else {
      let newData ={id: uid(), task: formData.task}
    data.push(newData)

    axios.post('http://localhost:3000/Tasks', newData).then (res => {
      alert('Berhasil Submit Task Baru')
    })
    }

    
    setTodo(data)
    setFormData({task: ""})
    setIsUpdate({id: null, status: false})
  }

  function handleEdit(id){

    let data = [...todo]
    let foundData = data.find((todo) => todo.id === id)
    setFormData({ task: foundData.task})
    setIsUpdate({id : id, status: true})
  }

  function handleDelete(id){
    let data = [...todo]
    let filteredData = data.filter((todo) => todo.id !== id)

    axios.delete(`http://localhost:3000/Tasks/${id}`).then(res =>{
      alert('Berhasil Hapus Task')
    })

    setTodo(filteredData)
  }

  return (

    <div className="App">
          <h1 className="title py-3"> To Do List </h1>

          <div className="SearchSection my-3 border">
              <form className="todoForm">
                  <div className="searchForm d-flex justify-content-between">
                    <button className="search-btn w-25 mx-3 my-2 bg-info rounded"> Create/Edit </button>
                    {/* <Route path="/add" component={AddTask}/> */}
                    <input type="text" className="todo-search w-25 mx-3 rounded"></input>
                  </div>
                  <div className="d-flex justify-content-end">
                  <button className="search-btn w-25 mx-3 my-2 bg-info rounded"> search </button>
                  </div>
              </form>
          </div>

          <div className="TodoSection my-3 border">
            <h3> Submit To Do List </h3>
            <form onSubmit={handleSubmit} className="TaskForm">

              <div className="ActionForm mt-3">
                <input 
                type="text" 
                className="action-form my-2 mx-2 w-25 rounded"
                onChange={handleChange}
                value={formData.task} 
                name="task"></input>
              </div>

            <button className="add-btn w-25 mx-3 bg-info rounded"> submit </button>
            </form>
          </div>

          

          <List handleDelete={handleDelete} handleEdit={handleEdit} data={todo} />
    </div>

  );
}

export default App;
