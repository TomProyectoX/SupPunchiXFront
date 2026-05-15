import { useEffect, useState } from "react"
import Postcard from "./Postcard"

const Postlist = () => {
    const [post, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:4002/variantes").then((response) => response.json())
        .then((data) => {
            setPosts(data)
        }).catch((error) => {
            console.error("error", error)
        })

    }, [])
    
    return(
        <>
        <h4>hp</h4> 
        {post.map((post) => {
            return <Postcard 
            key={post.id}
            id={post.id}
            />
        })}
        </>
    )

}

export default Postlist;