export default function Home() {
  const isLoggedIn = true
  return (
    <>
      <div>
        {isLoggedIn && <button>Logout</button>}
      </div>
    </>
  )
}