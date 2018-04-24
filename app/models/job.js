module.exports = function(sequelize, Sequelize) {
    const User = require('./user.js')(sequelize, Sequelize);
    const Job = sequelize.define('job', {

            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
    
            name: {
                type: Sequelize.TEXT
            },
    
            date: {
                type: Sequelize.DATEONLY
            },
    
            priority: {
                type: Sequelize.ENUM('high', 'medium', 'low'),
                defaultValue: 'low'
            },
            user_id : {
                type: Sequelize.INTEGER,
                reference :{
                    model : 'user',
                    key : 'id'
                }
            }
        }
    );

    return Job;
 
}