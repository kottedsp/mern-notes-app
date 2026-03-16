import { useState, useEffect } from "react"
import api from "./api"

function App() {

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const fetchNotes = async () => {
    const res = await api.get("/notes")
    setNotes(res.data)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const addNote = async () => {
    if(!title || !content) return
    await api.post("/notes", { title, content })
    setTitle("")
    setContent("")
    fetchNotes()
  }

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`)
    fetchNotes()
  }

  return (
    <div style={styles.page}>

      <h1 style={styles.heading}>Notes</h1>

      <div style={styles.form}>

        <input
          style={styles.input}
          placeholder="Note title"
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Write your thoughts..."
          value={content}
          onChange={e=>setContent(e.target.value)}
        />

        <button style={styles.button} onClick={addNote}>
          Add Note
        </button>

      </div>

      <div style={styles.notesGrid}>
        {notes.map(note => (
          <div key={note._id} style={styles.card}>

            <h3 style={styles.cardTitle}>{note.title}</h3>
            <p style={styles.cardText}>{note.content}</p>

            <button
              style={styles.delete}
              onClick={()=>deleteNote(note._id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default App

const styles = {

page:{
  minHeight:"100vh",
  background:"linear-gradient(135deg,#e6f4ea,#c8e6c9)",
  padding:"40px",
  fontFamily:"system-ui"
},

heading:{
  textAlign:"center",
  color:"#1b5e20",
  marginBottom:"40px"
},

form:{
  maxWidth:"500px",
  margin:"auto",
  background:"#ffffffaa",
  padding:"20px",
  borderRadius:"16px",
  backdropFilter:"blur(10px)",
  boxShadow:"0 8px 30px rgba(0,0,0,0.1)",
  display:"flex",
  flexDirection:"column",
  gap:"10px"
},

input:{
  padding:"12px",
  borderRadius:"8px",
  border:"1px solid #c8e6c9"
},

textarea:{
  padding:"12px",
  borderRadius:"8px",
  border:"1px solid #c8e6c9",
  minHeight:"80px"
},

button:{
  background:"#2e7d32",
  color:"white",
  padding:"12px",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer"
},

notesGrid:{
  marginTop:"40px",
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
  gap:"20px"
},

card:{
  background:"white",
  padding:"20px",
  borderRadius:"16px",
  boxShadow:"0 6px 20px rgba(0,0,0,0.1)"
},

cardTitle:{
  color:"#2e7d32"
},

cardText:{
  color:"#333"
},

delete:{
  marginTop:"10px",
  background:"#c62828",
  color:"white",
  border:"none",
  padding:"6px 10px",
  borderRadius:"6px",
  cursor:"pointer"
}

}