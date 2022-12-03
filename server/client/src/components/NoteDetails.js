import { useNotesContext } from "../hooks/useNotesContext";
import { useState } from "react"

const NoteDetails = ({ note }) => {
  const { dispatch } = useNotesContext();


  const handleEdit = async () => {
    const notebodyedit = { title:title, text:text, Before:Date };
    const response = await fetch("/api/notes/" + note._id, {
      method: "PATCH",
      body: JSON.stringify(notebodyedit),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDate("");
      setText("");
      dispatch({ type: "SET_NOTES", payload: json });
    }
  };
  
  const noteid = note._id;
  const [title, setTitle] = useState(note.title);
  const [Date, setDate] = useState(note.before);
  const [text, setText] = useState(note.text);
  const [image,setImage] = useState(note.image);
  const [targetedit, setTargetedit] = useState('');
 
  if (image == ''){
    setImage('https://upload.wikimedia.org/wikipedia/en/6/6e/Forky_waving.png')
  }
  
  const targeteditset = () => {
    setTargetedit(note._id);
  }
  console.log(noteid)
  const handleClick = async () => {
    const response = await fetch("/api/notes/" + noteid, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    }
  };

  if (targetedit === note._id) {
    return (
    <div className="note-details">
    <h4>{note.title}</h4>
    <p>
      <strong>Date: </strong>
      {note.before}
    </p>
    <p>
      <strong>Story: </strong>
      {note.text}
    </p>
    <span onClick={handleClick}>Delete</span>
    <span className="Edit" onClick={targeteditset}>Edit</span>
    <form className="create" onSubmit={handleEdit} >
    <div className="head2"><h3>Add a New Note</h3></div>

    <label>Note : </label>
    <input
      type="text"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
    />

    <label>Date:</label>
    <input
      type="date"
      onChange={(e) => setDate(e.target.value)}
      value={Date}
    />

    <label>Story:</label>
    <input
      type="text"
      onChange={(e) => setText(e.target.value)}
      value={text}
    />

    <label>Image:</label>
    <input
      type="text"
      onChange={(e) => setImage(e.target.value)}
      value={image}
    />

    <button>Save</button>
  </form>
  </div>)
  }

  if(targetedit !== note.id) {
    return (
    <div className="note-details">
    <h4>{note.title}</h4>
    <img src={image}/>
    <p>
      <strong>Date: </strong>
      {note.before}
    </p>
    <p>
      <strong>Story: </strong>
      {note.text}
    </p>
    
    <span onClick={handleClick}>Delete</span>
    <span className="Edit" onClick={targeteditset}>Edit</span>

    
  </div>)
  }
     
};

export default NoteDetails;
