
const IndividualProductWindow = ({product}) => {
    return(
        <div id="individual_product_container">
            <div id="individual_product_window">
                <h3 id= "individual_product_name">{product.name}</h3>
                <img id= "individual_product_image" src={product.image_link}></img>
                <div id="individual_product_description_container">
                    <p id="individual_product_description">{product.description}</p>
                </div>
                <div id= "individual_product_buttons_container">
                    <p id= "individual_product_price">{`$${product.price}`}</p>
                    <div id= "individual_quantity_container">
                        <button>minus</button>
                        <p>Quantity</p>
                        <button>plus</button>
                    </div>
                    <button id= "individual_product_add_to_cart_btn">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default IndividualProductWindow
