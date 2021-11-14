const jwt = require('jsonwebtoken');
function validateUser(req,res,next){
    const token = req.cookies.studentcookie;
    if(!token) return res.status(401).redirect('/api/users/login');

    try {
        const decoded = jwt.verify(token, process.env.authorisationToken); 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send('Invalid token');                                               
    }
}

module.exports = validateUser;