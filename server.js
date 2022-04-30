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
const rateLimit = require('express-rate-limit')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
app.disable('x-powered-by');

// app.use(rateLimit({
// 	windowMs: 60 * 60 * 1000, // 1h
// 	max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	message:"Vous avez effectué plus de 100 requêtes en 1 heure ! Blocage automatique.",
//     headers:true
// }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/user",apiUserRoutes);
app.use("/api/post",apiPostRoutes);
app.use("/api/com",apiComRoutes);


db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on http://localhost:${PORT}`);
    });
});
