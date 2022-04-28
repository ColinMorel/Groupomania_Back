module.exports = (sequelize,DataTypes)=>{
    const Com = sequelize.define("Com",{        
        content:{
            type: DataTypes.STRING,
            allowNull: false
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false
        },
        likes:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dislikes:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Com.associate = models => {Com.belongsTo(models.Post,{onDelete:'CASCADE'})}
    Com.associate = models => {Com.belongsTo(models.User,{onDelete:'CASCADE'})}

    /*
    ALTER TABLE `posts` ADD CONSTRAINT `Link_Post_User` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
    */
    return Com;
}