import React from 'react';
import {connect} from 'react-redux';

import {updateWorker} from "../actions";
import '../assets/scss/styles.scss';

class WorkerUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            worker: {
                fullName: '',
                gender: '',
                contactInfo: '',
                salary: '',
                position: '',
            },
        };
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            worker: {
                fullName: nextProps.worker.fullName != null ? nextProps.worker.fullName : '',
                gender: nextProps.worker.gender != null ? nextProps.worker.gender : '',
                contactInfo: nextProps.worker.contactInfo != null ? nextProps.worker.contactInfo : '',
                salary: nextProps.worker.salary != null ? nextProps.worker.salary : '',
                position: nextProps.worker.position != null ? nextProps.worker.position : '',
            },
        });
    }

    handleSubmitUpdate(event) {
        event.preventDefault();
        let worker = {};
        worker['_id'] = this.props.worker._id;
        worker['fullName'] = this.state.worker.fullName;
        worker['gender'] = this.state.worker.gender;
        worker['contactInfo'] = this.state.worker.contactInfo;
        worker['salary'] = this.state.worker.salary;
        worker['position'] = this.state.worker.position;
        this.props.dispatch(updateWorker(worker));
        this.props.closeHandler();
    }

    handleClose(event) {
        event.preventDefault();
        this.props.closeHandler();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            worker: {
                [name]: value
            }
        });
    }

    render() {
        return (
            <form className="p-15" onSubmit={this.handleSubmitUpdate}>
                <div className="form-group">
                    <label>FullName</label>
                    <input type="text" className="form-control" placeholder="Full Name"
                           name="fullName" value={this.state.worker.fullName} onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select className="form-control" value={this.state.gender} name="gender" onChange={this.handleInputChange}>
                        <option>male</option>
                        <option>female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Contact Info</label>
                    <input type="text" className="form-control" placeholder="Contact Info"
                           name="contactInfo" value={this.state.worker.contactInfo} onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input type="text" className="form-control" placeholder="Salary"
                           name="salary" value={this.state.worker.salary} onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Position</label>
                    <input type="text" className="form-control" placeholder="Position"
                           name="position" value={this.state.worker.position} onChange={this.handleInputChange}/>
                </div>
                <button className="btn btn-primary">Update Worker</button>
                <button className="btn btn-danger ml-15" onClick={this.handleClose}>Cancel</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        workers: state.workerReducer.workers,
    }
}

const connectedWorkerUpdate = connect(mapStateToProps)(WorkerUpdate);
export {connectedWorkerUpdate as WorkerUpdate};