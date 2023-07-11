import React, { useEffect, useRef, useState } from "react";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
      <div>
        <label className="font-thin tracking-widest font-serif text-[18px]" htmlFor={props.id}>
          Updated Text : 
        </label>
        <input
          id={props.id}
          type="text"
          value={newName || props.name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>

      <div className="btn-group">
     <button
  type="button"
  onClick={() => setEditing(false)}
  className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-100 rounded hover:bg-white group"
>
  <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
    Cancel 
  </span>
</button>


<button
  type="submit"
  className=" relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-blue-100 rounded hover:bg-white group ml-2 mt-1"
>
  <span className="w-48 h-48 rounded rotate-[-40deg] bg-blue-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
    Save
  </span>
</button>

      </div>
    </form>
  );

  const viewTemplate = (
    <div className="flex justify-center mt-6">
      <div className="ml-10">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="pl-1" htmlFor={props.id}>
            {props.name}
          </label>

        </div>
        <div className="pl-10 relative bottom-4">
        <button
  type="button"
  onClick={() => setEditing(true)}
  ref={editButtonRef}
  className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-blue-100 rounded hover:bg-white group"
>
  <span className="w-48 h-48 rounded rotate-[-40deg] bg-blue-700 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
    Edit 
  </span>
</button>


<button
  type="button"
  onClick={() => props.deleteTask(props.id)}
  className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-100 rounded hover:bg-white group"
>
  <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-700 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
    Delete 
  </span>
</button>

        </div>
    </div>
  );


  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
