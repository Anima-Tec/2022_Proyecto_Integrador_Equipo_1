import express from "express";
const app = express();

import { JwtMiddleware } from "./controllers/configuration/middleware/JWTMiddleware";
import login from "./controllers/admin/AdminController";

import centresAdmin from "./controllers/admin/CentreController";
import careersAdmin from "./controllers/admin/CareerController";
import centresPublic from "./controllers/public/CentrePublicController";
import careersPublic from "./controllers/public/CareerPublicController";

import * as dotenv from "dotenv";
dotenv.config();

/*-------------------Imports-------------------*/

/*Cors*/
import cors from "cors";
app.use(cors());

/*Json Parser*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*Listen endpoints of AdminController in /login */
/*No Middleware configured*/

app.use("/login", login);

app.use("/centres", centresPublic);
app.use("/careers", careersPublic);

/*Middleware that'll control JWT, this app uses refresh token. More details in AdminController class*/
/*Middleware is active from now on*/
app.use(JwtMiddleware);

/*Listen routes*/
app.use("/centres", centresAdmin);
app.use("/careers", careersAdmin);

/*Run app*/
app.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});
