const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs")
var multer = require('multer');
var upload = multer();


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('images'))
app.use(express.static('static'))

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());


router.get("/", (req, res) => {
    const images = require("./images/meta.json")

    res.render("index", { title: "Check it out", images: images });
});

router.post("/rate", (req, res) => {
    const image = req.body.image_url
    // const approved = (req.body.rating == "no" ? false : true)
    //console.log(image, "approved");
    const meta = require("./images/meta.json")
    for (const m of meta) {
        if(m.file==image){
            m.approved = true
            break
        }
    }
    fs.writeFileSync("./images/meta.json", JSON.stringify(meta,false,"\t"))
    console.log(image, "approved");
    res.send("ok")
});

app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");