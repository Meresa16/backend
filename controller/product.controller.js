const productModel = require('../model/product.model'),
    mongoose = require('mongoose');
ObjectId = require('mongoose').Types.ObjectId

exports.getProducts = (req, res, next) => {
    productModel.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            // console.log(doc);
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/product/' + doc._id
                        }

                    }
                })
            };
            /* if (doc.length >= 0) { */
            res.status(200).json(response);
            /*  } else {
                 res.status(404).json({
                     message: "no entris data found"
                 });
             } */
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                //message: 'handling get request to product',
                error: err
            })
        });
}
exports.createProduct = (req, res, next) => {
    const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        image:req.file.path
    });
    product
        .save()
        //.exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'created product succssefully',
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    image:result.image,
                   
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/product/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: "there is no such file "
            })
        });

}
exports.getProdut = (req, res, next) => {
    //const id = req.params.productId;
    if (!ObjectId.isValid(req.params.productId))
        return res.status(400).send(`No record with given Id: ${req.params.productId}`);

    productModel.findById(req.params.productId)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("from the data base documents to our console display", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET",
                        description: 'get all product',
                        url: 'http://localhost:3000/api/product/'
                    }
                });
            }
            else {
                res.status(404).json({ message: "invalid entry id" });
            }
            res.status(200).json({ doc });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
exports.editProduct = (req, res, next) => {
    //const id = req.params.productId;
    // if (!ObjectId.isValid(req.params.productId))
    //   return res.status(400).send(`No record with given Id: ${req.params.productId}`);
    /*   const updateOps = {};
      for (const ops of req.body) {
          updateOps[ops.proName] = ops.value;
      }
  
      productModel.update({ _id: req.params.productId }, { $set: updateOps })
          .exec()
          .then(result => {
              //console.log(result);
              res.status(200).json(
                  {
                      message: 'updated product',
                      request: {
                          type: 'GET',
                          url: 'http://localhost:3000/product/' + id
                      }
                  }
              );
              // message: 'updated product',)
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({
                  // message: 'updated product',
                  error: err
              });
          }); */
    if (!ObjectId.isValid(req.params.productId))
        return res.status(400).send(`No record with given Id: ${req.params.productId}`);
    var product = {
        name: req.body.name,
        price: req.body.price
    };
    productModel.findByIdAndUpdate(req.params.productId, { $set: product }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log("error in recording comment" + json.strinify(err, undefined, 2))
        }
    });
}
exports.deleteProduct = (req, res, next) => {
    // const id = req.params.productId;
    if (!ObjectId.isValid(req.params.productId))
        return res.status(400).send(`No record with given Id: ${req.params.productId}`);
    productModel.remove({ _id: req.params.productId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "product deleted",
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/api/product',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}