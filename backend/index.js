import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "./scripts/database.js";
const charts=express();
const accountSchema=new mongoose.Schema({
    firstName:{
        type:"String",
        require:true
    },
    lastName:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    }
});
const fileSchema=new mongoose.Schema({
    owner:{
        required:true,
        type:"String"
    },
    name:{
        required:true,
        type:"String"
    },
    content:{
        type:[["String"], ["String"], ["String"]]
    },
    visibility:{
        type:"String",
        required:true
    },
    shared:{
        type:["String"]
    }
});
let newFile;
function updateContent(request, response, next){
     newFile=new files({
        name:request.query.name,
        owner:request.query.owner,
        content:[[], [], []],
        visibility:request.query.visibility,
        shared:request.query.shared.split(",")
    });
    const lines=request.query.content.split("\n");
    let position=0;
    for(let line of lines){
        const parts=line.split(";");
        for(let part of parts){
            newFile.content[position%3].push(part);
            position++;
        }
         
    }
    next();
}

const accounts=mongoose.model("Accounts", accountSchema, "Accounts");
const files=mongoose.model("Charts", fileSchema, "Charts");

let accountCreation=false;
charts.use(cors());
charts.use(express.json());
charts.post("/createAccount", async function(request, response){
        const firstName=request.query.firstName;
        const lastName=request.query.lastName;
        const email=request.query.email;
        const firstPassword=request.query.firstPassword;
        const secondPassword=request.query.secondPassword;
        if(firstPassword==secondPassword){
            const result=await accounts.create({firstName: firstName, lastName:lastName, email:email, password:firstPassword});
            response.json(result);
            
            accountCreation=true;
        }
        else{
            response.json("Fail");
            accountCreation=false;
        }
});
charts.get("/matchingEmails/:email", async function(request, response){
         const matchingEmails=await accounts.find({email:request.params.email});
         response.json(matchingEmails);
});
charts.use(function(request, response, next){
    if(accountCreation)
        response.redirect("/");
    next();
});
charts.get("/signIn", async function(request, response){
   const signInInfo=await accounts.findOne({email:request.query.email, password:request.query.password});
    
   response.json(signInInfo);
});
charts.get("/open", async function(request, response){
    const file=await files.findOne({owner:request.query.email, name:request.query.name}, {_id:0, name:1, content:1, visibility:1, shared:1});
    response.json(file);
});
charts.get("/viewFiles/:email", async function(request, response){
    const fileList=await files.find({owner:request.params.email}, {name:1, _id:0});
    response.json(fileList);
});
charts.get("/sharedCharts", async function(request, response){
     const sharedCharts=await files.find({visibility:"Public"}, {name:1, _id:1});
     response.json(sharedCharts);
});
charts.get("/viewChart/:id", async function(request, response){
     const chart=await files.findOne({_id:request.params.id}, {content:1});
     response.send(chart);
});
charts.use(updateContent);
charts.put("/save", async function(request, response){
     
   
    const result=await files.updateOne({owner:request.query.email, name:request.query.name}, {$set:{content:newFile.content, visibility:newFile.visibility, shared:newFile.shared}});
    response.send(result);
});
charts.use(updateContent);
charts.post("/saveAs", async function(request, response){
    const result=await files.create({name:request.query.name, owner:request.query.owner, content: newFile.content, visibility:newFile.visibility, shared:newFile.shared});
    console.log(newFile.content);
    response.json(result);
});
charts.delete("/delete", async function(request, response){
    
      
        const result=await files.deleteOne({owner:request.query.email, name:request.query.name});
        response.json(result);
    
});
charts.listen(9000, function(){
    console.log("Running");
})