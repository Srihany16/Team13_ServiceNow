import { useState } from "react";
import "./App.css";

function App() {
  const [view, setView] = useState("student");

  return (
    <div className="app">
      <header className="navbar">
        <div>
          <h1>RIPPLE</h1>
          <span>Predict • Connect • Support</span>
        </div>

        <div className="view-switch">
          <button
            className={view === "student" ? "active" : ""}
            onClick={() => setView("student")}
          >
            Student
          </button>

          <button
            className={view === "staff" ? "active" : ""}
            onClick={() => setView("staff")}
          >
            Staff
          </button>
        </div>
      </header>

      <main className="main-content">
        {view === "student" ? (
          <StudentDashboard />
        ) : (
          <StaffDashboard />
        )}
      </main>
    </div>
  );
}

function StudentDashboard() {
  return (
    <>
      <section className="welcome">
        <p className="eyebrow">STUDENT DASHBOARD</p>
        <h2>How are things looking this week?</h2>
        <p>
          RIPPLE helps you notice changes early and connect with the right
          support.
        </p>
      </section>

      <section className="dashboard-grid">
        <div className="card">
          <p className="card-label">PRESSURE FORECAST</p>
          <h3>HIGH</h3>
          <p>Next week may bring increased academic pressure.</p>
        </div>

        <div className="card">
          <p className="card-label">WELLBEING</p>
          <h3>MEDIUM</h3>
          <p>Your recent check-ins show a changing pattern.</p>
        </div>

        <div className="card">
          <p className="card-label">SUPPORT</p>
          <h3>NOT CONNECTED</h3>
          <p>Explore support options that may help.</p>
        </div>
      </section>

      <section className="support-section">
        <div>
          <p className="eyebrow">RECOMMENDED</p>
          <h2>Academic Support</h2>
          <p>
            Based on your current academic pressure, you may benefit from an
            academic check-in.
          </p>
        </div>

        <button className="primary-button">View Support Options</button>
      </section>

      <section className="friend-card">
        <div>
          <p className="eyebrow">FRIEND-FIRST</p>
          <h2>Want to talk to someone you trust?</h2>
          <p>
            You can ask a friend, mentor, family member, or university support
            contact to check in with you.
          </p>
        </div>

        <button className="secondary-button">Ask Someone</button>
      </section>
    </>
  );
}

function StaffDashboard() {
  return (
    <>
      <section className="welcome">
        <p className="eyebrow">STAFF DASHBOARD</p>
        <h2>Shadow Queue</h2>
        <p>
          Students showing repeated support signals without a current support
          connection.
        </p>
      </section>

      <section className="shadow-card">
        <div className="student-header">
          <div>
            <p className="card-label">STUDENT</p>
            <h3>STU001</h3>
          </div>

          <span className="status-badge">MEDIUM</span>
        </div>

        <div className="reasons">
          <p className="card-label">SUPPORT SIGNALS</p>

          <div className="reason">
            Repeated declining trend
          </div>

          <div className="reason">
            Support recommendation not accepted
          </div>
        </div>

        <div className="student-details">
          <div>
            <span>Domain</span>
            <strong>ACADEMIC</strong>
          </div>

          <div>
            <span>Recommended Action</span>
            <strong>ACADEMIC CHECK-IN</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>SHADOW QUEUE</strong>
          </div>
        </div>

        <button className="primary-button">
          View Student Profile
        </button>
      </section>
    </>
  );
}

export default App;