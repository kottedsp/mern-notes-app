const router = require("express").Router()
const Note = require("../models/Note")

// CREATE
router.post("/", async (req,res)=>{
    const note = new Note(req.body)
    await note.save()
    res.json(note)
})

// READ ALL
router.get("/", async(req,res)=>{
    const notes = await Note.find().sort({createdAt:-1})
    res.json(notes)
})

// UPDATE
router.put("/:id", async(req,res)=>{
    const updated = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json(updated)
})

// DELETE
router.delete("/:id", async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    res.json({message:"Deleted"})
})

// SEARCH
router.get("/search/:text", async(req,res)=>{
    const notes = await Note.find({
        title: {$regex:req.params.text,$options:"i"}
    })
    res.json(notes)
})

module.exports = router