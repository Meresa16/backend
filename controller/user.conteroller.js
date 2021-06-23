const express = require('express'),
    User = require('../model/user'),
    bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken')

module.exports.regster = regster
module.exports.login = login
module.exports.profile = profile
module.exports.changepassword = changepassword

function regster(req, res, next) {
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length >= 1) {
                return res.status(409).json({
                    mesage: "mail exists"
                });
            }

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(400).json({
                        mesage: 'there is an error'
                    });
                }
                else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: hash
                    });
                    user
                        .save()
                        .then((doc) => {
                            console.log(doc);

                            res.json({
                                document: doc,
                            })
                        })
                        .catch(err => {
                            next(err)
                        });
                }
            })
        })
}
function login(req, res, next) {
    User.find({ email: req.body.email })
        // .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    mesage: "internal problem"
                });
            }
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            mesage: "auth failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            mesage: " auth succefully",
                            token: token
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

function changepassword(req, res, next) {
    const { email } = req.body;
    User.findOne({ email })
        .then(user => {
            if (err || user.length < 1) {
                return res.status({
                    mesage: "auth failed"
                });
            }
            else {
                bcrypt.hash(req.body.password, password, (err, hash) => {
                    if (err) {
                        return res.status(404).json({
                            mesage: "auth failed"
                        })
                    }
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                error: err,
                mesage: "there is an error on chnging password"
            })
        });
}

function profile(req, res, next) {
    return User.findOne({ _id: user.id }, (err, userObj) => {
        if (!userObj) {
            return next({ status: 401, message: 'User does not exists.' });
        }

        if (req.body.password && req.body.new_password) {
            return bcrypt.compare(req.body.password, userObj.password, (error, result) => {
                if (!result || error) {
                    return next(
                        {
                            status: 401,
                            message: 'Authentication failed. Wrong password.',
                        },
                    );
                }

                return bcrypt.hash(req.body.new_password, null, null, (hashErr, hash) => {
                    userObj.password = hash;

                    const response = {
                        _id: userObj._id,
                        firstname: userObj.firstname,
                        lastname: userObj.lastname,
                        email: userObj.email,
                        createdDate: userObj.createdDate,
                    };

                    return userObj.save(() => res.status(200).json(response));
                });
            });
        }

        userObj.firstname = req.body.firstname || userObj.firstname;
        userObj.lastname = req.body.lastname || userObj.lastname;
        userObj.email = req.body.email || userObj.email;

        const response = {
            _id: userObj._id,
            firstname: userObj.firstname,
            lastname: userObj.lastname,
            email: userObj.email,
            createdDate: userObj.createdDate,
        };

        return userObj.save(() => res.status(200).json(response));
    });
}

