"use client"
import { Button } from "antd"

export default function DeleteButton({ title, icon, type, id }) {


    const handleDelete = async (id) => {
        console.log("id", id);
       
    };


    return (
        <>
            <Button type={type} icon={icon} onClick={() => handleDelete(id)}>{title}</Button>
        </>
    )
}
