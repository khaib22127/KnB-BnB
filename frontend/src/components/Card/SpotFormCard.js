import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import "./SpotFormCard.css";
// import CreateSpotImages from "./CreateSpotImages";

const SpotFormCard = ({ newSpot, submitType, formType }) => {
  const { spotId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [address, setAddress] = useState(newSpot.address);
  const [city, setCity] = useState(newSpot.city);
  const [state, setState] = useState(newSpot.state);
  const [country, setCountry] = useState(newSpot.country);
  const [lat, setLat] = useState(newSpot.lat);
  const [lng, setLng] = useState(newSpot.lng);
  const [name, setName] = useState(newSpot.name);
  const [description, setDescription] = useState(newSpot.description);
  const [price, setPrice] = useState(newSpot.price);
  const [previewImage, setPreviewImage] = useState(newSpot.previewImage);
  const [url, setUrl] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [customErrors, setCustomError] = useState({});

  const spots = useSelector((state) => state.spots.singleSpot);

  // const handlerUrl = (e) => {
  //   const setValue =
  //     // previewImage?.slice(-4) === ".jpg" ||
  //     previewImage?.slice(-4) === ".png"
  //     // previewImage?.slice(-5) === ".jpeg";

  //     if (setValue) setPreviewImage(e.target.value)
  // }
  //   console.log("newSpot this is from SpotForm.js::::", newSpot);
  //   console.log("spots from Spot Form.js::::", spots);

  // useEffect(() => {
  //   setIsLoaded(isLoaded)
  //   // setErrors({})
  //   //  let err = { ...errors };
  //   //   if (description.length < 30) {
  //   //     err.description = "Description needs a minimum of 30 characters";
  //   //   }
  //   dispatch(spotsAction.addImage(previewImage))
  //   dispatch(spotsAction.addSpot(newSpot))

  // }, [dispatch, isLoaded])

  const submitNewSpotHandler = (e) => {
    e.preventDefault();
    setErrors({});
    setCustomError([]);
    let err = { ...customErrors };

    if (submitType === "Create") {
      dispatch(
        (newSpot = spotsAction.createSpot(
          {
            // ...newSpot,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
          },
          { url: previewImage, preview: true }
        ))
      )
        .then((res) => {
          history.push(`/spots/${res.id}`);
          // dispatch(spotsAction.getSpotsBySpotId(res.id))
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    if (submitType === "Edit") {
      dispatch(
       newSpot = spotsAction.editUserSpot(
          {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
          },
          // { url: previewImage, preview: true },
          newSpot.id)
          )
        .then((res) => {
          console.log("res:", res)
          // spotsAction.addImage(previewImage)
          history.push(`/spots/${spotId}`);
          dispatch(spotsAction.getSpotsBySpotId(+spotId))
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    const last4 = previewImage?.slice(-4);
    const last5 = previewImage?.slice(-5);

    if (description.length < 30) {
      err.description = "Description needs a minimum of 30 characters";
      setErrors(err);
      //  setIsLoaded(false)
    }
    if (
      !previewImage &&
      (last4 !== ".png" || last4 !== ".jpg" || last5 !== ".jpeg")
    ) {
      err.previewImage = "Preview image is required.";
      err.url = "Image URL must end in .png, .jpg, or .jpeg";
      // setErrors(err);
      // setIsLoaded(false);
      // return false
    }
    setCustomError(err);

    // console.log("true or not:", Object.keys(errors).length > 0);
    setErrors(err);

    // console.log("description length: ===> ", description.length < 30);
  };
  console.log("Spots in spotform:::", spotId);
  // console.log('submitType === "Edit":::', submitType === "Edit");
  // console.log('submitType === "Create":::', submitType === "Create");
  const onClickHandler = () => {
    setIsLoaded(true);
  };

  if (!newSpot) return null;

  return (
    <div className="create-new-spot-form">
      <form className="new-spot-form" onSubmit={submitNewSpotHandler}>
        <h1>{formType}</h1>
        <h2 style={{ marginBottom: "2px" }}>Where's your place located?</h2>
        <p
          style={{
            marginTop: "2px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          Guests will only get your exact address once they booked a
          reservation.
        </p>

        <label htmlFor="Country">
          Country {<label className="error-msg">{errors.country}</label>}
        </label>
        <input
          type="text"
          id="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        ></input>

        <label className="form-padding" htmlFor="Address">
          Street Address {<label className="error-msg">{errors.address}</label>}
        </label>
        <input
          type="text"
          id="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        ></input>

        <div className="form-padding" id="city-state">
          <div id="top">
            <label htmlFor="City">
              City {<label className="error-msg">{errors.city}</label>}
            </label>
            <input
              type="text"
              id="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            ></input>
          </div>

          {`,`}

          <div>
            <label htmlFor="State">
              State {<label className="error-msg">{errors.state}</label>}
            </label>
            <input
              type="text"
              id="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="STATE"
            ></input>
          </div>
        </div>

        <div
          className="form-padding"
          id="lat-lng"
          style={{ borderBottom: "black solid" }}
        >
          <div id="lat">
            <label htmlFor="Latitude">
              Latitude {<label className="error-msg">{errors.lat}</label>}
            </label>
            <input
              type="number"
              id="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Latitude"
            ></input>
          </div>

          {`, `}
          <div id="lng">
            <label htmlFor="Longitude">
              Longitude {<label className="error-msg">{errors.lng}</label>}
            </label>
            <input
              type="number"
              id="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="Longitude"
            ></input>
          </div>
        </div>

        <label htmlFor="Description">
          <h2 style={{ marginBottom: "2px" }}>Describe your place to guests</h2>
          <p
            style={{
              marginTop: "1px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
        </label>
        <textarea
          type="text"
          id="Description"
          minLength={30}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please write at least 30 characters"
        ></textarea>
        {<label className="error-msg">{errors.description}</label>}

        {/* <span className="spot_input_"></span> */}

        <label style={{ borderTop: "black solid 2px" }} htmlFor="Name">
          <h2 style={{ marginBottom: "2px" }}>Create a title for your spot</h2>
          <p
            style={{
              marginTop: "1px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
        </label>
        <input
          type="text"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of your Place"
        ></input>
        {<label className="error-msg">{errors.name}</label>}

        <div>
          <label htmlFor="">
            <h2 style={{ marginBottom: "2px" }}>
              Set a base price for your spot
            </h2>
            <p
              style={{
                marginTop: "1px",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
          </label>

          {`$ `}
          <input
            type="number"
            id="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
          ></input>

          {<label className="error-msg">{errors.price}</label>}
        </div>

        <div className="url-input_image">
          <label htmlFor="PreviewImage">
            <h2 style={{ marginBottom: "2px" }}>
              Liven up your spot with photos
            </h2>
            <p
              style={{
                marginTop: "1px",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Submit a link to at least one photo to publish your spot.
            </p>
          </label>
          <div className="url_input">
            <input
              type="url"
              id="preview-image"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              // pattern='*.jpn'
              placeholder="Preview Image URL"
              required
            ></input>
            {<label className="error-msg">{customErrors.previewImage}</label>}
          </div>
          <div className="url_input">
            <label htmlFor="img-url-2"></label>
            <input
              type="text"
              id="preview-image"
              // value={url}
              // onChange={(e) => setUrl(e.target.value)}
              placeholder="Image URL"
            ></input>
            {<label className="error-msg">{customErrors.url}</label>}
          </div>

          <div className="url_input">
            <label htmlFor=""></label>
            <input
              type="text"
              id="preview-image"
              // value=""
              // onChange={(e) => setPreviewImage(e.target.value)}
              placeholder="Image URL"
            ></input>
          </div>

          <div className="url_input">
            <label htmlFor=""></label>
            <input
              type="text"
              id="preview-image"
              // value=""
              // onChange={(e) => setPreviewImage(e.target.value)}
              placeholder="Image URL"
            ></input>
          </div>

          <div>
            <label htmlFor=""></label>
            <input
              type="text"
              id="preview-image"
              // value=""
              // onChange={(e) => setPreviewImage(e.target.value)}
              placeholder="Image URL"
            ></input>
          </div>
        </div>

        {!isLoaded && (
          <div className="create-spot-submit-btn">
            <button
              style={{ color: "white", background: "red" }}
              type="submit"
              // onClick={() => onClickHandler}
            >
              Create Spot
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SpotFormCard;
