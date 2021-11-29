import useTilt from "./tilt";
import './gallery_carousel.css'
import {getProducts} from '../../store/product'
import { useSelector } from "react-redux";

function Slide({ slide, offset }) {
    const {products} = useSelector(state=> state.products)
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);

    return (
      <div
        ref={ref}
        className="slide"
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
        }}
      >
        <div
          className="slideBackground"
        //   style={{
        //     backgroundImage: `url('${slide.image_link}')`
        //   }}
        />
        <div
          className="slideContent"
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
        >
          <div className="slideContentInner">
            <h2 className="slideTitle">{products.find(product=>product.id === slide.product_id).name}</h2>
            <h3 className="slideSubtitle">{slide.subtitle}</h3>
            {/* <p className="slideDescription">{slide.description}</p> */}
          </div>
        </div>
      </div>
    );
  }

  export default Slide
