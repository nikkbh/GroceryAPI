const logRepo = require("../repos/logRepo.js");

let errorHelpers = {
  logErrorsToConsole: (err, req, res, next) => {
    console.error(
      `Log Entry: ${JSON.stringify(errorHelpers.errorBuilder(err))}`
    );
    console.error("*".repeat(80));
    next(err);
  },
  logErrorsToFile: (err, req, res, next) => {
    let errorObject = errorHelpers.errorBuilder(err);
    errorObject.requestInfo = {
      hostName: req.hostName,
      path: req.path,
      app: req.app,
    };
    logRepo.write(
      errorObject,
      (data) => {
        console.log(data);
      },
      (err) => console.error(err)
    );
    next(err);
  },
  errorHandler: (err, req, res, next) => {
    res.status(500).json(errorHelpers.errorBuilder(err));
  },
  errorBuilder: (err) => {
    return {
      status: 500,
      statusText: "Internal Server Error",
      message: err.message,
      error: {
        errno: err.errno,
        call: err.syscall,
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      },
    };
  },
};

module.exports = errorHelpers;
