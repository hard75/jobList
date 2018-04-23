import Reflux from 'reflux';
import $ from 'jquery';
import jobActions from '../actions/jobActions';

var jobStore = Reflux.createStore({
    url : 'localhost/jobs',
    listenable : [jobActions],
    jobList: [],
    retrieveJobs : function() {
        $.ajax({
            url: this.url,
            dataType: 'jsonp',
            contex: this,
            success:function (data){
                console.log('listo');
                this.jobList = data.models.rows;
                this.trigger(this.jobList);
            }
        })
    }
});

export default jobStore;