import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Выберите задачу</h1>

      <div className="card-container">
        <Link to="/random-quote" className="card">
          <div className="card-content">
            <h2>Цитаты великих</h2>
            <p>Задача по выбору номер 1</p>
          </div>
        </Link>
        <Link to="/todo" className="card">
          <div className="card-content">
            <h2>Список дел</h2>
            <p>Задача по выбору номер 3</p>
          </div>
        </Link>
        <Link to="/blog" className="card">
          <div className="card-content">
            <h2>Блог</h2>
            <p>Задача на дополнительные баллы</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
