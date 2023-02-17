import React from "react";
import MoleculeStructure from "../MoleculeStructure/rdkit";

export interface SyntheticRouteNode {
  value: string;
  rxn?: string;
  mainReactant?: SyntheticRouteNode;
  otherReactants?: string[];
  hasSideRoute?: boolean;
}

export type SyntheticRouteNodeCompProps = {
  node: SyntheticRouteNode;
};

const SyntheticRouteNodeComp: React.FC<SyntheticRouteNodeCompProps> = ({
  node: { value, rxn, mainReactant, otherReactants, hasSideRoute },
}) => {
  return (
    <>
      <MoleculeStructure structure={value} />
      {mainReactant && (
        <>
          <div title={rxn}>{arrow}</div>
          <SyntheticRouteNodeComp node={mainReactant} />
        </>
      )}
    </>
  );
};

const arrow = (
  <svg
    id="arrow"
    viewBox="0 -3 129.33333333333334 6"
    x="665"
    y="113"
    width="120"
    height="12"
    transform="rotate(180)"
  >
    <defs>
      <marker
        id="arrowhead"
        viewBox="0 0 9.333333333333334 6"
        markerUnits="userSpaceOnUse"
        markerWidth="18.666666666666668"
        markerHeight="12"
        refX="2.2"
        refY="2.2"
        orient="auto"
        fill="#222"
      >
        <path d="m 0 0 l 7 2.25 l -7 2.25 c 0 0 0.735 -1.084 0.735 -2.28 c 0 -1.196 -0.735 -2.22 -0.735 -2.22 z"></path>
      </marker>
    </defs>
    <line
      x1="0"
      y1="-0.5"
      x2="120"
      y2="-0.5"
      strokeWidth="1"
      stroke="#222"
      markerEnd="url(#arrowhead)"
    ></line>
  </svg>
);

export default SyntheticRouteNodeComp;
