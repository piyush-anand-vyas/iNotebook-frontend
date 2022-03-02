import NoteContext from './noteContext'
import {useState} from 'react'

const NoteState = (props)=>{
  const host = 'https://notes-managing-app-backend.herokuapp.com';
    const getNotes = async ()=>{
      const response = await fetch(`${host}/api/notes/getallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const notes = await response.json();
      console.log(localStorage.getItem('token'));
      setNotes(notes);
    }
      const [notes, setNotes] = useState([{title: "",description: "",tags:""}]);

      //Add a new note
      const addNote = async (title, description, tags)=>{
        const note = {title,description,tags};
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify(note) // body data type must match "Content-Type" header
        });
        //return response.json();
        setNotes(notes.concat(note));
        const json = await response.json();
        console.log(json);
        
      }

      const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        //const notes = await response.json();
        //console.log(notes);
        const newNotes = notes.filter((note)=>note._id!==id);
        setNotes(newNotes);
        const json = await response.json();
        console.log(json);
      }

      //Update notes
      const editNote = async (note)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${note._id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify(note) // body data type must match "Content-Type" header
        });
        const newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          if(newNotes[index]._id === note._id){
            newNotes[index].title = note.title;
            newNotes[index].description = note.description;
            newNotes[index].tags = note.tags;
            break;
          }
        }
        setNotes(newNotes);
        const json = await response.json();
        console.log(json);
      }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, getNotes, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;