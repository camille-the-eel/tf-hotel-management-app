module.exports = function(sequelize, DataTypes){
    var Canceled= sequelize.define("Canceled", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            max: 301
        },
        createdAt: {
            type: DataTypes.DATE ,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
    freezeTableName: true
    });

    Canceled.associate = function(models){
        Canceled.belongsTo(models.Reservation_Room,{
            foreignKey :{
                allowNull: false
            }
        });
    }
    return Canceled;
};