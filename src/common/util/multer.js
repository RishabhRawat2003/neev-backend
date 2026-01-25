import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB (adjust if needed)
  },
  fileFilter: (req, file, cb) => {
    // Allow images & videos
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Only image and video files are allowed"),
        false
      );
    }
  },
});
