const { expressjwt: expressJwt } = require('express-jwt');


function verifyToken() {
// console.log('middleware executed!');
    return expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256']
    })
    .unless({
        path: [
            '/users/login',
            '/users/signup'
        ]
    });
}


module.exports = verifyToken;