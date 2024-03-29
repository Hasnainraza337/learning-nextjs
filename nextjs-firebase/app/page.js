import { Avatar, Divider, Image, Space, Tooltip, Spin } from "antd"
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import Buttons from "@/app/(components)/Button/Button"
import DeleteButton from "./(components)/Button/DeleteButton"
import { collection, getDocs } from "firebase/firestore"
import { firestore } from "@/config/firebase"


const getAllProducts = async () => {


  const products = await getDocs(collection(firestore, "products"));
  const data = []
  products.forEach((doc) => {
    data.push({
      ...doc.data()
    })
  })

  return data
}

export default async function Home() {

  const products = await getAllProducts()





  return (
    <>
      <div className='py-5'>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>Products Server Side Render</h1>
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
                          <td>{product.file ? <Image src={product.file} style={{ width: 50, height: 50 }} className='rounded-circle' /> : <Avatar icon={<UserOutlined />} style={{ width: 50, height: 50 }} />}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.description}</td>
                          <td>
                            <Space>
                              <Tooltip title="Delete" ><DeleteButton type="danger" title="Delete" id={product.id} icon={<DeleteOutlined />} /></Tooltip>
                              <Tooltip title="Edit"><Buttons type="primary" product={product} isUpdate={true} title="Update" icon={<EditOutlined />} /> </Tooltip>
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
