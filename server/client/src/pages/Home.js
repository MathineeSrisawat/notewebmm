import { useEffect } from "react";
import { useNotesContext } from "../hooks/useNotesContext";

// components
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";

const Home = () => {
  const { notes, dispatch } = useNotesContext();

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
    };

    fetchNotes();
  }, [dispatch]);

  return (
    <div className="home">
      <NoteForm />
      <div className="notes">
        {notes &&
          notes.map((note) => <NoteDetails note={note} key={note._id} />)}
      </div>
    </div>
  );
};

export default Home;
