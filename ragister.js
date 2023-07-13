const route = require('express').Router();
const DataArr=[]
const bcrypt = require('bcrypt');
const saltround=10;

// Ragister 
route.post('/signup', (req, res)=>{
   const ClientData = req.body;
   console.log(ClientData);

   const User = DataArr.find((ClientDetails)=>{
        if(ClientDetails.email == ClientData.email){
            return ClientDetails
        }
   })

   const HashPassword = bcrypt.hashSync(ClientData.password, saltround)
   const ServerData = {
        name: ClientData.name,
        email : ClientData.email,
        password: HashPassword,
        mobile: ClientData.mobile
   }
   if (User) {
        return res.send("User already exist on this site try to login!! ")
   }
   DataArr.push(ServerData);
   console.log(DataArr);
   return res.send(DataArr);

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
     return res.send("User Login Successfully")
   }
   return res.send("Pasword doesn't match") 
})


module.exports = route