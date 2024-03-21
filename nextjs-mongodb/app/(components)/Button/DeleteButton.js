"use client"
import { Button, message } from "antd"
import axios from "axios";

export default function DeleteButton({ title, icon, type, id }) {


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/product/${id}`)
            message.success("Product deleted successfully")
        } catch (error) {
            console.log(error)
            message.error("Product Not deleted successfully")
        }
    };


    return (
        <>
            <Button type={type} icon={icon} onClick={() => handleDelete(id)}>{title}</Button>
        </>
    )
}
