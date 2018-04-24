import Reflux from 'reflux';
import $ from 'jquery';
import jobActions from '../actions/JobActions';

var jobStore = Reflux.createStore({
    url : '127.0.0.1:8080/api/job',
    listenable : [jobActions],
    jobList: [],
    retrieveJobs : function() {
        
    }
});

export default jobStore;