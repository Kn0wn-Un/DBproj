/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { useState, useEffect } from 'react';
import FormIcons from './Components/FormIcons';
function MovieForm(props) {
    const [watched, setWatched] = useState(false);
    const [later, setLater] = useState(false);
    const [added, setAdd] = useState(false);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    useEffect(() => {
        getReview();
    }, []);

    const watchHandler = () => {
        setWatched(!watched);
        if (watched) setLater(false);
    };
    const laterHandler = () => {
        setLater(!later);
        if (later) setWatched(false);
    };
    const getReview = async () => {
        await fetch(
            `/api/watched/movies?userId=${props.user}&movieId=${props.movie.id}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) return;
                const { ratings, review } = data[data.length - 1];
                setWatched(true);
                setAdd(true);
                setRating(ratings);
                setReview(review);
            });
        await fetch(
            `/api/watchlater/movies?userId=${props.user}&movieId=${props.movie.id}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) return;
                setLater(true);
            });
    };
    const addShowWatched = async () => {
        await fetch(
            `/api/add/movies?userId=${props.user}&movieId=${props.movie.id}&rating=${rating}&review=${review}`
        );
    };
    //const remShowWatched = async () => {
    //    await fetch(
    //        `/api/remove/movies?userId=${props.user}&movieId=${props.movie.id}`
    //    );
    //};
    const addWatchLater = async () => {
        await fetch(
            `/api/watchlater/movies/add?userId=${props.user}&movieId=${props.movie.id}`
        );
    };
    const remWatchLater = async () => {
        await fetch(
            `/api/watchlater/movies/remove?userId=${props.user}&movieId=${props.movie.id}`
        );
    };
    const formHandler = (e) => {
        e.preventDefault();
        addShowWatched();
        getReview();
        setAdd(true);
    };
    return (
        <div>
            {added ? (
                <div className="watched-review">
                    <h2>Movie watched!</h2>
                    <div>
                        <h5>Your Rating:</h5> {rating}
                    </div>
                    <div>
                        <h5>Your Review:</h5> {review}
                    </div>
                </div>
            ) : (
                <div>
                    <FormIcons
                        watched={watched}
                        watchHandler={watchHandler}
                        later={later}
                        laterHandler={laterHandler}
                        watchLater={addWatchLater}
                        remLater={remWatchLater}
                    />
                    <div className="watched-form">
                        {watched ? (
                            <form onSubmit={formHandler}>
                                <label>
                                    <h3>Rating</h3>
                                </label>
                                <br />
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rating}
                                    required
                                    onChange={(e) => {
                                        setRating(e.target.value);
                                    }}
                                ></input>
                                <br />
                                <label>
                                    <h3>Review</h3>
                                </label>
                                <br />
                                <textarea
                                    maxLength="255"
                                    value={review}
                                    required
                                    onChange={(e) => {
                                        setReview(e.target.value);
                                    }}
                                ></textarea>
                                <br />
                                <br />
                                <button className="btn btn-primary">
                                    Add review
                                </button>
                            </form>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieForm;
