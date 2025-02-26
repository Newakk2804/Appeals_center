import express from "express";
import dotenv from "dotenv";
import expressLayout from "express-ejs-layouts";
import connectDB from "./server/config/db.mjs";
import allRoutes from "./server/routes/index.mjs";
import methodOverride from "method-override";

dotenv.config();

const app = express();  

connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", allRoutes);

app.get("/", (req, res) => {
    const locals = {
        title: "Home Page",
    };
    
    res.render("index", {locals});
})

app.listen(process.env.PORT, ()=> {
    console.log(`App listening on port ${process.env.PORT}`);
});