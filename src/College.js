import { Component, Fragment } from "React";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

class College extends Component {
    state = {
        id : null,
        name : null,
        year_of_batch : null,
        college_id : null,
        skills : [],
        openModalBool : false,
        studentPageNo : 1,
        similarCollegePageNo : 1
        // redirect: false
    }

    gotoPage = (e) => {
        this.props.dispatch({
            type: "SELECTED_COLLEGE",
            data: Number(e.target.value)
        });

        let id = Number(e.target.value);

        axios
            .get(`https://mysterious-plains-33385.herokuapp.com/api/students?collegeid=${id}`)
            .then((res) => {
                this.props.dispatch({
                    type : "LOAD_STUDENTS",
                    data : [...res.data]
                });
            })
            .catch((err) => {
                console.log(err);
            });

        this.setState({
            ...this.state,
            studentPageNo : 1,
            similarCollegePageNo : 1
        });
    }

    componentDidMount() {
        var id = this.props.selectedCollege;
        axios
            .get(`https://mysterious-plains-33385.herokuapp.com/api/students?collegeid=${id}`)
            .then((res) => {
                this.props.dispatch({
                    type : "LOAD_STUDENTS",
                    data : [...res.data]
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handlePages = (e) => {
        this.setState({
            ...this.state,
            studentPageNo : Number(e.target.id)
        });
    }

    handlePages2 = (e) => {
        this.setState({
            ...this.state,
            similarCollegePageNo : Number(e.target.id)
        });
    }


    openModal(student){
        this.setState({
            id : student._id,
            name : student.name,
            year_of_batch : student.year_of_batch,
            college_id : student.college_id,
            skills : student.skills,
            openModalBool : true
        })
    }

    closeModal(){
        this.setState({
            id : null,
            name : null,
            year_of_batch : null,
            college_id : null,
            skills : [],
            openModalBool : false
        })
    }

    string_maker(l) {
        var seasonList = l;
        if (seasonList === null) {
            return "None";
        }
        var n = seasonList.length;
        var result = '';

        if (n == 0)
        {
            return "None";
        }
        else if (n == 1)
        {
            return seasonList[0];
        }
        else if (n == 2)
        {
            result += seasonList[0];
            result += ' and ';
            result += seasonList[1];

            return result;
        }
        else
        {
            for (let i = 0; i < (n - 2); i++) {
                result += seasonList[i];
                result += ', ';
            }
            result += seasonList[n-2];
            result += ' and ';
            result += seasonList[n-1];

            return result;
        }
    }

    render() {
        var l1 = this.props.colleges;
        var data;

        for (let index = 0; index < l1.length; index++) {
            var element = l1[index];
            if (element._id === this.props.selectedCollege) {
                data = element;
                break;
            }    
        }

        var courses = this.string_maker(data.courses);

        var { students } = this.props;
        var perPage = 10;
        var currentPage = this.state.studentPageNo;

        var indexOfLast = currentPage * perPage;
        var indexOfFirst = indexOfLast - perPage;
        var characters = students.slice(indexOfFirst, indexOfLast);

        var renderCharacters = characters.map((character) => (
            <tr key={character._id}>
                <td>{character._id}</td>
                <td>{character.name}</td>
                <td>{character.year_of_batch}</td>
                <td>
                    <button 
                        className="btn btn-primary"
                        onClick={() => this.openModal(character)}
                        value={character._id}
                    >
                        Show
                    </button>
                </td>
            </tr>
        ))

        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(students.length / perPage); i++) {
            pageNumbers.push(i);
        }

        var renderPageNumbers = pageNumbers.map(number => {
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


        var similarColleges = [];

        for (let index = 0; index < l1.length; index++) {
            var element = l1[index];
            if (element.state == data.state || element.city == data.city) {
                similarColleges.push(element);
                continue;
            }
            if (element.courses.length >= data.courses.length) {
                similarColleges.push(element);
                continue;
            }
        }

        var currentPage = this.state.similarCollegePageNo;
        var indexOfLast = currentPage * perPage;
        var indexOfFirst = indexOfLast - perPage;
        var characters = similarColleges.slice(indexOfFirst, indexOfLast);

        var renderCharacters2 = characters.map((character) => (
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

        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(similarColleges.length / perPage); i++) {
            pageNumbers.push(i);
        }

        var renderPageNumbers2 = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePages2}
                    className="page-item page-link"
                >
                    {number}
                </li>
            );
        });
        
        return (
            <Fragment>
                <h1>{data.name}</h1>
                <h4>College ID : {this.props.selectedCollege}</h4>
                <h4>Location : {data.city}, {data.state}, {data.country}</h4>
                <h4>Number of students : {data.no_of_students}</h4>
                <h4>Courses taught : {courses}</h4>
                <h4>Year Founded : {data.year_founded}</h4>
                <br />
                <br />
                <h3>List of Students</h3>
                <br />
                <div id="table-section">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Y.O.B</th>
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
                <br />
                <br />
                <h3>Similar Colleges</h3>
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
                            {renderCharacters2}
                        </tbody>
                    </table>
                    <ul id="page-numbers" className="pagination justify-content-center">
                        {renderPageNumbers2}
                    </ul>
                </div>


                <Modal show={this.state.openModalBool} onHide={() => this.closeModal()}>
                    <Modal.Header closeButton onClick={() => this.closeModal()}>
                        <Modal.Title>Student Name : {this.state.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>ID : {this.state.id}</p>
                        <p>College ID : {this.state.college_id}</p>
                        <p>Year of batch : {this.state.year_of_batch}</p>
                        <p>Skills : {this.string_maker(this.state.skills)}</p>
                    </Modal.Body>
                </Modal>

            </Fragment>
            
        )
    }
}

var mapStatetoProps = (state) => ({
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

export default connect(mapStatetoProps)(College);