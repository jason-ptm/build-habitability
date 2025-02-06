import { Navigate, Route, Routes } from "react-router";
import { RoutePaths } from "./routes";
import { Wrapper } from "../wrappers";
import {
  Activity,
  Ambient,
  Apartment,
  Build,
  Material,
  People,
  Solution,
  Wall,
} from "../views";

export const Router = () => {
  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Navigate to={RoutePaths.HOME.path} />} />
          <Route path={RoutePaths.HOME.path} element={<h1>Home</h1>} />
          <Route path={RoutePaths.SOLUTION.path} element={<Solution />} />
          <Route path={`${RoutePaths.CONFIGURATION.path}/`}>
            <Route
              path=""
              element={
                <Navigate
                  to={RoutePaths.CONFIGURATION.extraPaths.ACTIVITY.path}
                />
              }
            />
            <Route
              path={RoutePaths.CONFIGURATION.extraPaths.ACTIVITY.path}
              element={<Activity />}
            />
            <Route
              path={RoutePaths.CONFIGURATION.extraPaths.AMBIENT.path}
              element={<Ambient />}
            />
            <Route
              path={RoutePaths.CONFIGURATION.extraPaths.APARTMENT.path}
              element={<Apartment />}
            />
            <Route
              path={RoutePaths.CONFIGURATION.extraPaths.BUILD.path}
              element={<Build />}
            />
            <Route
              path={RoutePaths.CONFIGURATION.extraPaths.PEOPLE.path}
              element={<People />}
            />
            <Route
              path={RoutePaths.CONFIGURATION.extraPaths.MATERIAL.path}
              element={<Material />}
            />
            <Route
              path={RoutePaths.CONFIGURATION.extraPaths.WALL.path}
              element={<Wall />}
            />
          </Route>
          <Route path="*" element={<Navigate to={RoutePaths.HOME.path} />} />
        </Routes>
      </Wrapper>
    </>
  );
};
