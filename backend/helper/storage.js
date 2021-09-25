const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb){
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        cb(null, fileName)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    allowedTypes.includes(file.mimeType) ? cb(null, true) : cb(null, false);
}

// const storage = multer({storage: diskStorage, fileFilter: fileFilter}).single('image');
const storage = multer({storage: diskStorage});

module.exports = storage;
