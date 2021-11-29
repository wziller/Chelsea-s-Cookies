import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import slidesReducer from '../../store/menu_slide'
import useTilt from "./tilt";
import { nextMenuSlide } from "../../store/menu_slide";
import { prevMenuSlide } from "../../store/menu_slide";
import Slide from "./slide";
import './carousel.css'

  function Carousel({slides}) {
      const dispatch = useDispatch()
      const {menuSlideIndex} = useSelector(state=>state.menu_slide_index)
    // const [state, dispatch] = useReducer(slidesReducer(slides));

    return (
      <div className="slides">
        <button onClick={() => dispatch(prevMenuSlide(slides))}>‹</button>

        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (menuSlideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch(nextMenuSlide(slides))}>›</button>
      </div>
    );
  }

export default Carousel
