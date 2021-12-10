import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {getGalleryItems} from '../../store/gallery'
import { getProducts } from '../../store/product'
import Deck from '../carousel/'
import './gallery.css'
import Carousel from "../carousel"
import GalleryCarousel from "../gallery_carousel"


const Gallery = () => {
    const dispatch = useDispatch();
    const {gallery_items} = useSelector((state)=>state.gallery_items)
    const current_menu = useSelector((state)=> state.products.current_menu)

    useEffect(()=>{
        dispatch(getGalleryItems())
        dispatch(getProducts())
    },[])

    return current_menu && gallery_items ?(
        <div id='gallery_items_container'>
            <div id='menu_carousel'>
                <Carousel slides={current_menu}/>
            </div>
            <div id='custom_carousel'>
                <GalleryCarousel slides={gallery_items}/>
            </div>
        </div>
    ) : (<p>loading gallery</p>)
}


export default Gallery
