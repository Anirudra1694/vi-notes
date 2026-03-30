import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WritingEditor.css";

const WritingEditor = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Untitled Session");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
  if (!id) return;

  fetch(`http://localhost:5000/api/sessions/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setText(data.content);
      setTitle(data.title || "Untitled Session");
    });
}, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const wordCount =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/sessions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        content: text,
        title: title,
      }),
    });

    alert("Saved!");
  };

  return(
  <div className="editor-page">
    <div className="editor-container">
      
      <div className="editor-header">
        <input 
          className="editor-title"
          value={title}
          placeholder="Untitled Session"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="header-actions">
          
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <br/>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="editor-meta">
        <span>Characters: {text.length}</span>
        <span>Words: {wordCount}</span>
      </div>

      <textarea
        ref={textareaRef}
        className="editor-textarea"
        value={text}
        onChange={handleChange}
        placeholder="Start writing your thoughts here..."
      />
    </div>
  </div>
);
};

export default WritingEditor;