import React from "react";
import SyntheticRouteNodeComp from "../SyntheticRouteNode";
import { syntheticRouteToNode } from "../util";
import "./index.css";

export interface SyntheticRouteProps {
  routes?: SyntheticRoute[];
  display?: string;
}

/**
 * RetroPath
 */
export interface SyntheticRoute {
  children: SyntheticRoute[];
  rxn: string;
  step: number;
  target: string;
}

const SyntheticRouteComp: React.FC<SyntheticRouteProps> = ({
  routes,
  display,
}) => {
  return (
    <ol className="route-list">
      {routes?.map((route, index) => (
        <li key={index}>
          <div className="route-path">
            <SyntheticRouteNodeComp
              node={syntheticRouteToNode(route)}
              display={display}
            />
          </div>
        </li>
      ))}
    </ol>
  );
};

export default SyntheticRouteComp;
