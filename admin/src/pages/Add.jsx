import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast, ToastContainer } from 'react-toastify'
import { Oval } from 'react-loader-spinner'

const Add = ({ token }) => {
    const [loader, setLoader] = useState(false)

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCatagory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [bestSeller, setBestSeller] = useState(false)
    const [sizes, setSizes] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoader(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestSeller", bestSeller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)
            const res = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
            console.log("res: ", res);

            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message);
            }
            setLoader(false)
            formCleaup()
        } catch (error) {
            console.log("error: ", error);
            toast.error(error.message)

        }
    }

    const formCleaup = () => {
        setName("");
        setDescription("");
        setPrice("");
        setCatagory("Men");
        setSubCategory("Topwear");
        setBestSeller(false);
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-' >
            <ToastContainer />
            <div>
                <p className='mb-2' >Upload Image</p>

                <div className='flex gap-2' >
                    <label htmlFor="image1">
                        <img className="w-20" src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' className='hidden' />
                    </label>
                    <label htmlFor="image2">
                        <img className="w-20" src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' className='hidden' />
                    </label>
                    <label htmlFor="image3">
                        <img className="w-20" src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' className='hidden' />
                    </label>
                    <label htmlFor="image4">
                        <img className="w-20" src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' className='hidden' />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2' >Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here...' required />
            </div>
            <div className='w-full'>
                <p className='mb-2' >Product Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here...' required />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8' >
                <div>
                    <p className='mb-2' >Product category</p>
                    <select onChange={(e) => setCatagory(e.target.value)} value={category} className='w-full px-3 py-2' name="" id="">
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2' >Sub category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2' name="" id="">
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwaer">Bottomwaer</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'  >Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-[0.4rem] sm:w-[120px]' type="number" placeholder='25' />
                </div>
            </div>

            <div>
                <p className='mb-2' >Product Sizes</p>
                <div className='flex gap-3' >
                    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} >
                        <p className={`px-3 py-1 cursor-pointer border ${sizes.includes("S") ? "bg-pink-100 border-[#c586a5]" : "bg-slate-200 border-slate-200"}`}
                        >S</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} >
                        <p className={`px-3 py-1 cursor-pointer border ${sizes.includes("M") ? "bg-pink-100 border-[#c586a5]" : "bg-slate-200 border-slate-200"}`}
                        >M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} >
                        <p className={`px-3 py-1 cursor-pointer border ${sizes.includes("L") ? "bg-pink-100 border-[#c586a5]" : "bg-slate-200 border-slate-200"}`}
                        >L</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} >
                        <p className={`px-3 py-1 cursor-pointer border ${sizes.includes("XL") ? "bg-pink-100 border-[#c586a5]" : "bg-slate-200 border-slate-200"}`}
                        >XL</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])} >
                        <p className={`px-3 py-1 cursor-pointer border ${sizes.includes("XXL") ? "bg-pink-100 border-[#c586a5]" : "bg-slate-200 border-slate-200"}`}
                        >XXL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-4' >
                <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller"> Add to bestseller </label>
            </div>

            <button
                type='submit'
                className='w-28 py-3 mt-4 bg-black text-white flex items-center justify-center'
            >
                {loader ? (
                    <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="white"
                        ariaLabel="oval-loading"
                    />
                ) : (
                    "ADD"
                )}
            </button>

        </form>
    )
}

export default Add