module.exports = (sequelize,DataTypes)=>{
    const post = sequelize.define("Post",{
        user_id:{
            type: DataTypes.STRING,
            allowNull: false
        },
        content:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return post;
}