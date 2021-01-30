import { createStore } from "redux";

const initialState = {
    students: [],
    colleges: [],
    selectedCollege: null,
    data1: {},
    data2: {},
    state: null,
    course: null,
    color: ['#d854c6', '#c1d3b6', '#922c00', '#637d7a', '#8c2bbf', '#8928aa', '#5d8f4a', '#3acb31', '#077b5f', '#f1647d', '#a291e0', '#cf62a2', '#86d2bb', '#6af495', '#9e345e', '#a37191', '#07df57', '#51854b', '#96e9a7', '#4497cd', '#4f2027', '#444d7b', '#24c9d0', '#10d78c', '#906840', '#a45483', '#c177f2', '#b7d9fb', '#1318cc', '#09a919', '#d1f472', '#13e5ec', '#1f8ab7', '#98855a', '#779bd4'],
    currentPage: 1,
    errors: null,
    messages: null
}

function reducer(state=initialState, action) {
    switch (action.type) {
        case "LOAD_COLLEGES":
            return {
                ...state,
                colleges: action.data
            }
            break;
        case "LOAD_STUDENTS":
            return {
                ...state,
                students: action.data
            }
            break;
        case "PAGE":
            return {
                ...state,
                currentPage : action.data
            };
        case "DATA_ONE":
            return {
                ...state,
                data1 : action.data
            };
        case "DATA_TWO":
            return {
                ...state,
                data2 : action.data
            };
        case "STATEWISE":
            return {
                ...state,
                state : action.data
            };
        case "COURSEWISE":
            return {
                ...state,
                course : action.data
            };
        case "SELECTED_COLLEGE":
            return {
                ...state,
                selectedCollege : action.data
            };
        case "CLEAR":
            return {
                ...state,
                course : null,
                state : null
            }
        default:
            break;
    }
    return state;
}

const store = createStore(reducer);

export default store;