module.exports = function(sequelize, DataTypes){
    var Room = sequelize.define("Room", {
        available: DataTypes.BOOLEAN,
        room_number: DataTypes.INTEGER,
        bed_type: DataTypes.STRING,
        jacuzzi: DataTypes.BOOLEAN,
        balcony: DataTypes.BOOLEAN,
        smoke: DataTypes.BOOLEAN
    })

    Room.associate = function(models){
        Room.hasMany(models.Occupied_room,{
            /***/
        });
        Room.belongsTo(models.Room_type,{
            foreignKey: {
                allowNull : false
            }
        });
    };
    return Room;
};