const Post = require('../models/post');

const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
const { v4: uuidv4 } = require('uuid');

const BUCKET = process.env.BUCKET

module.exports = {
    create,
    index
}

function create(req, res){

   console.log(req.body, req.file)
   const filePath = `traveltales/${uuidv4()}-${req.file.originalname}`
  const params = {Bucket: BUCKET, Key: filePath, Body: req.file.buffer};  

  s3.upload(params, async function(err, data){
    if(err){
        console.log('===========================================')
			console.log(err, ' err from aws, either your bucket name is wrong or your keys arent correct');
			console.log('===========================================')
			res.status(400).json({error: 'Error from aws, check your terminal!'})
    }
    try{
        const post = await Post.create({
            caption: req.body.caption,
            user: req.user,
            photoUrl: data.Location
        })

        await post.populate('user')
        
        res.status(201).json({data: post})
    }catch(err){
        res.status(400).json({error: err})
    }
  })
    
    // res.json({data: 'working'})
}

async function index(req, res){
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){

    }
}