import { useState, useRef, useEffect } from "react";
import "./WritingEditor.css";
import { useNavigate } from "react-router-dom";

const WritingEditor = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
  };

  return (
    <div className="editor-container">
      <h2 className="editor-title">Writing Editor</h2>

      <textarea
        ref={textareaRef}
        className="editor-textarea"
        value={text}
        onChange={handleChange}
        placeholder="Type your content here..."
      />

      <div className="editor-meta">
        Characters: {text.length}
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default WritingEditor;