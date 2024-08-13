import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'


export const requireLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Login token required' })
    }
    const token = authorization.split(' ')[1]

    try {
        const { _id, firstName } = jwt.verify(token, process.env.SECRET_KEY)

        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}
