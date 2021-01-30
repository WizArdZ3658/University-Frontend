import { Component, Fragment } from "react";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';


class Chart extends Component {
    componentDidMount() {
        var l1 = this.props.colleges;
        var set1 = new Set();

        for (let index = 0; index < l1.length; index++) {
            var element = l1[index];
            set1.add(element.state);
        }

        var l3 = [...set1];
        var l2 = {};
        var l4 = {
            "Computer Science": 0, 
            "Electronics": 0, 
            "IT": 0, 
            "Chemical": 0, 
            "Electrical": 0
        };

        for (let index = 0; index < l3.length; index++) {
            l2[l3[index]] = 0;
        }

        for (let index = 0; index < l1.length; index++) {
            var element = l1[index];
            l2[element.state]++;
            for (let i = 0; i < element.courses.length; i++) {
                l4[element.courses[i]]++;
            }
        }

        var data1 = {
            labels: Object.keys(l2),
            datasets:[
                {
                    label: 'Statewise Distribution',
                    backgroundColor: this.props.color,
                    hoverBackgroundColor: this.props.color,
                    data: Object.values(l2)
                }
            ]
        };

        var data2 = {
            labels: Object.keys(l4),
            datasets:[
                {
                    label: 'Coursewise Distribution',
                    backgroundColor: this.props.color,
                    hoverBackgroundColor: this.props.color,
                    data: Object.values(l4)
                }
            ]
        };

        this.props.dispatch({
            type: 'DATA_ONE',
            data: data1
        });

        this.props.dispatch({
            type: 'DATA_TWO',
            data: data2
        });
    }


    render() {
        if (this.props.colleges.length === 0) {
            return (<Redirect to="/" />)
        }
        if (this.props.course !== null) {
            return (<Redirect to="/list" />)
        }
        if (this.props.state !== null) {
            return (<Redirect to="/list" />)
        }

        return (
            <Fragment>
                <h1>Visualize and Decide</h1>
                <br />
                <Doughnut
                    data={this.props.data1}
                    onElementsClick={(ele) => {
                        var index = ele[0]._index;
                        // console.log(this.props.data1.labels[index]);
                        this.props.dispatch({
                            type: 'STATEWISE',
                            data: this.props.data1.labels[index]
                        });
                    }}
                    options={{
                        title:{
                            display:true,
                            text:'Statewise Distribution of Colleges',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
                <br />
                <br />
                <Doughnut
                    data={this.props.data2}
                    onElementsClick={(ele) => {
                        var index = ele[0]._index;
                        // console.log(this.props.data2.labels[index]);
                        this.props.dispatch({
                            type: 'COURSEWISE',
                            data: this.props.data2.labels[index]
                        });
                    }}
                    options={{
                        title:{
                            display:true,
                            text:'Coursewise Distribution of Colleges',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
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

export default connect(mapStatetoProps)(Chart);