import React from "react";
import { syntheticRouteToNode } from "./util";

export interface SyntheticRouteProps {
  routes?: SyntheticRoute[];
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

const SyntheticRouteComp: React.FC<SyntheticRouteProps> = ({ routes }) => {
  return (
    <ol>
      {routes?.map((route) => {
        const node = syntheticRouteToNode(route);
        return <li>
          
        </li>;
      })}
    </ol>
  );
};

export default SyntheticRouteComp;
