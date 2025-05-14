import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [emojiWeight, setEmojiWeight] = useState(0);

  const emojis = [
    { icon: "/laughter.png", weight: 5, color: "#4CAF50" },
    { icon: "/smile-removebg-preview.png", weight: 4, color: "#8BC34A" },
    { icon: "/straight_face.png", weight: 3, color: "#FFEB3B" },
    { icon: "/unhappy.png", weight: 2, color: "#FF9800" },
    { icon: "/sad.png", weight: 1, color: "#F44336" },
  ];

  const handleEmojiClick = (emoji) => {
    setRating(emoji.icon);
    setEmojiWeight(emoji.weight);
    setStep(2);
  };

  const handleBackButtonClick = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (rating || suggestion.trim() !== "") {
      try {
        await axios.post("http://localhost:4000/save-feedback", {
          emoji: rating,
          weight: emojiWeight,
          suggestion: suggestion.trim(),
        });
        setStep(3);
      } catch (error) {
        console.error("Error saving feedback:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="rating-container">
        {step === 1 && (
          <div className="emoji-rating">
            <div className="emoji-options">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="emoji-button"
                  onClick={() => handleEmojiClick(emoji)}
                  style={{ backgroundColor: emoji.color }}
                >
                  <img
                    src={emoji.icon}
                    alt={`rating-${emoji.weight}`}
                    className="emoji-img"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="feedback-step">
            <h2>Önerilerinizi lütfen bizimle paylaşiniz</h2>
            <h3>Please Give Us Suggestions</h3>
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
              You rated us:{" "}
              <img src={rating} alt="selected-rating" className="emoji-img" />
            </p>
            {suggestion && (
              <p>
                <strong>Your message:</strong> {suggestion}
              </p>
            )}
            <div className="buttons">
              <button
                className="back-button"
                onClick={() => window.location.reload()}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
