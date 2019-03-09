module.exports = function(sequelize, DataTypes){

    var Reservation_Room = sequelize.define("Reservation_Room", {
        check_in: {
            type: DataTypes.DATE,
            allowNull: true
        },
        check_out: {
            type: DataTypes.DATE,
            allowNull: true
        }, 
        in_house: {
            type: DataTypes.BOOLEAN,
            notNull: true,
            defaultValue: false
        },
        canceled: {
            type: DataTypes.BOOLEAN,
            notNull: true,
            defaultValue: false
        },
        number_of_rooms: {
            type: DataTypes.INTEGER,
            notNull: true,
            defaultValue: 1
        },
        total_price_per_room: {
            type: DataTypes.INTEGER
        },
        guest_count: {
            type: DataTypes.INTEGER,
            notNull: true
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

    Reservation_Room.associate = function(models){
        Reservation_Room.belongsTo(models.Reservation,{
            foreignKey :{
                allowNull: false
            }
        });
        Reservation_Room.hasMany(models.Canceled,{
            /***/
        });
    }
    return Reservation_Room;
};