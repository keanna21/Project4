const Post = require('../models/post');

const BUCKET = process.env.BUCKET

module.exports = {
    create,
    index
}

function create(req, res){
    res.json({data: 'working'})
}

async function index(req, res){
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){

    }
}