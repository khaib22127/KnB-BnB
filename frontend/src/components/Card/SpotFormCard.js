import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import "./SpotFormCard.css";

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

  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [customErrors, setCustomError] = useState({});


  const submitNewSpotHandler = (e) => {
    e.preventDefault();
    setErrors({});
    setCustomError([]);
    let err = { ...customErrors };

    if (submitType === "Create") {
      dispatch(
        (newSpot = spotsAction.createSpot(
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
          { url: previewImage, preview: true }
        ))
      )
        .then((res) => {
          history.push(`/spots/${res.id}`);
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    if (submitType === "Edit") {
      dispatch(
        (newSpot = spotsAction.editUserSpot(
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
          newSpot.id
        ))
      )
        .then(() => {
          history.push(`/spots/${spotId}`);
          dispatch(spotsAction.getSpotsBySpotId(+spotId));
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    if (description.length < 30) {
      err.description = "Description needs a minimum of 30 characters";
    }
    if (!previewImage) {
      err.previewImage = "Preview image is required.";
    }


    if (!(previewImage.endsWith(".png" || ".jpg" || ".jpeg"))) {
        err.url = "Image URL must end in .png, .jpg, or .jpeg";
      } else {
        return;
    }

    setCustomError(err);
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
              // pattern={}
              placeholder="Preview Image URL"
              // required
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
            <button style={{ color: "white", background: "red" }} type="submit">
              Create Spot
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SpotFormCard;
