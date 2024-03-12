import axios from "axios"
export default function Student() {
    const studentData = [
        {
            name: "Raza",
            rollNumber: 21,
            section: "A"
        },
        {
            name: "Ali",
            rollNumber: 22,
            section: "A"
        },
        {
            name: "Zarnab",
            rollNumber: 23,
            section: "B"
        },
        {
            name: "Hasnain",
            rollNumber: 24,
            section: "B"
        },
    ]

    const loadDataFromServer = async () => {
        let response = await axios.get("http://api.github.com/users/hasnainraza337")

        console.log(response)
    }

    loadDataFromServer()
    return (
        <>
            <h1>Student App</h1>
            {studentData.map((student) => {
                return (
                    <div>
                        <h1>Student Name:{student.name}</h1>
                        <h2>Student RollNo:{student.rollNumber}</h2>
                        <h3>Student Section:{student.section}</h3>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}
