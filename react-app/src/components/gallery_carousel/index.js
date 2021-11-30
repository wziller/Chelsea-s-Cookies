import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import slidesReducer from '../../store/menu_slide'
import useTilt from "./tilt";
import { nextGallerySlide } from "../../store/gallery_slide";
import { prevGallerySlide } from "../../store/gallery_slide";
import Slide from "./slide";
import './gallery_carousel.css'

  function GalleryCarousel({slides}) {
      const dispatch = useDispatch()
      const {gallerySlideIndex} = useSelector(state=>state.gallery_slide_index)
    // const [state, dispatch] = useReducer(slidesReducer(slides));

    return (
      <div className="gallery_slides">
        <button onClick={() => dispatch(prevGallerySlide(slides))}>‹</button>
        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (gallerySlideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch(nextGallerySlide(slides))}>›</button>
      </div>
    );
  }

export default GalleryCarousel
