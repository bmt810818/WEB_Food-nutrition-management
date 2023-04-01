const { render } = require('ejs');
const Schema = require('../models/UserSchema');
const hash = require('object-hash');
const cookie = require('cookie-parser');


exports.login = async(req, res)=>{  
        res.render('login', {title: "Login Meal-Planner"});        
}
exports.logIn = async(req, res) =>{
  const password = hash(req.body.password); 
  let username = "username";
  const name = req.body.username.toLowerCase();
  const user = await Schema.find({'username': name});
  if (!user || password !== user[0].password) {
    // Nếu thông tin đăng nhập không chính xác, hiển thị lại trang đăng nhập
    res.render('login', { error: 'Thông tin đăng nhập không chính xác' });
    
  } else 
  {
    const update = { $set: { status: "Active" } };
   await Schema.findOneAndUpdate({'username': name}, update);
    res.cookie(username, req.body.username.toLowerCase());   
    req.session.user = { name };         
    res.redirect('/'); 
  }
    // Schema.find({}, (err,data)=>{
    //     for(let i=0; i<data.length;i++){
    //       if(req.body.username.toLowerCase()=== data[i].username.toLowerCase()){
    //         Schema.updateMany({status:'Active'}, {status:'not active'}, {new:true}, (err,userInfo)=>{
    //           Schema.findOneAndUpdate({username:req.body.username.toLowerCase()}, {status:'Active'}, {new:true}, (err,active)=>{
    //             // res.redirect(`/Nutrition/${active._id}/`)                             
    //                  if(password === data[i].password){  
    //                   res.cookie(username, req.body.username.toLowerCase());      
    //                   req.session.user = { username };            
    //                   return res.redirect('/');                  
    //                  }else {
    //                   // Nếu thông tin đăng nhập không chính xác, hiển thị lại trang đăng nhập
    //                   res.render('login', { error: 'Thông tin đăng nhập không chính xác' });
    //                 }              
    //           })
    //         })
    //       }
    //     }
    //   })
}
// exports.logout = async(req, res) =>{
//     Schema.find({}, (err,data)=>{      
//       let username = "username";
//           // if(req.body.username.toLowerCase()=== data[i].username.toLowerCase()){
//           //   Schema.updateMany({status:'not active'}, {status:'Active'}, {new:true}, (err,userInfo)=>{
//           //     Schema.findOneAndUpdate({username:req.body.username.toLowerCase()}, {status:'no active'}, {new:true}, (err,active)=>{
//           //    console.log(data[i].username);
//           //     //  res.redirect('/');
//           //   //    return
//           //     })
//           //   })
//           // }    
//           console.log(req.body.username)   
//       })
// }
