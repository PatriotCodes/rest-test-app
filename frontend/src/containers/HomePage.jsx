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
                        </tr>
                    )}
                    </tbody>
                </table>}
            </div>
        );
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