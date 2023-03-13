import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spots";
import AllSpotsCard from "./AllSpotsCard";


const AllSpots = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(spotsAction.getAllSpots())
      .then(setIsLoaded(true))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return res;
      });
  }, [dispatch]);

  if (!spots) return null;

  // console.log("spots:", spots)

  return (
    <div className="AllSpots_container">
      {Object.values(spots).map((spot) => (
        <AllSpotsCard spot={spot} />
      ))}
    </div>
  );
};

export default AllSpots;


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { NavLink, Link, useParams } from "react-router-dom";
// import { getAllSpots } from "../../store/spots";
// import * as spotsAction from "../../store/spots";
// import AllSpotsCard from "./AllSpotsCard";

// const AllSpots = () => {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const { spotId } = useParams();
//   // // before
//   const allSpots = useSelector((state) => state.spots.allSpots);
//   const spots = Object.values(allSpots);

//   // //testing
//   //   const spots = useSelector((state) => state.spots);
//   //   // const spots = Object.values(allSpots);

//   console.log("lo ====> ", spotId);

//   // const clickHandler = (e) => {
//   //     setIsLoaded(true);
//   // }

//   useEffect(() => {
//     dispatch(getAllSpots())
//       .then(setIsLoaded(true))
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) return null;
//       });
//   }, [dispatch]);

//   //  useEffect(() => {
//   //   dispatch(spotsAction.getAllSpots())
//   //   .then(() => setIsLoaded(true));
//   // }, [dispatch]);

//   //  useEffect(() => {
//   //   dispatch(getAllSpots())
//   // }, [dispatch]);

//   // if (!allSpots) return;
//   if (!isLoaded) return;

//   return (
//     <div className="allSpots-container">
//       {spots.map((spot) => (
//         <div key={spot.id}>
//           <AllSpotsCard spot={spot} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllSpots;
