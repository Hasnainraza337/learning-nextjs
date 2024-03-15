import { Avatar, Divider, Image, Space, Tooltip } from "antd"
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import Buttons from "@/app/(components)/Button/Button"
import DeleteButton from "./(components)/Button/DeleteButton"
import { Product } from "../modal/productModal"
import dbConnect from "@/config/dbConnect"



const getProducts = async () => {

  try {
    const response = await Product.find()
    return response
  } catch (error) {
    console.log(error)
  }
}



export default async function Home() {
  dbConnect()
  const products = await getProducts()

  console.log("Products", products)





  return (
    <>
      <div className='py-5'>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>Products Server Side Render with MongoDb</h1>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <Buttons type="primary" title="Add Products" />
            </div>
          </div>
          <Divider />

          <div className="row">
            <div className="col">
              <div className="card table-responsive">

                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{product.imageUrl ? <Image src={product.imageUrl} style={{ width: 50, height: 50 }} className='rounded-circle' /> : <Avatar icon={<UserOutlined />} style={{ width: 50, height: 50 }} />}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.description}</td>
                          <td>
                            <Space>
                              <Tooltip title="Delete" ><DeleteButton type="danger" title="Delete" id={product._id.toString()} icon={<DeleteOutlined />} /></Tooltip>
                              <Tooltip title="Edit"><Buttons type="primary" product={{ _id: product._id.toString(), name: product.name, price: product.price, description: product.description, imageUrl: product.imageUrl }} isUpdate={true} title="Update" icon={<EditOutlined />} /> </Tooltip>
                            </Space>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div >
      </div >




    </>
  )
}
