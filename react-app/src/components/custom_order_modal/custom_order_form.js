import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getProducts } from "../../store/product";
import editCustomOrder from "../../store/custom_order";
import createCustomOrderOption from "../../store/custom_order";
import "./custom_order_form.css";

const CustomOrderForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { products } = useSelector((state) => state.products);
  const [errors, settErrors] = useState([]);
  const [orderDescription, setOrderDescription] = useState("");
  const [orderDeliveryDate, setOrderDeliveryDate] = useState("");
  const [orderDeliveryAddress, setOrderDeliveryAddress] = useState("");
  const [selectedProductType, setSelectedProductType] = useState();
  const [selectedMoreColors, setSelectedMoreColors] = useState(false);
  const [selectedGold, setSelectedGold] = useState(false);
  const [selectedSilver, setSelectedSilver] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(false);
  const [selectedCustomShape, setSelectedCustomShape] = useState(false);
  const [selectedAirBrushing, setSelectedAirBrushing] = useState(false);
  const [selectedFlowers, setSelectedFlowers] = useState(false);
  const [logoImageAddress, setLogoImageAddress] = useState("None");

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [currentTotal, setCurrentTotal] = useState();

  const createCustomOrder = () => {
    const newCustomOrder = {
      user_id: user.id,
      description: orderDescription,
      delivery_date: orderDeliveryDate,
      delivery_address: orderDeliveryAddress,
      status: "requested",
    };

    const createdCustomOrder = dispatch(createCustomOrder(newCustomOrder));

    const newCustomOrderOptions = {
      custom_order_id: createdCustomOrder.id,
      type_id: selectedProductType,
      more_colors: selectedMoreColors,
      gold: selectedGold,
      silver: selectedSilver,
      logo: selectedLogo,
      custom_shape: selectedCustomShape,
      air_brushing: selectedAirBrushing,
      flowers: selectedFlowers,
      logo_image: logoImageAddress,
    };

    const createdOrderOptions = dispatch(
      createCustomOrderOption(newCustomOrderOptions)
    );
  };
  return (
    <div className="custom_order_form_container">
      <form onSubmit={createCustomOrder}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            placeholder="delivery address"
            type="text"
            name="delivery address"
            onChange={setOrderDeliveryAddress}
            value={orderDeliveryAddress}
          ></input>
        </div>
        <div>
          <input
            placeholder="delivery date"
            type="date"
            name="delivery date"
            onChange={setOrderDeliveryDate}
            value={orderDeliveryDate}
          ></input>
        </div>
        <h3>Your Order Details:</h3>
        <div>
          <input
            placeholder="Describe your order here"
            type="text"
            name="order description"
            onChange={setOrderDescription}
            value={orderDescription}
          ></input>
        </div>
        <div>
          <select>
            {products.map((product) => (
              <option
                value={product.name}
                onSelect={(e) => setSelectedProductType(e.target.value)}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Does your design require gold frosting?</p>
          <div className="custom_options_select_buttons">
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="yes"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={false}
              />
              <p>Yes</p>
            </label>
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="no"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={true}
              />
              <p>No</p>
            </label>
          </div>
        </div>
        <div>
          <p>Does your design require silver frosting?</p>
          <div className="custom_options_select_buttons">
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="yes"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={false}
              />
              <p>Yes</p>
            </label>
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="no"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={true}
              />
              <p>No</p>
            </label>
          </div>
        </div>
        <div>
          <p>Does your design require a custom logo?</p>
          <div className="custom_options_select_buttons">
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="yes"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={false}
              />
              <p>Yes</p>
            </label>
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="no"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={true}
              />
              <p>No</p>
            </label>
          </div>
        </div>
        <div>
          <p>Does your design require a custom shape?</p>
          <div className="custom_options_select_buttons">
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="yes"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={false}
              />
              <p>Yes</p>
            </label>
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="no"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={true}
              />
              <p>No</p>
            </label>
          </div>
        </div>
        <div>
          <p>Does your design require air brushing?</p>
          <div className="custom_options_select_buttons">
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="yes"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={false}
              />
              <p>Yes</p>
            </label>
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="no"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={true}
              />
              <p>No</p>
            </label>
          </div>
        </div>
        <div>
          <p>Does your design require flowers?</p>
          <div className="custom_options_select_buttons">
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="yes"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={false}
              />
              <p>Yes</p>
            </label>
            <label className="custom_radio">
              <input
                className="custom_radio_button"
                type="radio"
                value="no"
                onChange={(e) => setSelectedGold(e.target.checked)}
                checked={true}
              />
              <p>No</p>
            </label>
          </div>
        </div>
        <p>If you need a custom logo, please attach an image.</p>
        <input
          className="file_input_box"
          type="file"
          name="logo"
          accept="image/png, image/jpeg"
        ></input>
        <p>{`Total: $${currentTotal}`}</p>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default CustomOrderForm;
