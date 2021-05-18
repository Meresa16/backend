
const NewsModel = require('../model/news.model'),
    ObjectId = require('mongoose').Types.ObjectId,
    mongoose = require('mongoose');


exports.newsCreate = (req, res) => {
    const { tittle, description } = req.body;
    const news = new NewsModel({
        _id: new mongoose.Types.ObjectId(),
        tittle,
        description
    });
    news
        .save()
        .then(data => {
            //console.log(data)
            res.status(200).json({
                message: 'news created successfully',
                createdNews: {
                    id:data._id,
                    tittle: data.tittle,
                    description: data.description
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err,
                message: 'somthing went wrong'
            })
        })
}
exports.getNews = (req, res) => {
    NewsModel.find()
        .then(docs => {
            if (docs.length < 1) {
                res.status(400).json({
                    message: "there was no recently posts news."
                })
            }
            else {
                res.status(200).json({
                    data: docs.length,
                    docs
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                message: "there was somthing wrong"
            })
        })
}
exports.singleNews = (req, res) => {
    if (!ObjectId.isValid(req.params.newsId))
        return res.status(400).send(`No record with given Id: ${req.params.newsId}`);
    NewsModel.findById(req.params.newsId)
        .then(data => {
            if(data){
            res.status(200).json({
                data
            })
        }else{
           res.status(500).json({
               message:"data is not found"
           }) 
        }
        })
        .catch(err => {
            res.status(400).json({
                message: "err",
                Error: err
            })
        })
}
exports.updateNews = (req, res) => {
    if (!ObjectId.isValid(req.params.newsId))
        return res.status(400).send(`No record with given Id: ${req.params.newsId}`)
    const news = {
        tittle: req.body.tittle,
        description: req.body.description
    };
    NewsModel.findByIdAndUpdate(req.params.newsId, { $set: news }, { new: true }, (err, doc) => {
        if (doc) {
            res.status(200).json({
                message:"news successfully updated",
               // message: `This news id ${newsId} was successfully updated`,
                updated: {
                    tittle: doc.tittle,
                    description: doc.description,
                    updatedAt: doc.updatedAt,
                    createdAt: doc.createdAt
                }
            })
        }
        else {
            console.log("error in recording comment" + json.strinify(err, undefined, 2))
        }
    })
}
exports.newsDelete=(req,res)=>{
    if(!ObjectId.isValid(req.params.newsId))
    return res.status(400).send(`No record with given Id: ${req.params.newsId}`)
NewsModel.findByIdAndRemove(req.params.newsId)
.then(data=>{
    if(data){
    res.status(200).json({
        message:"successfully deleted",
        request:{
            type:"GET",
        }
    })
}else{
    res.status(400).json({
        message:"already deleted or data is not found"
    })
}
})
.catch(err=>{
    return err;
})
}