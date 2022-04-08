module.exports = (sequelize,DataTypes)=>{
    const user = sequelize.define("User",{
        mail:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return user;
}