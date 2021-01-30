import { Component, Fragment } from "React";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class List extends Component {
    state = {
        state: null,
        course: null,
        redirect: false,
        currentPage: 1
    };

    componentDidMount() {
        this.setState({
            ...this.state,
            state: this.props.state,
            course: this.props.course
        })

        this.props.dispatch({
            type : "CLEAR",
            data : null
        })
    }

    handlePages = (e) => {
        this.setState({
            ...this.state,
            currentPage : Number(e.target.id)
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
        })
    }
    
    render() {
        if (this.props.colleges.length === 0) {
            return (<Redirect to="/" />)
        }

        if (this.state.redirect) {
            return (<Redirect to="/college" />)
        }

        // console.log(this.props);
        const { colleges } = this.props;
        const currentPage = this.state.currentPage;
        const perPage = 20;
        var headline;
        var filteredColleges = [];

        if (this.state.state) {
            headline = `Colleges in ${this.state.state}`;
            for (let index = 0; index < colleges.length; index++) {
                const element = colleges[index];
                if (element.state === this.state.state) {
                    filteredColleges.push(element);
                }
            }
        }

        if (this.state.course) {
            headline = `Colleges that offer courses in ${this.state.course} Engineering`;

            let listSize = {
                "Computer Science": 1,
                "Electronics": 2,
                "IT": 3,
                "Chemical": 4,
                "Electrical": 5
            }

            for (let index = 0; index < colleges.length; index++) {

                const element = colleges[index].courses;

                if (element.length >= listSize[this.state.course]) {
                    filteredColleges.push(colleges[index]);
                }
                
            }
        }

        

        const indexOfLast = currentPage * perPage;
        const indexOfFirst = indexOfLast - perPage;
        const characters = filteredColleges.slice(indexOfFirst, indexOfLast);

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
        for (let i = 1; i <= Math.ceil(filteredColleges.length / perPage); i++) {
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

        return(
            <Fragment>
                <h1>{headline}</h1>
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

export default connect(mapStatetoProps)(List);