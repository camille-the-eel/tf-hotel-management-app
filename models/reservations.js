module.exports = function(sequelize, DataTypes){
    var Reservation = sequelize.define("Reservation", {
        date_in: DataTypes.DATE,
        date_out: DataTypes.DATE
    });

    Reservation.associate = function(models){
        Reservation.belongsTo(models.Guest,{
            foreignKey :{
                allowNull: false
            }
        });
        Reservation.hasMany(models.Reserved_room,{
            /***/
        });
        Reservation.hasMany(models.Occupied_room,{
             /***/
        });
        

    
       }
       return Reservation;
    };

        