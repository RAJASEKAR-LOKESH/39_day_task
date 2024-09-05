const express=require('express')
const Student=require('../models/studentModel')
const Mentor=require('../models/mentorModel')
const router=express.Router()

router.post('/student/create',async(req,res)=>{
    try{
        let user=await Student.findOne({email:req.body.email})
        console.log(user)
        if(user){
            return res.send({"message":"Student Already exists"})//early return
        }
       
        const studentData=new Student({
            name:req.body.name,
            email:req.body.email
        })
        studentData.save()
        res.send(studentData)
    }catch(e){
        res.send("Some internal error")
    }
})

router.put('/student/:mentorId/:id',async(req,res)=>{
    try{
        const find_student=await Student.findById(req.params.id);
        console.log(find_student)
        const getMentor=await Mentor.findById(req.params.mentorId);
        console.log(getMentor)
        if (!find_student) {
            return res.status(404).json({ message: "Student not found" });
        }
        if(find_student.mentor.ID)
        {
            return res.send("Already Assigned Mentor")
        }
        find_student.mentor.ID=getMentor._id
        find_student.mentor.mentorName=getMentor.name
        const data={
            studentId:find_student._id,
            studentName:find_student.name
        }
        console.log(data)
        getMentor.student.push(data)
        await find_student.save()
        await getMentor.save()
        res.json(find_student);
    }
    catch{
        res.status(500).send("Internal Server Error");
    }

})

router.put('/student/mentorchange/:id',async(req,res)=>{
    try{
        const mentorName=req.body.mentor
        console.log(mentorName)
        const find_student=await Student.findById(req.params.id);
        console.log(find_student)
        if (!find_student) {
            return res.status(404).json({ message: "Student not found" });
        }
        find_student.previousMentor=find_student.mentor
        find_student.mentor=mentorName
        await find_student.save();
        res.json(find_student);
    }
    catch{
        res.status(500).send("Internal Server Error");
    }

})
module.exports=router