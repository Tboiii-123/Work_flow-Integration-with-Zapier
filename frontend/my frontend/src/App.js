import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    to: "",
    from: "Medbuddy <info@medbuddyafrica.com>",
    user_name: "",
    referred_name: "",
    course_name: "",
    currency: "",
    referral_amount: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/workflow/start/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error sending workflow:", error);
      alert("Failed to send workflow. Check console for details.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9fafb",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "2rem"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px"
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#111827"
          }}
        >
          Send Referral Email
        </h1>

        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={{ marginBottom: "1.25rem" }}>
              <label
                htmlFor={key}
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#374151"
                }}
              >
                {key.replace("_", " ").toUpperCase()}
              </label>
              <input
                id={key}
                type={key === "referral_amount" ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  fontSize: "0.95rem",
                  transition: "border 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
                onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.9rem",
              backgroundColor: "#3b82f6",
              color: "white",
              fontSize: "1rem",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
