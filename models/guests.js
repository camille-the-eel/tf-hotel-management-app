module.exports = function(sequelize, DataTypes){
    var Guest = sequelize.define("Guest", {
        last_name: {
            type: DataTypes.STRING,
            notNull: true
        },
        first_name: {
            type: DataTypes.STRING,
            notNull: true
        },
        guest_phone: {
            type: DataTypes.STRING,
            notNull: true
        },
        guest_email: {
            type: DataTypes.STRING,
            isEmail: true,
            notNull: true
        },
        guest_notes: {
            type: DataTypes.TEXT
        },
        credit_card_number: {
            type: DataTypes.BIGINT,
            isCreditCard: true,
            notNull: true
        },
        credit_card_type: {
            type: DataTypes.STRING,
            notNull: true
        },
        credit_card_expiration: {
            type: DataTypes.STRING,
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

    Guest.associate = function(models){
        Guest.hasMany(models.Reservation, {
            /***/
        });
    };

    return Guest;
    
};