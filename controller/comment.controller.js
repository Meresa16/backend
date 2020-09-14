const commentModel = require('../model/comment.model'),
    ObjectId=require('mongoose').Types.ObjectId,
    //userModel = require('../model/user')
    mongoose = require('mongoose'),
    User = require('../model/user'),
    express = require('express')

module.exports.create = create
module.exports.get_all_comment = get_all_comment
module.exports.get_comment = get_comment
module.exports.delete_comment = delete_comment
module.exports.update_comment = update_comment

function create(req, res, next) {
    const comment = new commentModel({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
    });
    comment
        .save()
        .then(doc => {
            console.log(doc);
            return res.status(200).json({
                document: {
                    description: doc.description,
                    _id: doc._id,
                    email: doc.user,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/comment/" + doc._id
                    }
                },
            })
        })
        .catch(err => {
            next(err)
        })
}
function get_all_comment(req, res, next) {
    commentModel.find()
       // .select('description user _id')
       // .populate('User',)
        .exec()
        .then(doc => {
            if (!doc) {
                res.json({
                    message: "data is not found"
                });
            }
            else {
                console.log(doc)
                res.json({
                    count: doc.length,
                   
                    document: doc.map(data => {
                        return {
                            _id: data._id,
                            description: data.description,
                            createdAt: data.createdAt,
                            //email: data.user,
                            request: {
                                type: "GET",
                                url: "http://localhost:3000/comment/" + data._id
                            }
                        }
                    }),
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                message: " there is an error "
            })
        });
}
function get_comment(req, res, next) {
     if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given Id: ${req.params.id}`) ;
    commentModel.findById(req.params.id)
        .then(doc => {
            if (!doc) {
                res.json({
                    message: "id is not found"
                })
            }
            console.log(doc);
            res.json({
                data: {
                    description: doc.description,
                    _id: doc._id,
                    createdAt: doc.createdAt,

                    request: {
                        type: "GET",
                        description: "click the link to get all comment ",
                        url: "http://localhost:3000/comment"
                    }
                }
            });

        })
        .catch(err => {
            res.json({
                message: "There is problem on the entering of id "
            })
        });
}

function update_comment(req, res, next) {
     if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given Id: ${req.params.id}`); 
    var coment = {
        description: req.body.description
    };
    commentModel.findByIdAndUpdate(req.params.id, { $set: coment }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log("error in recording comment" + json.strinify(err, undefined, 2))
        }
    });
}

function delete_comment(req, res, next) {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given Id: ${req.params.id}`); 
    commentModel.findByIdAndRemove(req.params.id)
        .then(doc => {
            if (!doc) {
                res.json({
                    message: "data is not found"
                })
            }
            console.log(doc);
            res.json({
                message: "successfully deleted",
                request: {
                    type: "POST",
                    body: "description",
                    url: "http://localhost:3000/comment"
                }
            });
        })
        .catch(err => {
            res.json({
                message: "there is problem on the system"
            })
        });
}

