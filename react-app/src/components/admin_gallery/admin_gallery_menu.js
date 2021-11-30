import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store/product";
import DeleteGalleryItemModal from "../delete_gallery_item_modal";
import './admin_gallery_menu.css'


const AdminGalleryMenu = () => {
const dispatch = useDispatch()
const {products} = useSelector(state=>state.products)
const {gallery_items} = useSelector(state=>state.gallery_items)

useEffect(()=>{dispatch(getProducts())},[])
    return(
        <div>
            {gallery_items?.map((gallery_item) =>(
                <div>
                    <hr></hr>
                    <p>Gallery Item#{gallery_item.id}</p>
                    <DeleteGalleryItemModal gallery_item={gallery_item}/>
                    <img id='gallery_item_image' src={`${gallery_item.image}`}></img>
                    <p>Name: {products.find(product=>gallery_item.product_id === product.id).name}</p>
                    <p>Description: {gallery_item.description}</p>
                    <hr></hr>
                </div>
            ))}
        </div>
    )
}

export default AdminGalleryMenu
