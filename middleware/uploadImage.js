const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

let uploadImage = (folder) => {
    const storage = multer.diskStorage({
        destination: `./public/images/${folder}`,
        filename: function (req, file, cb) {
          let extension = file.originalname.slice(file.originalname.lastIndexOf("."), file.originalname.length);
          console.log(extension);
          cb(null, uuidv4() + extension);
        },
      });
      const upload = multer({ storage: storage }).single("img");
      return upload;
};

module.exports = uploadImage;
  
  