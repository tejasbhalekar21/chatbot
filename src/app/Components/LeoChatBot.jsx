"use client";
import React, { useState } from "react";

import leo_img from "../../../public/assets/images/leo-intro.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";
import Image from "next/image";
import Lottie from "react-lottie-player";
import Robo from "../../../public/robo.json";
import chatloader from "../../../public/chatloader.json";

function LeoChatbot() {
  const [inpField, setInpField] = useState("");
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState();
  const [typing, setTyping] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }
  const handleInput = (event, action) => {
    setTyping(true);
    if (event.key === "Enter") {
      const input = event.target.value;
      setTimeout(() => {
        setMessages([{ sender: "", message: generateResponse(input) }]);
        setTyping(false);
      }, 1000);
    }

    if (action === "clearInput") {
      console.log("came inside");
      event.target.value = "";
    }
  };

  const handleSend = () => {
    setMessages([{ sender: "", message: generateResponse(inpField) }]);
    setTyping(false);
  };

  const generateResponse = (input) => {
    const responses = {
      hello: "Hi there!",
      "what's your name": "My name is Chatbot.",
      "how are you": "yes, I'm Good",
      goodbye: "Goodbye!",
    };
    const response = responses[input.toLowerCase()];
    if (response) {
      return response;
    } else {
      return "I'm sorry, I don't understand.";
    }
  };

  return (
    <>
      {isActive && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h1>Chatbot</h1>
            <RiArrowDownSLine className="hide_btn" onClick={toggle} />
          </div>

          <ul className="chatbot-messages">
            <Lottie
              className="robo_icon"
              loop
              animationData={Robo}
              play
              style={{ width: 150, height: 150 }}
            />
            <span className="chatbot-loader">
              {typing && (
                <Lottie
                  loop
                  animationData={chatloader}
                  className="robo_icon"
                  play
                  style={{ width: 150, height: 150 }}
                />
              )}
            </span>

            {messages.length > 0 &&
              messages.map((message, index) => (
                <>
                  <li
                    className={`chatbot-message ${message.sender}`}
                    key={index}
                  >
                    {message.message}
                  </li>
                </>
              ))}
          </ul>

          <div className="chatbot-input-container">
            <input
              className="chatbot-input"
              type="text"
              value={inpField}
              onChange={(e) => setInpField(e.target.value)}
              onKeyPress={handleInput}
            />

            {inpField.length > 0 && (
              <p className="clear" onClick={() => setInpField("")}>
                &times;
              </p>
            )}

            <AiOutlineSend
              className="chatbot-send-button"
              onClick={handleSend}
            />
          </div>
        </div>
      )}

      <div className="leo_icon">
        <Image src={leo_img} onClick={toggle} alt="Robo Image" />
      </div>
    </>
  );
}

export default LeoChatbot;
