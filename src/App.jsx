import { useState } from "react";
import "./App.css";

const CREAM = "#EDE6D6";

export default function App() {
  const [auth, setAuth] = useState(null); // "login" | "signup"
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("campuscartUser")) || null
  );

  const openAuth = (mode) => setAuth(mode);

  const handleAuth = (email, password) => {
    const accounts = JSON.parse(
      localStorage.getItem("campuscartAccounts") || "{}"
    );

    if (auth === "signup") {
      if (accounts[email]) {
        alert("An account with this email already exists.");
        return;
      }

      accounts[email] = { email, password };
      localStorage.setItem("campuscartAccounts", JSON.stringify(accounts));
    } else {
      if (!accounts[email] || accounts[email].password !== password) {
        alert("Incorrect email or password.");
        return;
      }
    }

    const loggedInUser = { email };
    localStorage.setItem("campuscartUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setAuth(null);
  };

  const logout = () => {
    localStorage.removeItem("campuscartUser");
    setUser(null);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav>
        <div className="logo">CampusCart</div>

        <div className="nav-links">
          <button onClick={() => openAuth("login")}>Buy</button>
          <button onClick={() => openAuth("login")}>Sell</button>
          <button onClick={() => openAuth("login")}>Rent</button>
          <button onClick={() => openAuth("login")}>Auctions</button>
        </div>

        <div className="nav-actions">
          {user ? (
            <button className="signin" onClick={logout}>
              Log out
            </button>
          ) : (
            <button className="signin" onClick={() => openAuth("login")}>
              Sign in
            </button>
          )}

          <div className="theme">
            <button className="active">DRK</button>
            <button
              onClick={() =>
                document.documentElement.classList.toggle("light")
              }
            >
              LGT
            </button>
          </div>

          <button
            className="account"
            onClick={() => openAuth(user ? "login" : "signup")}
          >
            {user ? "Account" : "Create account"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <main>

        <section className="hero">
          <div className="eyebrow">CAMPUS COMMERCE, MADE EASY</div>

          <h1>
            Your campus.
            <br />
            Your market.
          </h1>

          <p>
            Everything students need, swapped within the uni community.
            <br />
            No global noise, no strangers — just verified people who
            <br />
            already share your lecture halls.
          </p>

          <div className="hero-buttons">
            <button
              className="primary"
              onClick={() => openAuth("signup")}
            >
              Create account
            </button>

            <button
              className="secondary"
              onClick={() => openAuth("login")}
            >
              Sign in
            </button>
          </div>
        </section>

        {/* FEATURE CELLS */}
        <section className="features">

          <Feature
            title="Buy"
            text="Find affordable stuff from students around your campus."
            onClick={() => openAuth("login")}
          />

          <Feature
            title="Sell"
            text="Turn unused books, electronics and furniture into cash."
            cream
            onClick={() => openAuth("login")}
          />

          <Feature
            title="Rent"
            text="Borrow pricey or one-time-use things instead of buying."
            onClick={() => openAuth("login")}
          />

          <Feature
            title="Auction"
            text="Let students bid and sell to the highest bidder."
            onClick={() => openAuth("login")}
          />

        </section>

      </main>

      {/* AUTH MODAL */}
      {auth && (
        <AuthModal
          mode={auth}
          switchMode={() =>
            setAuth(auth === "login" ? "signup" : "login")
          }
          close={() => setAuth(null)}
          submit={handleAuth}
        />
      )}

    </div>
  );
}


/* FEATURE CARD */

function Feature({ title, text, cream, onClick }) {
  return (
    <div
      className={`feature ${cream ? "cream" : ""}`}
      onClick={onClick}
    >
      <h2>{title}</h2>
      <p>{text}</p>
      <span>Enter →</span>
    </div>
  );
}


/* LOGIN / SIGNUP */

function AuthModal({ mode, switchMode, close, submit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    submit(email, password);
  };

  const signup = mode === "signup";

  return (
    <div className="overlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <button className="close" onClick={close}>
          ×
        </button>

        <div className="modal-logo">CC</div>

        <h2>
          {signup ? "Verify & Join" : "Welcome back"}
        </h2>

        <p>
          {signup
            ? "Create your CampusCart account."
            : "Log in to your CampusCart account."}
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit">
            {signup ? "Create Account" : "Log In"}
          </button>

        </form>

        <div className="switch">
          {signup ? "Already have an account?" : "New to CampusCart?"}

          <button onClick={switchMode}>
            {signup ? " Log in" : " Sign up"}
          </button>
        </div>

      </div>
    </div>
  );
}