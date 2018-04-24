import Reflux from 'reflux';
import $ from 'jquery';
import jobActions from '../actions/JobActions';

var jobStore = Reflux.createStore({
    url : '127.0.0.1:8080/job',
    listenable : [jobActions],
    jobList: [],
    retrieveJobs : function() {
        
        $.ajax({
            url: this.url,
            dataType: 'jsonp',
            context: this,
            success:function (data){
                console.log('listo');
                this.jobList = data.models.rows;
                this.trigger(this.jobList);
            }
        })
    }
});

export default jobStore;