import React,{useContext, useState} from "react";
import noteContext from '../contexts/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tags:"general"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tags);
    }

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

  return (
    <>
      <div className="container my-3">
        <h2>Add Your Notes</h2>
      </div>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
