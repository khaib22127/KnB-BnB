import "./CurrentUserSpotCreate.css";
import SpotFormCard from "../Card/SpotFormCard";

const CurrentUserSpotCreate = () => {
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
    previewImage: "",
    preview: true
  };

  return (
    <div>
      <SpotFormCard
        newSpot={newSpot}
        formType="Create New A Spot"
        submitType="Create"
      />
    </div>
  );
};

export default CurrentUserSpotCreate;
