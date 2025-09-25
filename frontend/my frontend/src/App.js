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
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Send Referral Email</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", marginTop: "1rem" }}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              {key.replace("_", " ").toUpperCase()}
            </label>
            <input
              type={key === "referral_amount" ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Send Email
        </button>
      </form>
    </div>
  );
}

export default App;
