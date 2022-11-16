import logger from "./logger.js";

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('*******************************')
    next()
}

const unknownEndPoint = (request, response) => {
    response.status(404).send({eror: 'Unknown endpoint!'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if(error.name === 'CastError') {
        response.status(400).send({error: 'Malformatted id'})
    } else if(error.name === 'ValidationError') {
        response.status(400).send({error: error.message})
    }
}

export default {
    requestLogger,
    unknownEndPoint, 
    errorHandler
}