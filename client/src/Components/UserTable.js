import React from 'react';
import { Link } from 'react-router-dom';
function UserTable(props) {
    console.log(props.list);
    const mkArr = () => {
        const arr = props.list[props.show].map((item, index) => {
            return (
                <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                        <Link
                            className="unstyle text-white"
                            to={
                                props.show === 'shows'
                                    ? `/shows/${item.id}`
                                    : `/movies/${item.id}`
                            }
                        >
                            {item.name}
                        </Link>
                    </td>
                    <td>{item.ratings}</td>
                </tr>
            );
        });
        return arr;
    };
    return (
        <div>
            <table className="table table-dark table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Rating</th>
                    </tr>
                </thead>
                <tbody>{mkArr()}</tbody>
            </table>
        </div>
    );
}

export default UserTable;
