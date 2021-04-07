const { count } = require('../model/biller.model');
const billerModel = require('../model/biller.model');
mongoose = require('mongoose');
ObjectId = require('mongoose').Types.ObjectId

exports.getaggregate = (req, res, next) => {
    const fromDate = req.query.fromDate,
        toDate = req.query.toDate;
    //biller_id = req.query.biller_id;
    billerModel.aggregate([
        { $match: { "payment_status.paid_dt": { "$gte": new Date(fromDate), "$lte": new Date(toDate) } } },
        {
            $group: {
                _id: {
                    Biller_name: "$biller_name",
                    biller_id: "$biller_id",
                },
                count: { "$sum": 1 },
                Total_amount: { $sum: "$payment_status.paid_amount", },
            },
        },
        { $sort: { count: -1 } },
    ],
        function (err, result) {
            //  console.log(result);
            if (result.length < 1) {
                return res.status(400).json({
                    message: `Paid bill is not found from ${fromDate} To ${toDate}`,
                });

            }
            else {
                res.status(200).json({
                    count: result.length,
                    "count billers list and total paid amount ": result
                })
            }
        }
    );
}
exports.getunpaid = (req, res, next) => {
    const fromDate = req.query.fromDate,
        toDate = req.query.toDate;
    //biller_id = req.query.biller_id;
    billerModel.aggregate([
        { "$match": { payment_status: null, created_at: { "$gte": new Date(fromDate), "$lte": new Date(toDate) } } },
        {
            $group: {
                _id: {
                    Biller_name: "$biller_name",
                    biller_id: "$biller_id",
                },
                count: { "$sum": 1 },
            }
        },
        { $sort: { count: -1 } },
    ],
        function (err, result) {
            //console.log(result);
            if (err) {
                Error: err
            }
            if (result.length < 1) {
                return res.status(400).json({
                    message: `There was no paid bill starting from: ${fromDate} To ${toDate}`,
                })
            }
            else {
                res.status(200).json({
                    count: result.length,
                    un_paid_billers_list: result
                })
            }
        }
    );
}
/* exports.getOneunPaidBiller = (req, res, next) => {
    const fromDate = req.query.fromDate,
        toDate = req.query.toDate;
    // biller_id = req.query.biller_id;
    billerModel.aggregate([
        { "$match": { biller_id: req.query.biller_id, payment_status: null, created_at: { "$gte": new Date(fromDate), "$lte": new Date(toDate) } } },
        {
            $project: {
                _id: 1,
                biller_id: 1,
                created_at: 1,
                biller_id: 1,

                count: { "$sum": 1 },
                //Total_amount: { $sum: "$payment_status.paid_amount", },
            }

        },
        { $sort: { count: -1 } },
    ],
        function (err, result) {
            //  console.log(result);
            res.status(200).json({
                count: result.length,
                un_paid_biller: result
            })
        }
    );
} */
exports.getAllunPaid = (req, res, next) => {
    const fromDate = req.query.fromDate,
        toDate = req.query.toDate;
    //biller_id = req.query.biller_id
    billerModel.aggregate([
        { "$match": { payment_status: null, created_at: { "$gte": new Date(fromDate), "$lte": new Date(toDate) } } },
        {
            $group: {
                "_id": `Totall un paid billers starting from:- ${fromDate} To ${toDate}`,
                "Total unpaid bills count": { "$sum": 1 },

            }
        },
    ],
        function (err, result) {
            //console.log(result);
            if (err) {
                Error: err
            }
            if (result.length < 1) {
                return res.status(400).json({
                    message: `There was no paid bill starting from: ${fromDate} To ${toDate}`,
                })
            }
            else {
                res.status(200).json({
                    result
                })
            }
        }
    );
}
exports.getBillers = (req, res, next) => {
    const fromDate = req.query.fromDate,
        toDate = req.query.toDate;
    billerModel.find({ "payment_status.paid_dt": { "$gte": new Date(fromDate), "$lte": new Date(toDate) } })
        .then(docs => {
            const response = {
                //count: docs.biller_id.length,
                "paid_billers":
                    docs.map(doc => {
                        return {
                            biller_id: doc.biller_id,
                            biller_name: doc.biller_name,
                            paid_amount: doc.payment_status.paid_amount
                        }
                    })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}
exports.getBiller = (req, res, next) => {
    const fromDate = req.query.fromDate,
        toDate = req.query.toDate,
        biller_id = req.query.biller_id;
    billerModel.find({ biller_id, "payment_status.paid_dt": { "$gte": new Date(fromDate), "$lte": new Date(toDate) } })
        .then(docs => {
            if (docs.length < 1) {
                return res.status(400).json({
                    message: `There was no found bills paid by ${biller_id} starting from: ${fromDate} To ${toDate}`,
                })
            } else {
                const response = {
                    count_doc: docs.length,
                    "paid_billers1":
                        docs.map(doc => {
                            return {
                                doc
                            }
                        })
                };
                res.status(200).json(response);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}
exports.getCreatedDate = (req, res, next) => {
    const createdDate = req.query.createdDate,
        //toDate = req.query.toDate,
        biller_id = req.query.biller_id;
    billerModel.find({ biller_id, payment_status: null, created_at: new Date(createdDate) })
        .then(docs => {
            const response = {
                count_doc: docs.length,
                "created date list":
                    docs.map(doc => {
                        return {
                            doc
                        }
                    })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}
exports.getOneUnpaidBiller = (req, res, next) => {
    const fromDate = req.query.fromDate,
        toDate = req.query.toDate,
        biller_id = req.query.biller_id;
    billerModel.find({ biller_id, payment_status: null, created_at: { "$gte": new Date(fromDate), "$lte": new Date(toDate) } })
        .then(docs => {
            if (docs.length < 1) {
                return res.status(400).json({
                    message: `There was no found bills unpaid by ${biller_id} starting from: ${fromDate} To ${toDate}`,
                })
            }
            else {
                const response = {
                    count_doc: docs.length,
                    "paid_billers1":
                        docs.map(doc => {
                            return {
                                document: doc
                            }
                        })
                };
                res.status(200).json(response);
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}
/* exports.getCreatedDate = (req, res, next) => {
    const createdDate = req.query.createdDate,
        biller_id = req.query.biller_id;
    billerModel.find({ biller_id, payment_status: null, created_at: new Date(createdDate) })
        .then(docs => {
            const response = {
                count_doc: docs.length,
                "created date list": docs.map(doc => {
                    return {
                        doc
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
} */
exports.updateBillers = (req, res) => {
    const fromDate = req.query.fromDate,
        toDate = req.query.toDate;
    var data = {
        //bill_amount_due: req.body.bill_amount_due,
        bill_due_dt: req.body.bill_due_dt
    };
    billerModel.updateMany({
        biller_id: req.query.biller_id, payment_status: null,
        created_at: { "$gte": new Date(fromDate), "$lte": new Date(toDate) }
    },
        { $set: data }, { new: true }, (err, doc) => {
            if (!err) {
                res.status(200).json({
                    doc
                });
                console.log(doc);
            }
            else {
                console.log('Error in biller amount Update :' + JSON.stringify(err, undefined, 2));
            }
        })
}

