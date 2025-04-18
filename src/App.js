import React, { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  const emojis = ["😄", "🙂", "😐", "😕", "😠"];

  const handleEmojiClick = (emoji) => {
    setRating(emoji);
    setTimeout(() => {
      setStep(2);
    }, 300);
  };

  const handleBackButtonClick = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    if (suggestion.trim() !== "" || rating) {
      setStep(3);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🛠️  Serhan Kombos Otomotiv</h1>
        <p>Rate Your Experience with us. Your feedback helps us improve. We appreciate it!</p>
      </header>

      <div className="rating-container">
        {step === 1 && (
          <div className="emoji-rating">
            <h2>Rate your experience</h2>
            <div className="emoji-options">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="emoji-button"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="feedback-step">
            <h2>Any suggestions for us?</h2>
            <textarea
              placeholder="Tell us how we can do better (optional)..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            />
            <div className="buttons">
              <button onClick={handleSubmit}>Submit</button>
              <button className="back-button" onClick={handleBackButtonClick}>
                Back
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="thank-you">
            <h2>🎉 Thank you!</h2>
            <p>
              You rated us: <span className="icon big">{rating}</span>
            </p>
            {suggestion && (
              <p>
                <strong>Your message:</strong> {suggestion}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
