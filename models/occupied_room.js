module.exports = function(sequelize, DataTypes){
    var Occupied_room = sequelize.define("Occupied_room", {
        check_in : DataTypes.DATE,
        check_out: DataTypes.DATE
    });
    Occupied_room.associate = function(models){
        Occupied_room.belongsTo(models.Room, {
            foreignKey: {
                allowNull : false
            }
        });
        Occupied_room.belongsTo(models.Reservation, {
            foreignKey: {
                allowNull : false
            }
        });
        Occupied_room.hasMany(models.Hosted_at, {
             /***/
        });
    };

    return Occupied_room;
};