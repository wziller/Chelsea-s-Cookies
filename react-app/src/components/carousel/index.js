import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import slidesReducer from '../../store/slide'
import useTilt from "./tilt";
import { nextSlide } from "../../store/slide";
import { prevSlide } from "../../store/slide";
import Slide from "./slide";
import './carousel.css'

  function Carousel({slides}) {
      const dispatch = useDispatch()
      const {slideIndex} = useSelector(state=>state.slide_index)
    // const [state, dispatch] = useReducer(slidesReducer(slides));

    return (
      <div className="slides">
        <button onClick={() => dispatch(prevSlide(slides))}>‹</button>

        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch(nextSlide(slides))}>›</button>
      </div>
    );
  }

export default Carousel
