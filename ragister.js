const route = require('express').Router();
const DataArr=[]
const bcrypt = require('bcrypt');
const saltround=10;
const jwt = require ('jsonwebtoken')
const secreatKey = process.env.seacreatKey

// Ragister 
route.post('/signup', (req, res)=>{
   const ClientData = req.body;
   console.log(ClientData);

   const User = DataArr.find((ClientDetails)=>{
        if(ClientDetails.email == ClientData.email){
            return ClientDetails
        }
     })
     if (User) {
          return res.send("User already exist on this site try to login!! ")
     }

   const HashPassword = bcrypt.hashSync(ClientData.password, saltround)
   const ServerData = {
        name: ClientData.name,
        email : ClientData.email,
        password: HashPassword,
        mobile: ClientData.mobile
   }
   const token = jwt.sign({userEmail: ClientData.email}, process.env.seacreatKey,{expiresIn: '360m'})
   DataArr.push(ServerData);
   console.log(DataArr);
   return res.send({msg: "user ragister", token: token});

})

route.post('/login', (req,res)=>{
   const LoginPage = req.body;
   const User = DataArr.find((UserDetails)=>{
        if (UserDetails.email == LoginPage.email) {
            return UserDetails;
        }
   }) 
   if(!User){
        return res.send("You are not Ragister, Please Ragister First")
   }
   const Validate = bcrypt.compareSync(LoginPage.password, User.password)
   if(Validate){
     const logtoken = jwt.sign({userEmail: ClientData.email}, secreatKey, {expiresIn: '360m'})
     return res.send("User Login Successfully")
   }
   return res.send({mes: "user ragister", logtoken: logtoken}) 
})


module.exports = route