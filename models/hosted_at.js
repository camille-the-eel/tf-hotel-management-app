module.exports = function(sequelize){
    var Hosted_at = sequelize.define("Hosted_at");

    Hosted_at.associate = function(models){
        Hosted_at.belongsTo(models.Guest, {
            foreignKey: {
                allowNull : false
            }
        })
        Hosted_at.belongsTo(models.Occupied_room, {
            foreignKey: {
                allowNull : false
            }
        });
    };

    return Hosted_at;
};