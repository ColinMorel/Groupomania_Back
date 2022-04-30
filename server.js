const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 8000;
const apiUserRoutes = require('./routes/apiUserRoutes');
const apiPostRoutes = require('./routes/apiPostRoutes');
const apiComRoutes = require('./routes/apiComRoutes');
const path = require('path'); 
const cors = require('cors');
const helmet = require('helmet');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
app.disable('x-powered-by');

app.use('/images', express.static(path.join(__dirname,'images')));
app.use("/api/user",apiUserRoutes);
app.use("/api/post",apiPostRoutes);
app.use("/api/com",apiComRoutes);

db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Ecoute sur http://localhost:${PORT}`);
    });
});
