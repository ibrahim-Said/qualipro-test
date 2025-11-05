const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = (errors)=>{
    let mapped={};
    errors.forEach((error)=>{
        if(!mapped[error.path]){
            mapped[error.path]=[];
        }
        mapped[error.path].push(error.msg);
    })
    return mapped;
  };
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: mappedErrors(errors.array()),
    });
  }
  next();
};
