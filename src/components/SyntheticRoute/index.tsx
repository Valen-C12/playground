import React from "react";

export type SyntheticRouteProps = {
  routes?: SyntheticRoute[];
};

/**
 * RetroPath
 */
export interface SyntheticRoute {
  children: SyntheticRoute[];
  rxn: string;
  step: number;
  target: string;
}

const SyntheticRoute: React.FC<SyntheticRouteProps> = ({ routes }) => {
  return (
    <>
      {routes?.map((route) => (
        <></>
      ))}
    </>
  );
};

export default SyntheticRoute;
