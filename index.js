const express = require("express");
const mongoose = require("mongoose");
const Info = require("./models/info");

const app = express();

const MONGO_URL = "mongodb://127.0.0.1:27017/projectmanagement";

main()
  .then(() => {
    console.log("Conneted to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


app.use(express.urlencoded({ extended: true }));



// home route
app.get("/home", (req, res) => {
  res.render("./index.ejs");
});

//route when form is flled by user and send to this route and this route will forward to show route
app.post("/allProject", async(req, res) => {
  const info = new Info(req.body.info);
  await info.save();
  res.redirect("/show");
});

// main where all project will be show
app.get("/show",async(req,res)=>{
  const allInfo = await Info.find({});
  res.render("./showProject.ejs",{allInfo})
})

//Delete Project info route
app.post("/:id",async(req,res)=>{
    let {id} = req.params;
    await Info.findByIdAndDelete(id);
    
    res.redirect("/show")
    
})

// Server running on port 5500
app.listen(5500,console.log("server is running on port "))