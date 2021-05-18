const orderModel = require('../model/order.model'),
    productModel = require('../model/product.model'),
    mongoose = require('mongoose');

module.exports.get_order = get_order
module.exports.create_order = create_order
module.exports.get_order_single = get_order_single
module.exports.order_delete = order_delete


function get_order(req, res, next) {
    orderModel.find()
        .select('qauntity _id')
        .populate('product')
        .exec()
        .then(result => {
            //console.log(result)
            res.status(200).json({
                count: result.length,
                order: result.map(data => {
                    return {
                        order_id: data._id,
                        qauntity: data.qauntity,
                        product_id: data.product,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + data._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        });
    /*  res.status(200).json({
         message: "hanndling GET request "
     }); */
}
function create_order(req, res, next) {
    productModel.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "product not found"
                });
            }
            const order = new orderModel({
                _id: new mongoose.Types.ObjectId(),
                qauntity: req.body.qauntity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "order stored successfuly",
                created_Order: {
                    _id: result._id,
                    product: result.product,
                    qauntity: result.qauntity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(201).json({
                message: "product is not found",
                error: err
            });
        });
}
function get_order_single(req, res, next) {
    if (!ObjectId.isValid(req.params.orderId))
        return res.status(400).send(`No record with given Id: ${req.params.orderId}`);
    orderModel.findById(req.params.orderId)
        // .exec()
        .populate('product')
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: " order id is not found"
                });
            }
            console.log(result);
            res.status(200).json({
                //count: result.length,
                Order: result,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders"
                }
            });
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
}
function order_delete(req, res, next) {
    if (!ObjectId.isValid(req.params.orderId))
        return res.status(400).send(`No record with given Id: ${req.params.orderId}`);
    orderModel.remove(req.body.orderId)
        .exec()
        .then(result => {
            res.status(200).json({
                message: "order deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/orders",
                },
                body: {
                    productId: "Enter Id of the product &",
                    qauntity: "Number"
                }
            });
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        });
}