"use client"
import { Button } from "antd"
import ProductModal from "../ProductsModal/ProductModal"
import { useState } from "react"

export default function Buttons({ title, icon, type, isUpdate, product }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ProductModal isOpen={isOpen} product={product} isUpdate={isUpdate} onClose={() => setIsOpen(!isOpen)} title={title} />
            <Button type={type} icon={icon} onClick={setIsOpen}>{title}</Button>
        </>
    )
}
