"use client"
import { Button, message } from "antd"

export default function DeleteButton({ title, icon, type, id }) {


    const handleDelete = async (id) => {

    }

    return (
        <>
            <Button type={type} icon={icon} onClick={() => handleDelete(id)}>{title}</Button>
        </>
    )
}
