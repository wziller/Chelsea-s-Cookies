import useTilt from "./tilt";
import "./carousel.css";
import { HashLink as Link } from "react-router-hash-link";

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.image_link}')`,
        }}
      >
        <div className="slideContentInner">

            <h2 className="slideTitle"><Link to={`/individualproduct/${slide.id}`}>{slide.name}</Link></h2>

          <h3 className="slideSubtitle">{slide.subtitle}</h3>
        </div>
      </div>
    </div>
  );
}

export default Slide;
