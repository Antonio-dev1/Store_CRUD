const objectID = require('mongoose').Types.ObjectId;

const validateDbId = (req , res , next) => {
    if(!objectID.isValid(req.params.id))
    res.status(400).json({
        error: `given object ID (${req.params.id}) is not valid`
    })

    else next();
}

const raiseRecord404Error = (req , res) =>  {
    res.status(401).json({
        error:`no record with ID: (${req.params.id})`
    })
}

const errorHandler = ( err , req , res , next) => {
    res.status(500).json({err : "Something went wrong"})

}

module.exports = {
    validateDbId,
    raiseRecord404Error,
    errorHandler,
}