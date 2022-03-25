const {Order, Order_Items} = require("../models")


/**
 * 
 * @param {*} data 
 * @description create order service
 */
const createOrder = (data) => {
    return new Promise((resolve, reject) => {
        Order.create(data)
        .then(order => {
            resolve(order)
        })
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


/**
 * 
 * @param {*} data 
 * @description create order items service
 */
const createOrderItems = (data) => {
    return new Promise((resolve, reject) => {
        Order_Items.bulkCreate(data)
        .then(order => {
            resolve(order)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
        })
    })
}

module.exports = {createOrder, createOrderItems}