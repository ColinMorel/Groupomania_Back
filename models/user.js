module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        email:{
            type: DataTypes.STRING,
            unique:true,
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
        },
        administrator:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:0
        },
        image:{
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue:'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
        },
        bio:{
            type: DataTypes.STRING
        }
    });

    User.associate = models =>{
        User.hasMany(models.Post,{
            onDelete:"cascade",
            onUpdate:'cascade'
        });
    };
    
    return User;
}