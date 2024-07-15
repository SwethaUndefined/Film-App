import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Typography } from 'antd';
import Header from '../components/header';
import { useParams } from 'react-router-dom';
import './filmDetail.css';

const FilmDetail = () => {
    const { episode_id } = useParams();
    const selectedMovies = useSelector(state => state.selectedMovies.selectedMovies);
    const selectedMovie = selectedMovies.find(movie => movie.episode_id === Number(episode_id));
    console.log(selectedMovie)
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        if (selectedMovie) {
            fetchTrailer(selectedMovie.title);
        }
    }, [selectedMovie]);

    const fetchTrailer = async (title) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?key=AIzaSyD5iduQEfRcpqQP87c4gX85TUHrtYAzU-o&q=${encodeURIComponent(title)}%20official%20trailer`
                );

            if (!response.ok) {
                throw new Error('Failed to fetch trailer');
            }

            const data = await response.json();
            if (data.items && data.items.length > 0) {
                setTrailerUrl(`https://www.youtube.com/watch?v=${data.items[0].id.videoId}`);
            } else {
                setTrailerUrl(null);
            }
        } catch (error) {
            setTrailerUrl(null);
        }
    };

    if (!selectedMovie) {
        return <div>Loading...</div>;
    }

    return (
        <section className="film-detail-container">
            <Header pageTitle="Movie Details" />
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <img src={selectedMovie.image} alt="Film Poster" style={{ maxWidth: '100%' }} />
                </Col>
                <Col span={12}>
                    <Typography className='movieName'>{selectedMovie.title}</Typography>
                    <div className="detail-value">
                        <Typography.Text className="detail-label">Director:</Typography.Text>
                        <Typography.Text>{selectedMovie.director}</Typography.Text>
                    </div>
                    <div className="detail-value">
                        <Typography.Text className="detail-label">Producer:</Typography.Text>
                        <Typography.Text>{selectedMovie.producer}</Typography.Text>
                    </div>
                    <div className="detail-value">
                        <Typography.Text className="detail-label">Release Date:</Typography.Text>
                        <Typography.Text>{selectedMovie.release_date}</Typography.Text>
                    </div>

                    
                    <div className="detail-value">
                        <Typography.Text className="detail-label">Plot:</Typography.Text>
                        <Typography.Text>{selectedMovie.opening_crawl}</Typography.Text>
                    </div>
                    {trailerUrl && (
                        <div className="detail-value">
                            <Typography.Link href={trailerUrl} target="_blank" rel="noopener noreferrer">
                                Watch Trailer
                            </Typography.Link>
                        </div>
                    )}
                </Col>
                <Col span={6}></Col>
            </Row>
        </section>
    );
};

export default FilmDetail;
