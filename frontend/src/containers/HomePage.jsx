import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {Modal} from "../components";
import {workerActions} from '../actions/worker.actions';
import {WorkerCreate} from './WorkerCreate';
import {WorkerUpdate} from "./WorkerUpdate";
import '../assets/scss/styles.scss';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
            showUpdate: false,
            editedWorker: {
                _id: '',
                fullName: '',
                gender: '',
                contactInfo: '',
                salary: '',
                position: '',
            },
            searchQuery: '',
        };
        this.hideCreate = this.hideCreate.bind(this);
        this.hideUpdate = this.hideUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(workerActions.getAll());
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="home-top">
                    <div className="search-wrap">
                        <input type="text" className="form-control" placeholder="Search..."
                               name="searchQuery" onChange={this.handleInputChange}/>
                        <button className="btn btn-primary"
                                onClick={() => this.props.dispatch(workerActions.searchWorker(this.state.searchQuery))}>
                            Search
                        </button>
                        <button className="btn btn-default" onClick={() => this.props.dispatch(workerActions.getAll())}>
                            Cancel
                        </button>
                    </div>
                    <button className="btn btn-success" onClick={() => this.showCreate()}>
                        Add New Worker
                    </button>
                    <button className="btn btn-default float-right">
                        <Link to="/login">Logout</Link>
                    </button>
                </div>
                <Modal show={this.state.showCreate}>
                    <WorkerCreate closeHandler={this.hideCreate}/>
                </Modal>
                <Modal show={this.state.showUpdate}>
                    <WorkerUpdate closeHandler={this.hideUpdate} worker={this.state.editedWorker}/>
                </Modal>
                {!this.props.loading &&
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Contact Info</th>
                        <th>Salary</th>
                        <th>Position</th>
                        <th>Controls</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.workers.map((worker) =>
                        <tr key={worker._id}>
                            <td>{worker.fullName}</td>
                            <td>{worker.gender}</td>
                            <td>{worker.contactInfo}</td>
                            <td>{worker.salary}</td>
                            <td>{worker.position}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => this.showUpdate(worker)}>Update
                                </button>
                                <button className="btn btn-danger ml-15"
                                        onClick={() => this.handleDelete(worker._id)}>Delete
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                }
            </div>
        );
    }

    handleDelete(id) {
        this.props.dispatch(workerActions.deleteWorker(id));
    }

    showCreate() {
        this.setState({showCreate: true});
    };

    hideCreate() {
        this.setState({showCreate: false});
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    showUpdate(worker) {
        console.log(worker.salary);
        this.setState({
            showUpdate: true,
            editedWorker: {
                _id: worker._id,
                fullName: worker.fullName != null ? worker.fullName : '',
                gender: worker.gender != null ? worker.gender : '',
                contactInfo: worker.contactInfo != null ? worker.contactInfo : '',
                salary: worker.salary != null ? worker.salary : '',
                position: worker.position != null ? worker.position : '',
            }
        });
    }

    hideUpdate() {
        this.setState({showUpdate: false});
    };
}

function mapStateToProps(state) {
    return {
        workers: state.workerReducer.workers,
        loading: state.workerReducer.loading,
    }
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};