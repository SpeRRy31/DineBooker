const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Перевірка існування каталогу і його створення
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, 'image-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
