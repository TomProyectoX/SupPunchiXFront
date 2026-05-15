import { useEffect, useState } from "react";


const counter = () => {
    const [count, setcount] = useState(0)

    useEffect(()=>{
        document.title = `Contador: ${count}`
    }, [count])


    return (
        <div>
           <p>contador: {count}</p>
           <button onClick={() => setcount(count + 1)}>incrementar</button>
        </div>
    )
}

export default counter;