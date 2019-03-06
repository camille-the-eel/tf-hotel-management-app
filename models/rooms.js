module.exports = function(sequelize, DataTypes){
    var Rooms = sequelize.define("Rooms", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            max: 301
        },
        occupied: {
            type: DataTypes.BOOLEAN,
            notNull: true,
            default: false
        },
        price_per_night: {
            type: DataTypes.INTEGER,
            notNull: true,
        },
        max_occupancy: {
            type: DataTypes.INTEGER,
            notNull: true
        },
        number_of_beds: {
            type: DataTypes.INTEGER,
            notNull: true,
            max: 2
        },
        bed_type: {
            type: DataTypes.STRING
        },
        adjoining: { 
            type: DataTypes.BOOLEAN
        },
        jacuzzi: { 
            type: DataTypes.BOOLEAN
        },
        balcony: { 
            type: DataTypes.BOOLEAN
        },
        smoke: { 
            type: DataTypes.BOOLEAN
        }
    },
    {
        freezeTableName: true
    });

    Rooms.associate = function(models){
        Rooms.hasMany(models.Reservation_Room,{
            /***/
        });
    };
    return Rooms;
};