const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

exports.signup = (req, res, next) => {
  console.log(req.body)
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((err) => res.status(400).json({ err }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé ! ' })
      }
      bcrypt
        .hash(password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          res
            .status(200)
            .cookie(
              'jwt',
              jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
                expiresIn: '24h',
              }),
            )
            .json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
                expiresIn: '24h',
              }),
            })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.logout = (req,res,next) => {
  res.clearCookie('jwt').json({message : "You have been logged out successfully"})
  .catch((error) => res.status(400).json({error}))
}
