import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
    state = {
        redirect : false
    };

    componentDidMount() {
        axios
            .get("https://mysterious-plains-33385.herokuapp.com/api/colleges")
            .then((res) => {
                this.props.dispatch({
                    type : "LOAD_COLLEGES",
                    data : [...res.data]
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handlePages = (e) => {
        this.props.dispatch({
            type : "PAGE",
            data : Number(e.target.id)
        });
    }

    gotoPage = (e) => {
        this.props.dispatch({
            type: "SELECTED_COLLEGE",
            data: Number(e.target.value)
        });

        this.setState({
            ...this.state,
            redirect : true
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/college" />)
        }

        const { colleges, currentPage } = this.props;

        const perPage = 20;

        const indexOfLast = currentPage * perPage;
        const indexOfFirst = indexOfLast - perPage;
        const characters = colleges.slice(indexOfFirst, indexOfLast);

        const renderCharacters = characters.map((character) => (
            <tr key={character._id}>
                <td>{character.name}</td>
                <td>{character.city}</td>
                <td>{character.state}</td>
                <td>{character.no_of_students}</td>
                <td>
                    <button 
                        className="btn btn-primary"
                        onClick={this.gotoPage}
                        value={character._id}
                    >
                        Show
                    </button>
                </td>
            </tr>
        ))

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(colleges.length / perPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePages}
                    className="page-item page-link"
                >
                    {number}
                </li>
            );
        });

        return (
            <Fragment>
                <h1>List of all colleges</h1>
                <br />
                <div id="table-section">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">College Name</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                                <th scope="col">No. of students</th>
                                <th scope="col">Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCharacters}
                        </tbody>
                    </table>
                    <ul id="page-numbers" className="pagination justify-content-center">
                        {renderPageNumbers}
                    </ul>
                </div>
            </Fragment>
        )
    }
}

const mapStatetoProps = (state) => ({
    students: state.students,
    colleges: state.colleges,
    selectedCollege: state.selectedCollege,
    data1: state.data1,
    data2: state.data2,
    state: state.state,
    course: state.course,
    color: state.color,
    currentPage: state.currentPage,
    errors: state.errors,
    messages: state.messages
});

export default connect(mapStatetoProps)(Home);