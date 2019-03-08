module.exports = function(sequelize, DataTypes){

    var Reservation = sequelize.define("Reservation", {
        date_in: {
            type: DataTypes.DATEONLY,
            notNull: true,
            isDate: true
        },
        date_out: {
            type: DataTypes.DATEONLY,
            notNull: true,
            isDate: true
        },
        total_nights: {
            type: DataTypes.INTEGER,
            notNull: true,
        },
        total_price: {
            type: DataTypes.INTEGER
        }
    },
    {
    freezeTableName: true
    });

    Reservation.associate = function(models){
        Reservation.belongsTo(models.Guest,{
            foreignKey :{
                allowNull: false
            }
        });

        Reservation.belongsTo(models.Rooms,{
            foreignKey :{
                allowNull: false
            }
        });

        Reservation.hasMany(models.Reservation_Room,{
            /***/
        });
    }
    return Reservation;
};

        