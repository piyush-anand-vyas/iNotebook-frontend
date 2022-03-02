import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../contexts/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "",title: "",description: "",tags:""});

  const updateNote = (currentNote) =>{
    setNote(currentNote);
    ref.current.click();
  }

  const handleChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
  }
  const handleClick = ()=>{
    editNote(note);
    refClose.current.click();
  }
  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} value={note.title} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="description" name="description" onChange={handleChange} value={note.description} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">
                    Tags
                  </label>
                  <input type="text" className="form-control" id="tags" name="tags" onChange={handleChange} value={note.tags} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row">
          {notes.map((note) => {
            return <NoteItem note={note} key={note._id} updateNote={updateNote} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
