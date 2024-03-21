"use client"
import { Col, Form, Input, Modal, Progress, Row, message } from "antd";
import { useState } from "react";
import { storage } from "@/config/firebase";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";


export default function ProductModal({ isOpen, onClose, isUpdate, product = {} }) {


    const [state, setState] = useState({
        name: product.name || "",
        price: product.price || "",
        description: product.description || ""
    });
    const [isProcessing, setIsProcessing] = useState(false)
    const [file, setFile] = useState(null)
    const [progress, setprogress] = useState()


    const handleChange = (e) => {
        const { name, value } = e.target
        setState((s) => ({ ...s, [name]: value }))
    }



    const addProduct = () => {
        const { name, price, description } = state

        if (!name || !price || !description) {
            return message.error("All Fields are Required")
        }

        const product = {
            name,
            price,
            description,
            id: Math.random().toString(36).slice(2)
        }

        if (file) {
            uploadFile(product)
        } else {
            createDocument(product)
        }

        setIsProcessing(true)
    }

    const uploadFile = (product) => {
        const fileName = product.id
        const fileExtension = file.name.split('.').pop()

        const storageRef = ref(storage, `images/${fileName}.${fileExtension}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setprogress(Math.floor(progress))

            },
            (error) => {
                message.error("Something went wrong while uploading file", error.message)
                setIsProcessing(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    let data = { ...product, imageUrl: downloadURL }
                    console.log("data", data)
                    createDocument(data)
                });
            }
        )
    };

    const createDocument = async (product) => {
        try {
            const response = await axios.post("http://localhost:3000/api/product", product)

            const data = response.data
            setState(data)
            message.success("A new Product Added succesfully")

        } catch (error) {
            console.log(error.message)
        }

        setIsProcessing(false)
    }





    const updateProduct = async () => {
        const { name, price, description } = state;

        if (!name || !price || !description) {
            return message.error("All Fields are Required")
        }

        const updateData = {
            ...product,
            name,
            price,
            description
        };

        setIsProcessing(true);

        await updateDocument(updateData);

    };

    const updateDocument = async (updateData) => {
        try {
            await axios.put(`http://localhost:3000/api/product/${product._id}`, updateData)
            setState(updateData)
            setState({ name: "", price: "", description: "" })
            message.success("Product Upadate successfuly")
        } catch (error) {
            console.log(error)
            message.error("Error occur while update product")
        }

        setIsProcessing(false);
    };

    const handleSubmit = () => {
        if (isUpdate) {
            updateProduct()
        } else {
            addProduct()
        }
    }

    return (
        <>
            <Modal
                title={isUpdate ? "Update Product" : "Add Product"}
                centered
                open={isOpen}
                onOk={handleSubmit}
                confirmLoading={isProcessing}
                okText={isUpdate ? "Update Product" : "Add Product"}
                cancelText="Close"
                onCancel={onClose}
                style={{ width: 1000, maxWidth: 1000 }}
            >
                <Form layout="vertical" className='py-4'>
                    <Row gutter={16}>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Product Name">
                                <Input placeholder="Enter Product Name" name='name' value={state.name} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Price">
                                <Input placeholder="Enter Price" name='price' value={state.price} onChange={handleChange} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Form.Item label="Image" className='mb-3'>
                                <Input type='file' placeholder='Upload file' onChange={(e) => { setFile(e.target.files[0]) }} />
                                <br />
                                {isProcessing && file && <Progress percent={progress} />}
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="preview" className='mb-3'>
                                {file && <Image src={URL.createObjectURL(file)} width={100} height={100} alt="product image" />}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Description" className='mb-0'>
                                <Input.TextArea placeholder="Enter  description" name='description' value={state.description} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

        </>
    )
}
