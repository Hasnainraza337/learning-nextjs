import dbConnect from "@/config/dbConnect";
import { Product } from "@/modal/productModal";
import { NextResponse } from "next/server"


dbConnect()

export const POST = async (req) => {
    try {

        const body = await req.json();

        await Product.create(body)

        return NextResponse.json({ message: "Product Added Successfully." })


    } catch (error) {
        return NextResponse.json({ message: "Error Occur While Adding Product" })
    }
}





