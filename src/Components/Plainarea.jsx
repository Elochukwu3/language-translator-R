import React from "react";
import { useState } from "react";
import "./TextArea.css";
import Options from "./Options";

function Plainarea() {
  const [language, setLanguage] = useState("en-GB");
  const [languageTo, setLanguageTo] = useState("fi-FI");
  const [textVal, setTextVal] = useState("");
  const [textValTo, setTextValTo] = useState("");

  let placeholderItem = "Translation";

  async function translateText(e) {
    e.preventDefault();
    if (!textVal) return;
    placeholderItem = "Translating";
    let apiUrl = `https://api.mymemory.translated.net/get?q=${textVal}&langpair=${language}|${languageTo}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    setTextValTo(data.responseData.translatedText);
  }

  const copyTranlated = (p) => {
    navigator.clipboard.writeText(p);
  };

  const audioTranlated = (p, l) => {
    let utterance = new SpeechSynthesisUtterance(p);
    utterance.lang = l;
    window.speechSynthesis.speak(utterance);
  };

  let date = new Date();
  const hour = date.getHours();
  date = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
  const dateDisplay = hour >= 12 ? `${date} PM` : `${date} AM`;

  return (
    <div className="container">
      <div className="headerText">
        {" "}
        <h1>Text Converter </h1> <span>TIME ({dateDisplay}) </span>
      </div>
      <div className="wrapper">
        <div className="text-input">
          <textarea
            spellCheck="false"
            className="from-text"
            placeholder="Enter text"
            onChange={(e) => setTextVal(e.target.value.trim())}
          ></textarea>
          <textarea
            spellCheck="false"
            readOnly
            disabled
            className="to-text"
            placeholder={placeholderItem}
            value={textValTo}
          ></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <i
                id="from"
                className="fas fa-volume-up"
                onClick={() => audioTranlated(textVal, language)}
              ></i>
              <i
                id="from"
                className="fas fa-copy"
                onClick={() => copyTranlated(textVal)}
              ></i>
            </div>
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
            >
              <Options />
            </select>
          </li>
          <li className="exchange">
            <i className="fas fa-exchange-alt"></i>
          </li>
          <li className="row to">
            <select
              onChange={(e) => setLanguageTo(e.target.value)}
              value={languageTo}
            >
              <Options />
            </select>
            <div className="icons">
              <i
                id="to"
                className="fas fa-volume-up"
                onClick={() => audioTranlated(textValTo, languageTo)}
              ></i>
              <i
                id="to"
                className="fas fa-copy"
                onClick={() => copyTranlated(textValTo)}
              ></i>
            </div>
          </li>
        </ul>
      </div>
      <button onClick={translateText}>Translate Text</button>
    </div>
  );
}
export default Plainarea;
