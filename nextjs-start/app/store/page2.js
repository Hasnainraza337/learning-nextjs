"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Store() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllProducts = async () => {
        const res = await fetch("https://fakestoreapi.com/products")

        const data = await res.json()
        setProducts(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center" }}>My Store</h1>
            {/* <button style={{ textAlign: "center", padding: "4px 6px", backgroundColor: "black", color: "white" }} onClick={getAllProducts}>Show Products</button> */}
            <hr />
            {products.length ?
                <table  >
                    <thead>
                        <th>img</th>
                        <th>title</th>
                        <th>category</th>
                        <th>description</th>
                        <th>price</th>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const { id, image, title, price, category, description } = product;
                            return (
                                <tr key={id}>
                                    <td><Image src={image} width={50} height={50} alt={title} /></td>
                                    <td>{title}</td>
                                    <td>{category}</td>
                                    <td>{description}</td>
                                    <td>{price}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                : isLoading ? <div className="loader"></div > : <div>No Data found</div>
            }
        </>
    )
}
