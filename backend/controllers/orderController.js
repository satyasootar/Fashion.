import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"

// placing order with cod
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({
            success: true,
            message: "order Palaced"
        })

    } catch (error) {
        console.log("error: ", error);
        console.log(error.message)

    }
}

// placing order with stripe
const placeOrderWithStripe = async (req, res) => {

}

// placing order with razorPay
const placeOrderWithRazorPay = async (req, res) => {

}

// All orders data for admin panel
const allOrders = async (req, res) => {

}

// User order data for frontend
const userOrder = async (req, res) => {

}

//update order status from admin pannel

const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderWithStripe, placeOrderWithRazorPay, allOrders, userOrder, updateStatus }