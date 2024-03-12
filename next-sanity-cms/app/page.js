import { client } from "../sanity/lib/client"

const getAllServices = async () => {
  const services = await client.fetch(
    '*[_type=="service"]',
    {},
    {
      cache: "no-cache",
    }
  )
  console.log("Services", services)
  return services
}

export default async function Home() {

  const services = await getAllServices()
  return (
    <>
      <h1>Services From sanity</h1>
      {services.map((item, i) => {
        return (
          <div key={i}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <hr />
          </div>
        )
      })}
    </>
  )
}
