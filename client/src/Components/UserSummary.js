import React from 'react';

function UserSummary(props) {
    console.log(props.data);
    return (
        <div className="user-summary">
            <div>
                <h2>{props.data.shows_count}</h2>
                <div>Shows Watched</div>
            </div>
            <div>
                <h2>{props.data.total_seasons}</h2>
                <div>Total seasons watched</div>
            </div>
            <h1>{props.data.user_name}</h1>
            <div>
                <h2>{props.data.movies_count}</h2>
                <div>Movies watched</div>
            </div>
            <div>
                <h2>
                    {Math.round(
                        (props.data.movie_hours / 60 + Number.EPSILON) * 100
                    ) / 100}
                </h2>
                <div>Hours of movies watched</div>
            </div>
        </div>
    );
}

export default UserSummary;
