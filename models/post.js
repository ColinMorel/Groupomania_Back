module.exports = (sequelize,DataTypes)=>{
    const Post = sequelize.define("Post",{
        title:{
            type: DataTypes.STRING,
            allowNull:false
        },
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
    }
    Post.associate = models =>{
        Post.hasMany(models.Com,{
            onDelete:"cascade"
        });
    };
    /*
    ALTER TABLE `posts` ADD CONSTRAINT `Link_Post_User` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
    */
    return Post;
}