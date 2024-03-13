"use client"
import { Col, Form, Input, InputNumber, Modal, Progress, Row, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons'
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore, storage } from "@/config/firebase";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


// const initialState = { name: "", price: "", description: "" }
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
                    let data = { ...product, file: downloadURL }
                    createDocument(data)
                });
            }
        )
    };

    const createDocument = async (product) => {
        try {
            // add product in firestore
            await setDoc(doc(firestore, "products", product.id), product);
            message.success("A New Product Added Successfully")
            setState({ name: "", price: "", description: "" })

        } catch (error) {
            message.error(error.message)
        }

        setIsProcessing(false)
    }


    // const upDateProduct = async () => {

    //     const { name, price, description } = state


    //     const updateProduct = {
    //         ...product,
    //         name, price, description
    //     }

    //     setIsProcessing(true)
    //     try {
    //         await setDoc(doc(firestore, "products", updateProduct.id), updateProduct, { merge: true });
    //         message.success("Product updated successfully")
    //         setState({ name: "", price: "", description: "" })
    //     } catch (e) {
    //         console.error("Error updating product: ", e);
    //         message.error("Product isn't updated ")
    //     }
    //     setIsProcessing(false)
    // }


    const updateProduct = async () => {
        const { name, price, description } = state;

        if (!name || !price || !description) {
            return message.error("All Fields are Required")
        }

        const updateProduct = {
            ...product,
            name,
            price,
            description
        };

        if (file) {
            const fileName = product.id;
            const fileExtension = file.name.split(".").pop();
            const storageRef = ref(storage, `images/${fileName}.${fileExtension}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setprogress(Math.floor(progress));
                },
                (error) => {
                    message.error("Something went wrong while uploading file", error.message);
                    setIsProcessing(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        let data = { ...updateProduct, file: downloadURL };
                        updateDocument(data);
                    });
                }
            );
        } else {
            updateDocument(updateProduct);
        }

        setIsProcessing(true);
    };

    const updateDocument = async (updateProduct) => {
        try {
            await setDoc(doc(firestore, "products", updateProduct.id), updateProduct, { merge: true });
            message.success("Product updated successfully");
            setState({ name: "", price: "", description: "" });
        } catch (e) {
            console.error("Error updating product: ", e);
            message.error("Product isn't updated ");
        }
        setIsProcessing(false);
    };

    const handleSubmit = () => {
        if (isUpdate) {
            // upDateProduct()
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
