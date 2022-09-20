import React from 'react'

function List({data, handleEdit, handleDelete}) {
  return (
    <div className="list-group">
      {
        data.map((todo) => {
          return (
            <div className="list-group-item list-group-item-action border my-2">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{todo.task}</h5>
                <div>
                  <button onClick={() => handleEdit(todo.id)} className="btn btn-sm btn-link">Edit</button>
                  <button onClick={() => handleDelete(todo.id)} className="btn btn-sm btn-link">Del</button>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default List