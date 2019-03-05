module.exports = function(sequelize, DataTypes){
    var Reserved_room = sequelize.define("Reserved_room", {
        number_of_rooms : DataTypes.INTEGER,
    });

    Reserved_room.associate = function(models){
        Reserved_room.belongsTo(models.Reservation, {
            foreignKey : {
                allowNull : false
            }
        });
        Reserved_room.belongsTo(models.Room_type,{
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Reserved_room;
};