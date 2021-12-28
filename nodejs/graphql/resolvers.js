const product = require('../models/productModel');

const Query = {
    getAllProducts: async (root, context) => {
        const result = await product.find({}).cache({ key: context.sessionID }).exec();
        console.log("GraphQL get all :" + JSON.stringify(result))
        return result;
    },
    getProductById: async (root, {id}, context) => {
        const result = await product.findOne({id: id}).cache({ key: context.sessionID }).exec();
        console.log("GraphQL get by id " + id + " :" + JSON.stringify(result))
        return result;
    }
};

const Mutation = {
    createProduct: async (root, {input}) => {
        const new_id = await product.countDocuments({}).exec();
        const new_item = {...input, new_id };
        console.log("GraphQL creats " + JSON.stringify(new_item))

        return await product.create(new_item).then( result => {
            console.log("GraphQL suceeded " + result);
            return true;
        }).catch (err => {
            console.log("GraphQL failed " + err);
            return false;
        });
    }
};

module.exports = { Query, Mutation };