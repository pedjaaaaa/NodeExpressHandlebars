module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        devour: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Burger;
}