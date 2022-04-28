const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 8000;
const apiUserRoutes = require('./routes/apiUserRoutes');
const apiPostRoutes = require('./routes/apiPostRoutes');
const apiComRoutes = require('./routes/apiComRoutes');
const path = require('path'); 



app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'access-control-allow-origin,Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images'))); // middleware qui indique de se servir dans le dossier images pour les requetes 
app.use("/api/user",apiUserRoutes);
app.use("/api/post",apiPostRoutes);
app.use("/api/com",apiComRoutes);


db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on http://localhost:${PORT}`);
    });
});
