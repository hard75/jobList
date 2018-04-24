import React from 'react';
import Reflux from 'reflux';
import JobStore from '../stores/JobStore';

var GridJobs = React.createClass({
    mixins: [Reflux.connect(JobStore, 'jobstore')],
    render : function () {
        if (this.state.jobStore) {
            return (
                <table>
                    <th>
                        <td>Name of job</td>
                        <td>Date</td>
                        <td>Priority</td>
                        <td>Actions</td>
                    </th>
                    <tbody>
                        {
                            this.state.jobstore.map((job) => {
                              return (
                                  <tr>
                                      <td>job.name</td>
                                      <td>job.date</td>
                                      <td>job.priority</td>
                                  </tr>
                              );
                            })
                        }
                    </tbody>
                </table>
            );
        } else {
            return <p>No disponible</p>;
        }
    }
});

export default GridJobs;