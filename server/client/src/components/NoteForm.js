import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";

const NoteForm = () => {
  const { dispatch } = useNotesContext();

  const [title, setTitle] = useState("");
  const [before, setBefore] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState('')
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = { title, before, text,image };

    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setBefore("");
      setText("");
      setImage('')
      dispatch({ type: "CREATE_NOTE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
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
        onChange={(e) => setBefore(e.target.value)}
        value={before}
      />

      <label>Story:</label>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <label>image:</label>
      <input
        type="text"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />

      <button>Add Note</button>
    </form>
  );
};

export default NoteForm;
