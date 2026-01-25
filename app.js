require("dotenv").config();

const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connectTOMongoDB} = require("./connection");
const {checkAuth} = require("./middleware/authentication");
const cookieParser = require("cookie-parser");


const Blog = require("./models/blog");

console.log("My name is ", process.env.myname)

const app = express();
const PORT = process.env.PORT || 8000;



 connectTOMongoDB(process.env.MONGO_URL).then(e => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use( checkAuth);
app.use(express.static(path.resolve("./public")));

//  ye naam show karne ke liye hrr baar ejs mai nahi bhejana padega
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});



app.get("/",async (req,res)=>{

    const allBlogs = await Blog.find({}).sort({"createdAt":-1});

    // wahi middleware mai jo req.user = userPayload dala wahi se aya
    res.render("home",{
        user: req.user,
        blogs:allBlogs,
    });
})


app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`));