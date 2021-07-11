require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');
const authMiddleware = require('./middlewares/auth-middleware');

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());
app.use(errorMiddleware);
// app.use(authMiddleware);
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();


// app.listen(PORT);

// app.use(express.static(__dirname + "/public"));
// app.use(cors());
//
// const MONGO_DB_URL = "mongodb+srv://Vladyslav:vladMongoDB@cluster0.pfq6k.mongodb.net/Bravo_db?retryWrites=true&w=majority";
//
// mongoose.connect(MONGO_DB_URL,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
// }, () => {
//     app.listen(PORT, function(){
//         console.log("app listen: 3000");
//     });
// });
//
// const userScheme = new Schema({
//     email: String,
// });
//
// const User = mongoose.model("User", userScheme, 'users');
// console.log(User);
//
// app.get("/users", async function(req, res) {
//     try {
//         const email = req.query.email;
//         User.findOne({email: email}, function(err, user) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 if (user) {
//                     res.send({status: 'Authorized'});
//                 }
//                 else {
//                     res.send({status: 'isNotAuth'});
//                 }
//             }
//         });
//     } catch (error){
//         console.log(error)
//         res.status(400).send('Can\t get users')
//     }
// });
