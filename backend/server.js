const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))

// ROOT ROUTE
app.get("/", (req,res)=>{
    res.send("API running")
})

app.use("/api/notes", require("./routes/notes"))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})