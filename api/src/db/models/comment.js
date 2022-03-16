const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        "comment",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            ratingComment: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 5,
                },
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            creationDate: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: false },
    )
}