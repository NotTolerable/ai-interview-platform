import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "./HomePage.css";

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
];

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function HomePage() {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();
  const [interviews, setInterviews] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Use the name from your Auth0 profile
  const name = user?.name?.split(" ")[0] || "there";

  useEffect(() => {
    // Only fetch if we have a user session
    if (!userLoading && user) {
      fetch("http://localhost:8000/interviews", { 
        credentials: "include" // Required for Flask session cookies
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setInterviews(data);
          setDataLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch interviews:", err);
          setDataLoading(false);
        });
    }
  }, [user, userLoading]);

  if (userLoading || dataLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-text">
          <p className="home-greeting-label">Your dashboard</p>
          <h1 className="home-greeting">Hey {name}, ready to practice?</h1>
          <div className="home-meta">
            <span>{formatDate()}</span>
            <span className="home-meta-dot">·</span>
            <span>{interviews.length} interviews detected</span>
          </div>
        </div>
        {user?.picture && (
          <div className="home-avatar">
            <img src={user.picture} alt="Profile" />
          </div>
        )}
      </header>

      <section className="home-section">
        <h2 className="home-section-title">Detected Interviews</h2>
        {interviews.length === 0 ? (
          <div className="empty-state-wrap">
            <p className="empty-state">No interviews found yet. We're scanning your inbox!</p>
            <p className="empty-state-hint">You can still practice with AI-generated questions for any company and role.</p>
            <button
              type="button"
              className="home-card-practice empty-state-cta"
              onClick={() => navigate("/interview-context")}
            >
              Start a practice interview
            </button>
          </div>
        ) : (
          <ul className="home-cards">
            {interviews.map((job, i) => {
              // Cycle through the 3 images based on the index
              const imageUrl = CARD_IMAGES[i % CARD_IMAGES.length];
              
              return (
                <li key={job.id} className="home-card" style={{ animationDelay: `${0.1 * i}s` }}>
                  <div 
                    className="home-card-image company-placeholder"
                    style={{ 
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                     <div className="home-card-overlay">
                      <span className="home-card-company">{job.company}</span>
                      <span className="home-card-role">{job.role}</span>
                    </div>
                  </div>
                  <div className="home-card-body">
                    <p className="home-card-blurb">
                      {job.summary || `AI has prepared questions for your ${job.role} role at ${job.company}.`}
                    </p>
                    <div className="home-card-meta">
                      <span>{job.interview_date || "Date TBD"}</span>
                      <span className="type-tag">{job.interview_type}</span>
                    </div>
                      <button
                        type="button"
                        className="home-card-practice"
                        onClick={() => navigate("/interview-context", { state: { interviewId: job.id, company: job.company, role: job.role } })}
                      >
                        View Prep Kit
                      </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}