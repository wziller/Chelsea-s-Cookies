import "./individual_product_page.css"

import { getProductbyId, getProducts } from "../../store/product"
import { getUsers } from "../../store/user"
import { getReviews } from "../../store/review"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import IndividualProductWindow from "./individual_product_window"
import IndividualProductReviews from "./individual_product_reviews"

import { useEffect } from "react"

const IndividualProductPage = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()

      useEffect(() => {
        (async()=>{
            await dispatch(getReviews())
            await dispatch(getProducts())
            await dispatch(getUsers())
        })()
    }, []);


      useEffect(() => {}, [getProducts]);



   const {products} = useSelector((state)=>state.products)

   const selected_product = products?.find(product => product.id == productId)

    return selected_product?(
    <div className= "individual_product_container">
        <IndividualProductWindow product={selected_product}/>
        <IndividualProductReviews product={selected_product}/>
    </div>
    ) : (
        <p>Product is loading....</p>
    )
}

export default IndividualProductPage
