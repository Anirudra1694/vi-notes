import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionsList.css";

const SessionsList = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const fetchSessions = async () => {
    const res = await fetch("http://localhost:5000/api/sessions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setSessions(data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const createSession = async () => {
    const res = await fetch("http://localhost:5000/api/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    navigate(`/editor/${data._id}`);
  };

  const deleteSession = async (id: string) => {
    await fetch(`http://localhost:5000/api/sessions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchSessions();
  };

  const renameSession = async (id: string, title: string) => {
    await fetch(`http://localhost:5000/api/sessions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title }),
    });

    fetchSessions(); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, []);

  return (
    <div className="sessions-container">
      <div className="sessions-box">
        
        <div className="btn-row">
        <button className="new-session-btn" onClick={createSession}>
          Create New Session
        </button>

        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
        </div>

        <br />

        <h2 className="sessions-title">Your Sessions...</h2>

        {sessions.length === 0 ? (
          <div className="no-sessions">
          No saved sessions yet! Create a new one.
          </div>
          ) : (
        
        sessions.map((s) => (
          <div key={s._id} className="session-card">
            <span
              className="session-title"
              onClick={() => navigate(`/editor/${s._id}`)}
            >
              {s.title || "Untitled Session"}
            </span>

            <div className="menu-wrapper" ref= {menuRef}>
              <button
                className="menu-btn"
                onClick={() =>
                  setMenuOpen(menuOpen === s._id ? null : s._id)
                }
              >
                ⋮
              </button>

              {menuOpen === s._id && (
                <div className="menu-dropdown">
                  <div
                    className="menu-item"
                    onClick={() => navigate(`/editor/${s._id}`)}
                  >
                    Open
                  </div>

                  <div
                    className="menu-item"
                    onClick={() => {
                      const newTitle = prompt("Rename session:");
                      if (newTitle) renameSession(s._id, newTitle);
                    }}
                  >
                    Rename
                  </div>

                  <div
                    className="menu-item delete"
                    onClick={() => deleteSession(s._id)}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          </div>
        )))}
      </div>     
      
    </div>
  );
};

export default SessionsList;