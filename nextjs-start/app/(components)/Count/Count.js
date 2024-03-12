"use client"
import React, { useState } from 'react'


export default function Count() {
    const [count, setCount] = useState(0)

    const handleIncrement = () => {
        setCount(count + 1)
    }
    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const handleReset = () => {
            setCount(0)
    }



    return (
        <>
            <button onClick={handleDecrement}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrement}>+</button>

            {count > 0 && <div>
                <button onClick={handleReset}>reset</button>
            </div>}
        </>
    )
}
