import React from 'react';
import { Link } from 'react-router-dom';
function UserTable(props) {
    const mkArr = () => {
        const arr = props.data.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>
                        <Link className="unstyle text-white" to="/shows/10">
                            {item.name}
                        </Link>
                    </td>
                    <td>9</td>
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
