const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const apiUserRoutes = require('./routes/apiUserRoutes');
const apiPostRoutes = require('./routes/apiPostRoutes');

app.use("/api/user",apiUserRoutes);
app.use("/api/post",apiPostRoutes);

db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on http://localhost:${PORT}`);
    });
});
