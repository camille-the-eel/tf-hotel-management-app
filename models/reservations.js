module.exports = function(sequelize, DataTypes){
    var dateOut = this.date_out;
    var dateIn = this.date_in;

    var Reservation = sequelize.define("Reservation", {
        date_in: {
            type: DataTypes.DATEONLY,
            notNull: true,
            isDate: true,
            isBefore: dateOut
        },
        date_out: {
            type: DataTypes.DATEONLY,
            notNull: true,
            isDate: true,
            isAfter: dateIn
        },
        total_nights: {
            type: DataTypes.INTEGER,
            notNull: true,
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

        