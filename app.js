const express = require("express");
const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();

const app= express();

app.use(express.urlencoded({extended:true}));

const PORT = 3000;

app.get('/', (req, res)=>{
    res.send("success");
})


let result = [];
 
// Define menu states
menu.startState({
    run: () => {
        
        menu.con('Welcome. Please provide your 1st name, last name and age:' +
            '\n Reply with 1 to continue' +
            '\n Reply with 2 to cancel'
            );
    },
    
    next: {
        '1': 'first name',
        '2': 'cancel'
        
    }
});
 
menu.state('cancel', {
    run: ()=>{
        menu.end('USSD cancelled!')
    }
})

menu.state('first name', {
    run: () => {
        
        menu.con('Enter your first name')
        
    },

    
        defaultNext:'last name'
        
    
});
 
menu.state('last name', {
    run: () => {
        menu.con('Enter last name:');
        result.push(menu.val);
    },
    
    defaultNext: 'age'
});
 

menu.state('age', {
    run: () => {
        
        menu.con('enter your age');
        result.push(menu.val);
        
    },

    defaultNext: 'feedback'
});

menu.state('feedback', {
    run: () => {
        
      let message;
        result.push(menu.val);
        if (parseInt(result[2])>55) {
            message = 'Please retire'
        } else {
            message = 'Your name is ' + result[0] + ' ' + result[1] + ' ' + result[2] + ' years continue'
        }
        menu.end(message);
        
    }

});
 

 //linking with express
app.post('/', function(req, res){
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});


app.listen(PORT, ()=>{
    console.log("app is running");
})