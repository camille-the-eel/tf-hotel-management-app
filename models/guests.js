module.exports = function(sequelize, DataTypes){
    var Guest = sequelize.define("Guest", {
        guest_name : DataTypes.STRING,
        guest_phone: DataTypes.INTEGER,
        guest_email: {
            type: DataTypes.STRING,
            isEmail: true
        }
        // member_since: DataTypes.DATE,
        // guest_notes: DataTypes.TEXT

    });

    Guest.associate = function(models){
        Guest.hasMany(models.Reservation, {
            /***/
        });
        Guest.hasMany(models.Hosted_at, {
             /***/
        });

    };

    return Guest;
    
};