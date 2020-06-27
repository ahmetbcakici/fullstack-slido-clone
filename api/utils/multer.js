import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/images');
    },
    filename: function (req, file, cb) {
      cb(null, req.query.userId);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, true);
    else 
      cb(null, false);
  };
  
  export default multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 2, // 2mb limit on profile photo uploading
    },
    fileFilter: fileFilter,
  }).single('file');