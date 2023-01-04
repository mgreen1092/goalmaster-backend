const admin = require('./database/firebaseConfig')

class Middleware {
    async authenticate(req, res, next) {
        let token
        if (req.headers.authorization) {
            console.log(req.headers)
            token = req.headers.authorization.split(' ')[1]
        } else {
            return res.status(401).json({ message: 'No authentication provided' })
        }
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                req.user=decodeValue
                return next()
            }
            return res.status(401).json({ message: 'Unauthorized' })
        } catch (err) {
            return err.code === 'auth/argument-error'
                ? res.status(401).json({ message: err.message })
                : res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}

module.exports = new Middleware()