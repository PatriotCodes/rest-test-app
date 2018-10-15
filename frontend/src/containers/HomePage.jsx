import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {workerActions} from '../actions/worker.actions';
import '../assets/scss/styles.scss';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(workerActions.getAll());
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="home-top">
                    <button className="btn btn-success">
                        Add New
                    </button>
                    <button className="btn btn-default float-right">
                        <Link to="/login">Logout</Link>
                    </button>
                </div>
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
                                <button className="btn btn-primary">Update</button>
                                <button className="btn btn-danger ml-15" onClick={() => this.handleDelete(worker._id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>}
            </div>
        );
    }

    handleDelete(id) {
        this.props.dispatch(workerActions.deleteWorker(id));
    }
}

function mapStateToProps(state) {
    return {
        workers: state.workerReducer.workers,
        loading: state.workerReducer.loading,
    }
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};