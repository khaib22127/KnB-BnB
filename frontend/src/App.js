import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SingleSpot from "./components/Spots/SingleSpot";

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
          <Route path={`/spots/current`}></Route>
          <Route exact path={`/spots/new`}></Route>
          <Route exact path={`/spots/:spotId`}>
            <SingleSpot/>
          </Route>
          <Route exact path={`/spots/:spotId/edit`}></Route>
          <Route></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
