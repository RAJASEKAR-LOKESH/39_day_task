const express=require('express')
const Mentor=require('../models/mentorModel')
const router=express.Router()

router.post('/mentor/create',async(req,res)=>{
    try{
        let user=await Mentor.findOne({email:req.body.email})
        console.log(user)
        if(user){
            return res.send({"message":"Mentor Already exists"})//early return
        }
       
        const mentorData=new Mentor({
            name:req.body.name,
            email:req.body.email
        })
        mentorData.save()
        res.send(mentorData)
    }catch(e){
        res.send("Some internal error")
    }
})

router.put('/mentor/:studentId/:id',async(req,res)=>{
    try{
        const studentName=req.body.student
        console.log(studentName)
        const find_mentor=await Mentor.findById(req.params.id);
        console.log(find_mentor)
        if (!find_mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }
      
          find_mentor.student.push(studentName);
          await find_mentor.save();
          res.json(find_mentor);
    }
    catch{
        res.status(500).send("Internal Server Error");
    }

})

router.get('/mentor/:id',async(req,res)=>{
    try{
        const find_mentor=await Mentor.findById(req.params.id);
        
        if(!find_mentor){
            return res.send({"message":"Mentor Not Found"})//early return
        }

        res.send(find_mentor.student)
    }catch(e){
        res.send("Some internal error")
    }
})

module.exports=router