import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'
// Function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]


        const images = [image1, image2, image3, image4].filter((item) => item != undefined)
        const imageURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            image: imageURL,
            date: Date.now()
        }
        console.log("productData: ", productData);

        const product = new productModel(productData)
        await product.save()

        // console.log("name: ", name, description, price, category, subCategory, size, bestSeller);
        // console.log("images : ", imageURL);
        res.json({
            success: true,
            message: "Product added sucessfully"
        })

    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: error.message
        })

    }
}
// Function for list product
const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({});
        res.json({
            success: true,
            product
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}
// Function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Product remove successfully"
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}
// Function for singe product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        console.log("product: ", product);
        res.json({
            success: true,
            product
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: "Product with the given id cannot be found"
        })
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }