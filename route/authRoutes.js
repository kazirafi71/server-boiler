const { registerController, loginController } = require('../controllers/authController')
const requireLogin = require('../middleware/requireLogin')

const router=require('express').Router()




router.post('/register',registerController)

router.post('/login',loginController)

router.get('/hello',requireLogin,(req,res)=>{
    
    res.send('hello')
})


module.exports=router