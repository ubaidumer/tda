"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
class Helper {
    static customFileName(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        let fileExtension = "";
        if (file.mimetype.indexOf("jpeg") > -1) {
            fileExtension = "jpg";
        }
        else if (file.mimetype.indexOf("png") > -1) {
            fileExtension = "png";
        }
        const originalName = file.originalname.split(".")[0];
        cb(null, originalName + '-' + uniqueSuffix + "." + fileExtension);
    }
    static destinationPath(req, file, cb) {
        cb(null, './uploads/');
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map