"use client"
import { firestore } from "@/config/firebase";
import { Button, message } from "antd"
import { deleteDoc, doc } from "firebase/firestore";

export default function DeleteButton({ title, icon, type, id }) {


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, "products", id));
            message.success("Product Delete Successfully")
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <>
            <Button type={type} icon={icon} onClick={() => handleDelete(id)}>{title}</Button>
        </>
    )
}
