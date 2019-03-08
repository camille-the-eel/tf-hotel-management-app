module.exports = function(sequelize, DataTypes){
    var Rooms = sequelize.define("Rooms", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            max: 401
        },
        occupied: {
            type: DataTypes.BOOLEAN,
            notNull: true,
            defaultValue: false
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
            max: 3
        },
        bed_type: {
            type: DataTypes.STRING
        },
        adjoining: { 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        jacuzzi: { 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        balcony: { 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        smoke: { 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
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

    Rooms.associate = function(models){
        Rooms.hasMany(models.Reservation,{
            /***/
        });
    };
    return Rooms;
};