module.exports = function(sequelize, DataTypes){
    var Room_type = sequelize.define("Room_type", {
        description : DataTypes.TEXT,
        max_capacity: DataTypes.INTEGER
    })

    Room_type.associate = function(models){
        Room_type.hasMany(models.Reserved_room, {
             /***/
        });
        Room_type.hasMany(models.Room,{
             /***/
        });
    };

    return Room_type;
};