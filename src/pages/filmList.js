import React, { useEffect, useState } from "react";
import { Card, Row, Col, message } from "antd";
import "./filmList.css";
import { fetchFilms } from "../api";
import Header from "../components/header";
import { PushpinOutlined, PushpinFilled } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { addSelectedMovie } from '../reducer/selectedMoviesSlice';
import { Link } from "react-router-dom";

const FilmListPage = () => {
    const [films, setFilms] = useState([]);
    const dispatch = useDispatch();

  useEffect(() => {
    fetchFilmList();
  }, []);

  const handlePinToggle = (film) => {
    const updatedFilms = films.map((f) => {
      if (f.episode_id === film.episode_id) {
        f.isPinned = !f.isPinned; 
      }
      return f;
    });
    setFilms(updatedFilms);
  };

  const fetchFilmList = async () => {
    try {
      const data = await fetchFilms();
      console.log(data.results)
      if (data.results && data.results.length > 0) {
        const filmsWithImages = await Promise.all(
          data.results.map(async (film) => {
            try {
              const tmdbResponse = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=bfc394d45b916f310b3cc0a4e94ee8e3&query=${encodeURIComponent(
                  film.title
                )}`
              );
              if (!tmdbResponse.ok) {
                throw new Error("Failed to fetch TMDB data");
              }
              const tmdbData = await tmdbResponse.json();
              if (tmdbData.results && tmdbData.results.length > 0) {
                film.image = `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}`;
              } else {
                film.image = null;
              }
              return film;
            } catch (error) {
              film.image = null;
              return film;
            }
          })
        );
        setFilms(filmsWithImages);
      } else {
        message.warning("No films found.");
      }
    } catch (error) {
      message.error("Failed to fetch films. Please try again later.");
    }
  };


  const handleMovieClick = (film) => {
    dispatch(addSelectedMovie(film));
  };
  return (
    <section>
      <Header pageTitle="Discover Amazing Movies" />
      <Row gutter={[16, 16]}>
        {films.map((film) => (
          <Col key={film.episode_id} xs={24} sm={12} md={6} lg={6}>
            <Link to={`/filmDetail/${film.episode_id}`}>
              <Card
                hoverable
                className="movie-card"
                cover={<img alt={film.title} src={film.image || "https://via.placeholder.com/300x400"} className="image" 
                onClick={() => handleMovieClick(film)}/>}
              />
            </Link>
                {film.isPinned ? (
                  <PushpinFilled
                    className="pin-icon"
                    onClick={() => handlePinToggle(film)}
                  />
                ) : (
                  <PushpinOutlined 
                    className="pin-icon"
                    onClick={() => handlePinToggle(film)}
                  />
                )}
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default FilmListPage;
