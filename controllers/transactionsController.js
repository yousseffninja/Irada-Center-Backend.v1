const Transactions = require('../models/transactionsModel');

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const factory = require("./handlerFactory");

exports.getAllTransactions = async (req, res, next) => {
    // #swagger.tags = ['Transactions']
    /* #swagger.description = 'This API For Get All Transactions With Filteration' */
    /* #swagger.parameters['limit'] = {
            in: 'query',
            description: 'Page size: ex: ?limit=10',
            type: 'number'
        } 
    */
    /* #swagger.parameters['fields'] = {
            in: 'query',
            description: 'example: ?fields=name,description' ,
        } 
    */
    /* #swagger.parameters['page'] = {
            in: 'query',
            description: 'indexing page: ex: ?page=2',
            type: 'number'
        }
    */
    /* #swagger.parameters['sort'] = {
            in: 'query',
            description: 'example: ?sort=name,-createdAt',
        } 
    */

    return factory.getAllMagdy(req, res, next, Transactions);
};