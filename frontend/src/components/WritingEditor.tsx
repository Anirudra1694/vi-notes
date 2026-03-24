import { useState, useRef, useEffect } from "react";
import "./WritingEditor.css";

const WritingEditor = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
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
    </div>
  );
};

export default WritingEditor;