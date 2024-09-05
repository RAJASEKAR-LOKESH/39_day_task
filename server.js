const express=require('express')
const connection=require('./db/connection')
const studentRoutes=require('./routes/studentRoutes')
const mentorRoutes=require('./routes/mentorRoutes')

const app=express()
connection();
const PORT=3000
app.use(express.json())

app.use(studentRoutes)
app.use(mentorRoutes)

app.listen(PORT,()=>{
    console.log("Server Started");
})