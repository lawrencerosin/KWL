import cors from "cors";
import "dotenv/config";
import express from "express";
import database from "./scripts/database.js";
const charts=express();
const accounts=database.collection("Accounts");
const files=database.collection("Charts")
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
            await accounts.insertOne({firstName:firstName, lastName:lastName, email:email, password:firstPassword});
            response.json("Success");
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
   const signInInfo=await accounts.find({email:request.query.email, password:request.query.password}, {_id:0, name:0, password:0, email:1}).toArray();
   response.send(signInInfo);
});
charts.get("/open", async function(request, response){
    const file=await files.findOne({owner:request.query.email, name:request.query.name}, {_id:0, name:1, content:1});
    response.json(file);
});
charts.post("/saveAs", async function(request, response){
    await files.insertOne({name:request.query.name, owner:request.query.email, content: request.query.content});
    response.send("saved");
})
charts.listen(9000, function(){
    console.log("Running");
})