const express=require('express');
const app=new express();
const fs=require('fs');
app.use(express.json());
const data=require('./dataset.json')
app.get('/hospital',(req,res)=>{    //GET 
    console.log("got data");
    res.send(data);
    
})
app.post('/hospital',(req,res)=>{   //POST
data.push(req.body);
fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
    if(err){
        console.log("data not written");
        res.send("data not written");
    }
    else{
        console.log("data written successfully");
        res.send("data written successfully");
    }
})
})
app.put('/hospital/:name',(req,res)=>{   //UPDATE 
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.hospitalName==name){
           item.hospitalLocation=req.body.hospitalLocation;
           item.patientCount=req.body.patientCount;
          
        }
       
    })
    fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
        if(err){res.send("data not updated")}
        else{res.send("data updated")}
    })
})
app.delete('/hospital/:name',(req,res)=>{
let name=req.params.name;
let value=data.filter(item=>item.hospitalName !==name);
fs.writeFile('dataset.json',JSON.stringify(value),(err,resp)=>{
    if(err){
        res.send("data cannot be deleted");
    }
    else{
        res.send("data deleted successfully");
    }
})
})





app.listen(3000);
console.log("server is running in port 3000");