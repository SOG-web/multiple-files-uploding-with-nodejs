const UploadModel = require('../model/schema');
const fs = require('fs');

exports.home = async (req,res) => {
	const all_images = await UploadModel.find()
	res.render('main',{images: all_images});
}

exports.uploads = (req,res, next) => {
    const files = req.files;
	
	if(!files){
		const error = new Error('Please choose files');
		error.httpStatusCode = 400;
		return next(error);
	}
	
	// convert all image to base64
	let imgArray = files.map((file) => {
		let img = fs.readFileSync(file.path);
		return encode_img = img.toString('base64')
	})
	
	let result = imgArray.map((src, index) => {
		let finalImg = {
			filename: files[index].filename,
			contentType: files[index].mimetype,
			imageBase64: src
		}
		
		let newUpload = new UploadModel(finalImg);
		return newUpload.save().then(() => {
			// console.log(files[index]);
			return {msg: `Successful ${files[index].originalname}`}
		}).catch(err => {
			return {err: err}
		})
	})
	
	Promise.all(result)
	.then(msg => {
		// res.redirect('/')
		res.json(msg)
	})
	.catch(err => {
		res.json(err)
	})
}