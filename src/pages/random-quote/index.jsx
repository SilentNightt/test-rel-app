import React, { useState, useEffect } from "react";
import "../random-quote/random-quote.css";

function RandomQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("#14cc8d");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const colors = [
    "#14cc8d",
    "#1481cc",
    "#cc3114",
    "#bb14cc",
    "#14ccbb",
    "#5f14cc",
    "#cc8d14",
  ];

  const fetchQuote = () => {
    setLoading(true);
    setError(null);

    // Как ключ для JSONP
    const callbackName = "quoteCallback" + Math.floor(Math.random() * 100000);
    const url = `https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=${callbackName}`;

    window[callbackName] = (response) => {
      if (response && response.quoteText) {
        setQuote(response.quoteText);
        setAuthor(response.quoteAuthor ? response.quoteAuthor : "Неизвестный");
        let newColorIndex = "";
        do {
          newColorIndex = Math.floor(Math.random() * colors.length);
        } while (colors[newColorIndex] === color);

        setColor(colors[newColorIndex]);
      } else {
        setError("Не удалось получить корректную цитату. Попробуйте еще раз.");
      }
      setLoading(false);
      delete window[callbackName];
      document.body.removeChild(script);
    };

    const script = document.createElement("script");
    script.src = url;
    script.onerror = () => {
      setError("Не удалось загрузить цитату. Попробуйте еще раз.");
      setLoading(false);
      delete window[callbackName];
      document.body.removeChild(script);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      className="container-fluid random-quote-container"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-primary random-quote-header">Случайные Цитаты</h1>
      <div className="well random-quote-well">
        {error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <p className="quote-text">"{quote}"</p>
            <p className="author-text">- {author}</p>
          </>
        )}
      </div>
      <button
        type="button"
        className="btn btn-primary random-quote-button"
        id="quote"
        onClick={fetchQuote}
        disabled={loading}
      >
        {loading ? "Загрузка..." : "Новая цитата"}
      </button>
    </div>
  );
}

export default RandomQuote;
