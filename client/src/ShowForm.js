/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { useState, useEffect } from 'react';
import FormIcons from './Components/FormIcons';
function ShowForm(props) {
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
            `/api/watched/shows?userId=${props.user}&showId=${props.show.id}`
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
            `/api/watchlater/shows?userId=${props.user}&showId=${props.show.id}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) return;
                setLater(true);
            });
    };
    const addShowWatched = async () => {
        await fetch(
            `/api/add/shows?userId=${props.user}&showId=${props.show.id}&rating=${rating}&review=${review}`
        );
    };
    const addWatchLater = async () => {
        await fetch(
            `/api/watchlater/shows/add?userId=${props.user}&showId=${props.show.id}`
        );
    };
    const remWatchLater = async () => {
        await fetch(
            `/api/watchlater/shows/remove?userId=${props.user}&showId=${props.show.id}`
        );
    };
    const formHandler = (e) => {
        e.preventDefault();
        console.log(rating);
        console.log(props.show.id);
        addShowWatched();
        getReview();
        setAdd(true);
    };
    return (
        <div>
            {added ? (
                <div>
                    <h2>You have watched this show!</h2>
                    <div>Your Rating: {rating}</div>
                    <div>Your Review: {review}</div>
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

export default ShowForm;
