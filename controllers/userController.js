const users = require('../models/Users')

module.exports = {
   getAllUsers : (req, res)=>{
      res.json(users)
   },

   getUserById : (req, res)=>{
      const ifUserExists = users.filter(user=>user.id===req.params.id)[0]
      console.log(ifUserExists)
      if(!ifUserExists.id) return res.status(400).json({message:`User: ${req.params.id} does not exist`})
      return res.status(200).json(ifUserExists)
   },

   createUser : (req, res)=>{
      if(!req.body.name || !req.body.email) return res.status(400).json({message: 'Please enter both a name and an email to add user'})

      const newUser = {
         name: req.body.name,
         email: req.body.email
      }
      users.push(newUser)
      return res.status(200).json(`User ${req.body.name}(${req.body.email}) successfully added`)
   },

   updateUser : (req, res)=>{
      const ifUserExists = users.filter(user=>user.id===req.params.id)[0]
      if(!ifUserExists.id) return res.status(400).json({message:`User: ${req.params.id} does not exist`})
      
      const {name, email} = req.body
      ifUserExists.name = name ? name : ifUserExists.name
      ifUserExists.email = email ? email : ifUserExists.email
      return res.status(200).json({message:`User: ${name} successfully updated`})
   },

   deleteUser : (req, res)=>{
      const ifUserExists = users.filter(user=>user.id===req.params.id)[0]
      if(!ifUserExists.id) return res.status(400).json({message:`Cannot delete user: ${req.params.id}. User does not exist`})

      const deletedUserIndex = users.indexOf(ifUserExists)
      users.splice(deletedUserIndex, 1)
      return res.status(200).json({message: `User: ${ifUserExists.name} successfully deleted`})
   }
}