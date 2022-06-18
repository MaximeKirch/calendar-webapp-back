const user = require('../models/user')
const User = require('../models/user')
const mongoose = require('mongoose')

exports.getOneUser = (req,res,next) => {
    User.findOne({
        _id : req.params.id
    }).select('-password').then(
        (user) => {
            res.status(200).json({user})
        }
    ).catch(error => {
        res.status(400).json({error : error})
    })
}

exports.modifyUser = (req,res,next) => {
    User.findOne({_id : req.params.id}).then(
        (user) => {
            if(!user) {
                res.status(404).json({error : "Unknown user !"})
            }
            if(user.id !== req.auth.userId) {
                return res.status(401).json({
                    error :  "Requête non autorisée" //new Error("Requête non autorisée.")
                })
            }
            User.findOne({_id:req.params.id}).then(
                (user) => {
                    if(!user) {
                        res.status(404).json({
                            error : new Error('No such user !')
                        })
                    }
                    if(user.id !== req.auth.userId) {
                        res.status(400).json({ 
                            error : new Error('Unauthorized request !')
                        })
                    }
                    const userUpdate = new User({
                        _id: req.params.id,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                    })
                    User.findByIdAndUpdate({_id : req.params.id}, userUpdate)
                    .then(() => {
                        res.status(201).json({
                            message: 'User updated successfully !'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        })
                    }
                )
                }
            )
        }
    )
 
}

exports.deleteUser = (req,res, next) => {
    User.findOne({_id : req.params.id}).then(
        (user) => {
            if(!user) {
                res.status(404).json({ error : 'Unknown user !'})
            }
            console.log(user._id)
            if(user.id !== req.auth.userId) {
                return res.status(401).json({
                    error : 'Requête non autorisée.'
                })
            }
            User.findOne({ _id : req.params.id}).then(
                (user) => {
                    if(!user) {
                        res.status(404).json({
                            error : new Error('No such User !')
                        })
                    }
                    if(user.id !== req.auth.userId) {
                        res.status(401).json({
                            error : new Error("Unauthorized request !")
                        })
                    }
                    User.deleteOne({ _id : req.params.id}).then(
                        () => {
                            res.status(200).json({
                                message : "Deleted !"
                            })
                        }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error : error
                            })
                        }
                    )
                }
            )
        }
    )
    
}

exports.getAllUsers = (req,res,next) => {
    User.find().select('-password')
        .then(
            (users) => {
                res.status(200).json(users)
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                })
            }
        )
}