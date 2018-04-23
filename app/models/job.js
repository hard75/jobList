module.exports = function(sequelize, Sequelize) {

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
        }, {
            classMethods: {
              associate: function(models) {
                Job.belongsTo(models.User);
              }
            }
        }
    );

    return Job;
 
}