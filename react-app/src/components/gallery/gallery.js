import { useSelector, useEffect } from "react-redux"
import { useDispatch } from "react"


const Gallery= () => {
    const dipatch = useDispatch()
    const gallery_items = useSelector((state)=>state.gallery_items)

    useEffect(()=>{
        
    },[])

    return(
        <div>

        </div>
    )
}


export default Gallery
