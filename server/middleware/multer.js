const multer = require('multer');

// set storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
		// Get file extension name
	    let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
		
		// Generate random file name
		let filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + ext;
		
		// Set file name
		cb(null, filename);
  }
})

store = multer({storage: storage});
module.exports = store;