const db = require('../models/UserSchema');


exports.auth = (req,res,next)=>{
  if (req.session && req.session.user) { // kiểm tra nếu người dùng đã đăng nhập
    next();
  } else {
    res.render('login'); // chuyển hướng về trang đăng nhập nếu chưa đăng nhập
  }
}

exports.adminAuth = (req, res, next) => {
try {
  const userId = req.cookies.username;
  db.find({username: userId }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Authentication failed!" });
    }
    
   if(user[0].role==0){
    return res.status(401).json({ message: "Authentication failed!" });
   }
   else
   {
    next();
   }
  });
} catch (error) {
  res.status(401).json({ message: "Authorization failed!" });
}

};
