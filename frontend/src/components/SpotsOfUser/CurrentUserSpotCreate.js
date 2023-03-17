import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import './CurrentUserSpotCreate.css'
import SpotFormCard from "../Card/SpotFormCard";

const CurrentUserSpotCreate = () => {
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const [country, setCountry] = useState("");
  // const [address, setAddress] = useState("");
  // // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  // const [description, setDescription] = useState("");
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [previewImage, setPreviewImage] = useState("")

  //   const [isLoaded, setIsLoaded] = useState(false);
  //   const [errors, setErrors] = useState([]);

  //   const spots = useSelector((state) => state.spots);
  // console.log("spoot from Create Spot Form.js::::", spots)

  const newSpot = {
    address: "",
    city: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
    name: "",
    description: "",
    price: "",
    previewImage: ""
  };
  // const newImage =  ()



  return (<div>
    {/* <form> */}

    <SpotFormCard newSpot={newSpot} formType="Create New A Spot" submitType="Create" />
    {/* </form> */}
  </div>)

};

export default CurrentUserSpotCreate;
