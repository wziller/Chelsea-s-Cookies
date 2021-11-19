import { useEffect } from "react"
import { useSelector } from "react-redux"
import { getProducts } from "../../store/product"
import { useDispatch } from "react-redux"
import './menu.css'



const Menu = () => {
    const dispatch= useDispatch()

    useEffect(async ()=>{
        await dispatch(getProducts())
    },[])

    useEffect(()=>{

    },[getProducts])

    const products = useSelector((state)=>{
        console.log(state)
        return state.products['products']
    })

    const divStyle = (src) => ({
        backgroundImage: 'url(' + src + ')'
      })

    console.log(products)
    return (products ?
        <div className="products_container">
            {products.map((product)=>(
                <div className='card'>
                    <div className='card_content'>
                        <div className= 'card_front' style={divStyle(product.image_link)} >
                            <p className='card_title'>{product.name}</p>
                            <p className='card_subtitle'></p>
                        </div>
                        <div className= 'card_back'>
                            <p className= 'card_body'>{product.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
     :
        <p>Menu is loading....</p>
    )
}

export default Menu
