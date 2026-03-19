import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginForm, RegisterForm } from './Login';
import Navbar from './Navbar';
import Home from "./home";
import { AddTask } from './home';
import ForgetPassword from './forgetPassword'

function Welcome() {
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="welcome-page">
      <Navbar onAboutClick={scrollToAbout} />

      {/* Hero Section */}
      <div className="welcome-hero">
        <span className="welcome-eyebrow">✦ Productivity Suite</span>
        <h1>Schedule Your <span>Work</span></h1>
        <div className="welcome-divider" />
        <p>Organise tasks, track progress and get things done — all in one place.</p>
        <button className="scroll-btn" onClick={scrollToAbout}>
          Learn More
          <span className="scroll-arrow">↓</span>
        </button>
      </div>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="about-inner">

          <div className="about-header">
            <span className="welcome-eyebrow">✦ Who We Are</span>
            <h2>About Us</h2>
            <div className="welcome-divider" />
          </div>

          <p className="about-intro">
            We believe productivity should feel effortless. Our platform was built to help
            individuals and teams plan smarter, stay focused, and accomplish more — without the clutter.
          </p>

          <div className="about-cards">
            <div className="about-card">
              <div className="about-card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To give everyone a simple, beautiful tool to take control of their day — from a single task to a full team workflow.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">⚡</div>
              <h3>Fast & Focused</h3>
              <p>No bloat. No distractions. Just a clean interface that gets out of your way so you can do your best work.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">🔒</div>
              <h3>Secure by Default</h3>
              <p>Your data is yours. We use industry-standard authentication and never share your information with third parties.</p>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Tasks Completed</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">99%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>

        </div>
      </section>

      <footer className="welcome-footer">
        <span>✦ Productivity Suite &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/"         element={<Welcome />} />
      <Route path="/login"    element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/home"     element={<Home />} />
      <Route path="/addTask"  element={<AddTask />} />
      <Route path="/forgetPassword" element={<ForgetPassword/>}/>
    </Routes>
  )
}

export default App;