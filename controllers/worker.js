const Worker = require('../models/worker')
const mongoose = require('mongoose')

exports.getAllWorkers = (req, res, next) => {
    Worker.find().select('-password').then(
        (workers) => {
            res.status(200).json({workers})
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            })
        }
    )
}

exports.getOneWorker = (req, res, next) => {
    Worker.findOne({
        _id: req.params._id
    }).select('-password').then(
        (worker) => {
            res.status(200).json({worker})
        }
    ).catch(error => {
        res.status(400).json({error:error})
    })
}

exports.modifyWorker = (req, res, next) => {
    Worker.findOne({_id : req.params.id}).then(
        (worker) => {
            if(!worker) {
                res.status(404).json({
                    error: 'Worker not found'
                })
            }
            Worker.findOne({_id:req.params.id}).then(
                (worker) => {
                    if(!worker) {
                        res.status(404).json({
                            error : new Error('No such worker')
                        })
                    }
                    if(worker.id !== req.auth.userId) {
                        res.status(401).json({
                            error: new Error('Unauthorized request !')
                        })
                    }

                    const workerUpdate = new Worker({
                        _id: req.params.id,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                    })
                    Worker.findByIdAndUpdate({_id : req.params.id}, workerUpdate)
                    .then(() => {
                        res.status(201).json({
                            message: 'Worker updated successfully'
                        })
                    }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error:error
                            })
                        }
                    )
                }
            )
        }
    )
}

exports.deleteWorker= (req,res, next) => {
    Worker.findOne({_id : req.params.id}).then(
        (user) => {
            if(!user) {
                res.status(404).json({error: 'Unknown worker'})
            }
            if(Worker.id !== req.auth.userId ) {
                return res.status(401).json({
                    error: 'Requête non autorisée'
                })
            }
            Worker.findOne({_id : req.params.id}).then(
                (worker) => {
                    if(!worker) {
                        res.status(404).json({
                            error : new Error('No such worker !')
                        })
                    }
                if(worker.id !== req.auth.userId) {
                    res.status(401).json({
                        error : new Error('Unauthorized request !')
                    })
                }
                Worker.deleteOne({_id : req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message: "Deleted worker !"
                        })
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