const express = require("express");
const { find } = require("./models/Student");
const Student = require("./models/Student");

const app = express();

// middleware
app.use(express.json());

// Routes

// Get all the students
app.get("/students", async (req, res) => {
  const users = await Student.find({isDeleted:false});
  res.send(users);
});

// Add student to database
app.post("/students", async (req, res) => {
  console.log("post api");
  const input = req.body;
  const newUser = new Student({
    name: input.name,
    sex: input.sex,
    age: input.age,
    class: input.class,
    grade_point: input.grade_point,
  });
  newUser
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log("user is not dave in db ", err));
});

// Get specific student
app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  const findUser = await Student.findById(id);
  if(findUser) {
    if (findUser.isDeleted==true) {
      res.status(404).json({err:"record not found"});
    }
    else{
      res.json(findUser);
    }
  }
  
  else{
    res.status(404).json({msg:"user not found"});
  }
});

// delete specific student
app.delete(`/students/:id`, async (req, res) => {
    const id = req.params.id;
    const {type} = req.query;
    const findUser = await Student.findById(id);
    console.log("user is ",findUser);
    if(findUser==null) {
      res.status(404).json({msg:"user is not found"});
    }
    else{

        if(type=="soft") {
          await Student.updateOne({_id:id},{$set:{isDeleted:true}});
          res.json({msg:`user of ${id} is deleted`});
        }


        else if(type=="hard") {
          await Student.deleteOne({_id:id});
          res.send("user is deleted");
        }
    }
  
});

module.exports = app;
