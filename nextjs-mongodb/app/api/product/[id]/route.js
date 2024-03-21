import dbConnect from "@/config/dbConnect"
import { Product } from "@/modal/productModal"
import { NextResponse } from "next/server"

dbConnect()

export const DELETE = async (req, route) => {
    try {

        const id = route.params.id

        // console.log(id)
        // await dbConnect()
        await Product.deleteOne({ _id: id })

        return NextResponse.json({ message: "Product Deleted Successfully." })


    } catch (error) {
        return NextResponse.json({ message: "Error Occur While Deleting Product", error })
    }
}



export const PUT = async (req, route) => {
    try {

        const id = route.params.id
        const body = await req.json()

        const data = await Product.updateOne({ _id: id }, { $set: body })
        return NextResponse.json({ message: "Product update Successfully.", data })


    } catch (error) {
        return NextResponse.json({ message: "Error Occur While updating Product", error })
    }
}