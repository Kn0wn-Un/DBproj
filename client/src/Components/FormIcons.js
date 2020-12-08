import '../styles.css';

function FormIcons(props) {
    return (
        <div className="form-icons">
            <span>
                {props.later ? null : props.watched ? (
                    <div>
                        <svg
                            width="100px"
                            height="100px"
                            viewBox="0 0 16 16"
                            className="bi bi-file-check-fill"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={props.watchHandler}
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1.146 6.854a.5.5 0 0 0-.708-.708L7.5 8.793 6.354 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                            />
                        </svg>
                        <div>Watched!</div>
                    </div>
                ) : (
                    <div>
                        <svg
                            width="100px"
                            height="100px"
                            viewBox="0 0 16 16"
                            className="bi bi-file-check"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={props.watchHandler}
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                            />
                        </svg>
                        <div>Watched?</div>
                    </div>
                )}
            </span>
            <span>
                {props.watched ? null : props.later ? (
                    <div>
                        <svg
                            width="100px"
                            height="100px"
                            viewBox="0 0 16 16"
                            className="bi bi-bookmark-check-fill"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                                props.laterHandler();
                                props.remLater();
                            }}
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm6.854 5.854a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                            />
                        </svg>
                        <div>Added to watch later!</div>
                    </div>
                ) : (
                    <div>
                        <svg
                            width="100px"
                            height="100px"
                            viewBox="0 0 16 16"
                            className="bi bi-bookmark-check"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                                props.laterHandler();
                                props.watchLater();
                            }}
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                            />
                        </svg>
                        <div>Watch Later?</div>
                    </div>
                )}
            </span>
        </div>
    );
}

export default FormIcons;
