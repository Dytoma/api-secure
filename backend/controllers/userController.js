import { User } from '../models/user.js'
import crypto from 'crypto'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const getHash = (pwd) => {
    const hashPwd = crypto.createHash('sha1').update(pwd).digest('hex')

    return String(hashPwd)
}

const createToken = (_id, firstName) => {
    return jwt.sign({ _id, firstName }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

// Valider les données
const checkCredentials = (emailAddress, password) => {
    if (!emailAddress || !password) {
        throw Error('All fields must not be empty')
    }
    if (!validator.isEmail(emailAddress)) {
        throw Error('Email is invalid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not Strong enough')
    }
}

// Enregistrer un nouveau utilisateur
export const registerUser = async (req, res) => {
    const { firstName, lastName, emailAddress, password } = req.body
    const pwd = getHash(password)
    const exist = await User.findOne({ emailAddress })

    if (exist) {
        return res.status(400).json({ error: 'Email already in use' })
    }
    console.log(firstName, lastName, emailAddress, password)
    if (!firstName) {
        return res.status(400).json({ error: 'First Name must be filled' })
    }
    try {
        checkCredentials(emailAddress, password)
        const user = await User.create({ firstName, lastName, emailAddress, password: pwd })
        const token = createToken(user._id, user.firstName)

        res.status(200).json({ _id: user._id, firstName, lastName, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Authentifier un utilisateur dans la base de donnée
export const loginUser = async (req, res) => {
    const { emailAddress, password } = req.body
    try {
        if (!emailAddress || !password) {
            return res.status(404).json({ error: 'All fields must be filled' })
        }
        const user = await User.findOne({ emailAddress: emailAddress })

        if (!user) {
            return res.status(404).json({ error: 'Incorrect email' })
        }
        if (getHash(password) !== user.password) {
            return res.status(400).json({ error: 'The password is incorrect.' })
        }
        const token = createToken(user._id, user.emailAddress)

        res.status(200).json({ _id: user._id, firstName: user.firstName, lastName: user.lastName, emailAddress, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Changer les coordonnées d'un utilisateur
export const updateUser = async (req, res) => {
    const { _id, firstName, lastName, emailAddress, password, newPassword } = req.body
    let newUser = null

    try {
        if (!firstName || !emailAddress || !password || !lastName) {
            return res.status(404).json({ error: 'All fields must be filled' })
        }
        const user = await User.findOne({ _id })
        
        if (!user) {
            return res.status(404).json({ error: 'User doesn\'t exit' })
        }
        if (getHash(password) !== user.password) {
            return res.status(400).json({ error: 'The password is incorrect.' })
        }
        if (newPassword) {
            checkCredentials(emailAddress, newPassword)
            newUser = await User.findOneAndUpdate({ _id }, { firstName, lastName, emailAddress, password: getHash(newPassword) })
        } else {
            checkCredentials(emailAddress, password)
            newUser = await User.findOneAndUpdate({ _id }, { firstName, lastName, emailAddress})
        }
        const updatedUser = await User.findOne({_id})
        const token = createToken(updatedUser._id, updatedUser.emailAddress)

        res.status(200).json({ _id: updatedUser._id, firstName: updatedUser.firstName, lastName: updatedUser.lastName, emailAddress: updatedUser.emailAddress, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Supprimer un utilisateur de la database
export const deleteUser = async (req, res) => {
    const { _id } = req.body
    try {
        const user = await User.findOneAndDelete({ _id })

        if (!user) {
            return res.status(404).json({ error: 'User doesn\'t exit' })
        }

        res.status(200).json({ message: "User deleted successfully!" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Recupérer tous les utilisateurs enregistrés
export const getUsers = async (req, res) => {
    const users = await User.find({}).select('_id firstName lastName').sort({ createdAt: -1 })

    res.status(200).json(users)
}
