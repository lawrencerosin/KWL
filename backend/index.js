import cors from "cors";
import "dotenv/config";
import express from "express";
import database from "./scripts/database.js";
const charts=express();
const accounts=database.collection("Accounts");
charts.use(express.json());
charts.post("/createAccount", async function(request, response){
        const firstName=request.query.firstName;
        const lastName=request.query.lastName;
        const email=request.query.email;
        const firstPassword=request.query.firstPassword;
        const secondPassword=request.query.secondPassword;
        if(firstPassword==secondPassword){
            await accounts.insertOne({firstName:firstName, lastName:lastName, email:email, password:firstPassword});
            response.send("Success");
        }
        else{
            response.send("Fail");
        }
});
charts.get("/signIn/:email/:password", async function(request, response){
   const signInInfo=await accounts.find({_id:0, email:1}, [{email:request.params.email, password:request.params.password}]).toArray();
   if(signInInfo.length>0)
       response.send(signInInfo["username"]);
   else{
       response.send("");
   }
});
charts.listen(9000, function(){
    console.log("Running");
})