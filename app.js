const express = require("express");


const app= express();

app.use(express.urlencoded({extended:true}));

const PORT = 3000;

app.get('/', (req, res)=>{
    res.send("success");
})

app.post('/', (req, res)=>{

    // console.log(req.body);
    const {phoneNumber, text, sessionId} = req.body;

    let responce;
     let result;
    if(text === ''){
        responce = 'CON enter your first name';
        
    }

    if(text!==''){
        result = text.split('*');
        console.log(result);
        if (result.length===1) {
            responce = 'CON enter your last name'
            
          
        }else if(parseInt(result[0])!== ''){
            console.log(result.length);
            if(result.length>1){
            responce = 'CON enter your age'
                console.log(result.length);
                if (parseInt(result[1])!== ''){
                    let age = result[2]
                    if (result.length === 3) {
                        if (parseInt(age)>55) {
                        responce = 'END please retire'
                    }
                    else{
                        console.log(age);
                        responce = 'END Your name is ' + result[0]+' ' + result[1]+ ' ' + age +'. years continue working'
                    }
                    }
                    
                }
            }
        }
    
     }
    setTimeout(()=>{
        res.send(responce)
        res.end
    }, 2000);
})


app.listen(PORT, ()=>{
    console.log("app is running");
})