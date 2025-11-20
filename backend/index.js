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
    }
});
function updateContent(request, response, next){
     newFile=new files({
        name:request.query.name,
        owner:request.query.owner,
        content:[[], [], []]
    });
    const lines=request.query.content.split("\n");
    let position=0;
    for(let line of lines){
        const parts=line.split(",");
        for(let part of parts){
            newFile.content[position%newFile.content.length]=part;
            position++;
        }
    }
    next();
}

const accounts=mongoose.model("Accounts", accountSchema, "Accounts");
const files=mongoose.model("Charts", fileSchema, "Charts");
let newFile;
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
charts.use(function(request, response, next){
    if(accountCreation)
        response.redirect("/");
    next();
});
charts.get("/signIn", async function(request, response){
   const signInInfo=await accounts.findOne({email:request.query.email, password:request.query.password});
   console.log(signInInfo);
   response.json(signInInfo);
});
charts.get("/open", async function(request, response){
    const file=await files.findOne({owner:request.query.email, name:request.query.name}, {_id:0, name:1, content:1});
    response.json(file);
});
charts.use(updateContent);
charts.put("/save", async function(request, response){
    const result=await files.findOneAndUpdate({owner:request.query.email, name:request.query.name}, {$set:{content:newFile.content}});
    response.send(result);
});
charts.use(updateContent);
charts.post("/saveAs", async function(request, response){
    const result=await files.create({name:request.query.name, owner:request.query.owner, content: newFile.content, visibility:"private"});
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