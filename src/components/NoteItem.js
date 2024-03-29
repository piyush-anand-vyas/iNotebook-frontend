import React, { useContext } from "react";
import noteContext from "../contexts/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { title, description } = props.note;

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{title}</h5>
              <i
                className="fas fa-trash mx-3"
                onClick={() => {
                  deleteNote(props.note._id);
                }}
              ></i>
              <i
                className="far fa-edit mx-3"
                onClick={() => {
                  props.updateNote(props.note);
                }}
              ></i>
            </div>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
