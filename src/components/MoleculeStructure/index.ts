export interface MoleculeStructureProps {
  structure: string;
  className?: string;
  width?: number;
  height?: number;
}

export { default as RdKitMoleculeStructure } from "./rdkit";
export { default as SmilesDrawerMoleculeStructure } from "./smilesDrawer";

import { default as RdKitMoleculeStructure } from "./rdkit";
import { default as SmilesDrawerMoleculeStructure } from "./smilesDrawer";
// export default SmilesDrawerMoleculeStructure;
// export default RdKitMoleculeStructure;
