import React, { useState, useEffect } from "react";
import axios from "axios"; // Импортируем Axios
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

  const fetchQuote = async () => {
    setLoading(true);
    setError(null); // Сброс ошибки перед новым запросом

    const url =
      "https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=?";

    try {
      const response = await axios.get(url);
      if (response.data && response.data.quoteText) {
        // Обрабатываем строку ответа
        const responseText = `${response.data.quoteText} ${
          response.data.quoteAuthor
            ? `- ${response.data.quoteAuthor}`
            : "Неизвестный автор"
        }`;

        // Извлекаем цитату и автора
        const quoteParts = responseText.split("http://");
        const quoteText = quoteParts[0].trim();
        const quoteAuthor =
          quoteParts.length > 1 ? quoteParts[1] : "Неизвестный автор";

        setQuote(quoteText);
        setAuthor(quoteAuthor);

        // Смена цвета на случайный
        let newColorIndex;
        do {
          newColorIndex = Math.floor(Math.random() * colors.length);
        } while (colors[newColorIndex] === color);

        setColor(colors[newColorIndex]);
      } else {
        setError("Не удалось получить корректную цитату. Попробуйте еще раз.");
      }
    } catch (err) {
      console.error("Ошибка при получении цитаты:", err);
      setError("Не удалось загрузить цитату. Попробуйте еще раз.");
    }

    setLoading(false);
  };

  // Получение первой цитаты при монтировании компонента
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      className="container-fluid random-quote-container"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-primary random-quote-header">Случайные Цитаты!</h1>
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
