

const jwt=require('jsonwebtoken')


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, "secret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
         res.sendStatus(401);
        console.log("authetication failed")
    }
};

module.exports=authenticateJWT;