import React from 'react';
import {connect} from 'react-redux';

import {createWorker} from "../actions";
import '../assets/scss/styles.scss';

class WorkerCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gender : 'male',
        };
        this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmitCreate(event) {
        event.preventDefault();
        let worker = {};
        worker['fullName'] = this.state.fullName;
        worker['gender'] = this.state.gender;
        worker['contactInfo'] = this.state.contactInfo;
        worker['salary'] = this.state.salary;
        worker['position'] = this.state.position;
        this.props.dispatch(createWorker(worker));
        this.props.closeHandler();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitCreate}>
                <div className="form-group">
                    <label>FullName</label>
                    <input type="text" className="form-control" placeholder="Full Name"
                           name="fullName" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select className="form-control" name="gender" onChange={this.handleInputChange}>
                        <option>male</option>
                        <option>female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Contact Info</label>
                    <input type="text" className="form-control" placeholder="Contact Info"
                           name="contactInfo" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input type="text" className="form-control" placeholder="Salary"
                           name="salary" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Position</label>
                    <input type="text" className="form-control" placeholder="Position"
                           name="position" onChange={this.handleInputChange}/>
                </div>
                <button className="btn btn-primary">Add Worker</button>
                <button className="btn btn-danger ml-15" onClick={() => this.props.closeHandler()}>Cancel</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        workers: state.workerReducer.workers,
    }
}

const connectedWorkerCreate = connect(mapStateToProps)(WorkerCreate);
export {connectedWorkerCreate as WorkerCreate};