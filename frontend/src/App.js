import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SingleSpot from "./components/Spots/SingleSpot";
import CurrentUserSpot from "./components/SpotsOfUser/CurrentUserSpot";
import CurrentUserSpotCreate from "./components/SpotsOfUser/CurrentUserSpotCreate";
import CurrentUserSpotEdit from "./components/SpotsOfUser/CurrentUserSpotEdit";
import Reviews from "./components/Review/Reviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch(spotsAction.getAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={"/"}>
            <AllSpots />
          </Route>
          <Route exact path={`/spots/current`}>
            <CurrentUserSpot/>
          </Route>
          <Route exact path={`/spots/new`}>
            <CurrentUserSpotCreate/>
          </Route>
          <Route exact path={`/spots/:spotId`}>
            <SingleSpot/>
          </Route>
          <Route exact path={`/spots/:spotId/edit`}>
            <CurrentUserSpotEdit/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
