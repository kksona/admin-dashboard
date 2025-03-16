import express from "express"
import bodyParser from "body-parser"
import nodemon from "nodemon"
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import {dataUser, dataProduct, dataProductStat, dataTransaction} from "./data/index.js"



/*CONFIGURATION*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/*ROUTES*/
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000; //9000 is the backup port
mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
    //ONLY ONCE INJECTION
    //Product.insertMany(dataProduct);
    //ProductStat.insertMany(dataProductStat);
    //Transaction.insertMany(dataTransaction);
    //User.insertMany(dataUser);
})
.catch((err) => console.log(`${err}`));