import './styles.css';
import { useState } from 'react';
import FormIcons from './Components/FormIcons';
function ShowForm(props) {
    const [watched, setWatched] = useState(false);
    const [later, setLater] = useState(false);
    const [added, setAdd] = useState(false);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    const watchHandler = () => {
        setWatched(!watched);
        if (watched) setLater(false);
        console.log(props.user);
    };
    const laterHandler = () => {
        setLater(!later);
        if (later) setWatched(false);
    };
    const addShowWatched = async () => {
        await fetch(
            `/api/add/shows?userId=${props.user}&showId=${props.show.id}&rating=${rating}&review=${review}`
        );
    };
    const formHandler = (e) => {
        e.preventDefault();
        console.log(rating);
        console.log(props.show.id);
        addShowWatched();
        setAdd(true);
    };
    return (
        <div>
            <FormIcons
                watched={watched}
                watchHandler={watchHandler}
                later={later}
                laterHandler={laterHandler}
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
                            onChange={(e) => {
                                setReview(e.target.value);
                            }}
                        ></textarea>
                        <br />
                        <br />
                        <button>Add review</button>
                    </form>
                ) : null}
            </div>
        </div>
    );
}

export default ShowForm;
