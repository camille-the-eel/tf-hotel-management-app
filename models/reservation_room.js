module.exports = function(sequelize, DataTypes){
    var totalPrice;

    var Reservation_Room = sequelize.define("Reservation_Room", {
        check_in: {
            type: DataTypes.DATE
        },
        check_out: {
            type: DataTypes.DATE
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
        total_price: {
            type: DataTypes.INTEGER
        },
        guest_count: {
            type: DataTypes.INTEGER,
            notNull: true
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