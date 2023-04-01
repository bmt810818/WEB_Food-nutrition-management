const express = require('express');
const { requireAuth, logout } = require('../middleware/auth');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const Schema = require('../models/UserSchema');
const Login = require('../controllers/Login');
const hash = require('object-hash');
const admin= require('../controllers/adminController');
const allItem= require('../controllers/AllController');
const adminAuth = require('../middleware/authAdmin');

/**
 * App Routes
 */
 //router.get('',recipeController.navbar);
router.get('/', requireAuth,recipeController.homepage);
router.get('/mymeal/:id', recipeController.mealHome);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.get('/recipe/:id', recipeController.exploreRecipe );
router.post('/search', recipeController.searchRecipe );
router.get('/signup', recipeController.signUp);
router.post('/signup', recipeController.AfterSignUp);
router.get('/bmr-build/',recipeController.brmCalculateHomePage );
router.get('/bmr/:id',recipeController.brmCalculate );
router.post('/bmr-build',recipeController.brmCalculateResult );
router.get('/login/', Login.login);
router.post('/login/', Login.logIn);
router.get('/logout', logout);
router.post('/FoodIndex', recipeController.AddFood);
router.post('/FoodRemove', recipeController.DeleteFood);
router.get('/submit-recipe/:id' , recipeController.submitRecipe);  
router.post('/submit-recipe/:id', recipeController.submitPostRecipe);
// admin 
router.get('/admin',adminAuth.auth ,adminAuth.adminAuth, admin.Admin);
router.get('/admin/update/:id',admin.UpdateFood);
router.post('/update/:id', admin.UpdateFoodOne);
router.post('/AdminDelete', admin.DeleteAdminFood);
router.get('/submit-recipeadmin', admin.CreateFood);
router.post('/submit-recipeadmin', admin.CreateFoodPost);
router.post('/save-meal/:id' , recipeController.AddMeal);
router.post('/save-meal-sang' , recipeController.AddMealSang);
router.get('/unfind',recipeController.unFind);
router.get('/admin/user', adminAuth.auth ,adminAuth.adminAuth, admin.user);

// router.post('/signup', (req,res)=>{
//   Schema.find({}, (err,data)=>{
//     for(let i=0;i<data.length;i++){
//       if(req.body.username.toLowerCase()=== data[i].username.toLowerCase()){
//           //res.redirect('/loginalreadytaken')
//           res.status(200).send({
//             message:'error'
//           })
//           return
//       }
//     }
//     Schema.updateMany({status:'Active'},{status:'not active'}, {new:true}, (err,userInfo)=>{
//       const body = {
//         name:req.body.name,
//         username:req.body.username.toLowerCase(),
//         status:req.body.status,
//         password:hash(req.body.password)
//       }
//     Schema.create(body, (err,data)=>{
//       console.log(body)
//     // res.redirect('/bmr-build');
//      res.status(400).json({
//       done:'done'
//      })
//   })
//   })
// })
//   })

module.exports = router;