import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {getGalleryItems} from '../../store/gallery'
import { getProducts } from '../../store/product'
import Deck from '../carousel/'
import './gallery.css'
import Carousel from "../carousel"


const Gallery = () => {
    const dispatch = useDispatch();
    const {gallery_items} = useSelector((state)=>state.gallery_items)
    const {products} = useSelector((state)=> state.products)

    useEffect(()=>{
        dispatch(getGalleryItems())
        dispatch(getProducts())
    },[])

    return products ?(
        <div id='gallery_items_container'>
            <div id='menu_carousel'>
                <Carousel slides={products}/>
            </div>
            <div id='custom_carousel'>
            </div>
        </div>
    ) : (<p>loading gallery</p>)
}


export default Gallery
