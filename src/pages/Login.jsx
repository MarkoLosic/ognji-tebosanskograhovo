import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Neispravni podaci za prijavu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="section-how">
        <div className="container admin-panel">
          <h2 className="heading-secondary">Prijava</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="admin-label">
              Email
              <input
                className="admin-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label className="admin-label">
              Lozinka
              <input
                className="admin-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {error && <p className="admin-error">{error}</p>}
            <button className="btn btn--full" type="submit" disabled={loading}>
              {loading ? "Prijava..." : "Prijavi se"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
