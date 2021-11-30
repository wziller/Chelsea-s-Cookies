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
        className="gallery_slide"
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
        }}
      >
        <div
          className="gallery_slideBackground"
        //   style={{
        //     backgroundImage: `url('${slide.image_link}')`
        //   }}
        />
        <div
          className="gallery_slideContent"
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
        >
          <div className="gallery_slideContentInner">
            <h2 className="gallery_slideTitle">{products.find(product=>product.id === slide.product_id).name}</h2>
            <h3 className="gallery_slideSubtitle">{slide.subtitle}</h3>
            {/* <p className="slideDescription">{slide.description}</p> */}
          </div>
        </div>
      </div>
    );
  }

  export default Slide
