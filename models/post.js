module.exports = (sequelize,DataTypes)=>{
    const Post = sequelize.define("Post",{
        content:{
            type: DataTypes.STRING,
            allowNull: false
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    Post.associate = models => {
        Post.belongsTo(models.User)
    };
    Post.associate = models =>{
        Post.hasMany(models.Com,{
            onDelete:"cascade"
        });
    };
    return Post;
}