import React, { useCallback, useEffect, useState } from "react";
import { JSMol, RDKitModule } from "@rdkit/rdkit";
import _ from "lodash";
import initRDKit from "../util";

export interface MoleculeStructureProps {
  structure: string;
  className?: string;
  width?: number;
  height?: number;
  subStructure?: string;
  extraDetails?: object;
  drawingDelay?: number;
}

const MoleculeStructure: React.FC<MoleculeStructureProps> = ({
  structure,
  className,
  width = 250,
  height = 200,
  subStructure,
  extraDetails,
}) => {
  const [rdKit, setRdKit] = useState<RDKitModule | undefined>();
  const [rdKitError, setRdKitError] = useState<boolean>(false);
  const [invalidMol, setInvalidMol] = useState<boolean>(false);
  const [svg, setSvg] = useState<string>("");
  const [detail, setDetail] = useState({
    width,
    height,
    bondLineWidth: 1,
    addStereoAnnotation: true,
    ...extraDetails,
  });

  const draw = useCallback(() => {
    if (!rdKit) return;

    const mol = rdKit.get_mol(structure || "invalid");
    const qmol = rdKit.get_qmol(subStructure || "invalid");

    if (!!mol?.is_valid()) {
      const svg = mol.get_svg_with_highlights(getMolDetails(mol, qmol));
      setSvg(svg);
      setInvalidMol(false);
    } else {
      setInvalidMol(true);
    }

    /**
     * Delete C++ mol objects manually
     * https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management
     */
    mol?.delete();
    qmol?.delete();
    console.debug("draw");
  }, [rdKit]);

  useEffect(() => {
    initRDKit()
      .then((rdKit) => {
        setRdKit(rdKit);
        try {
          draw();
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.error(err);
        setRdKitError(true);
      });
  }, [draw]);

  const getMolDetails = useCallback((mol: JSMol, qmol?: JSMol) => {
    if (!!mol?.is_valid() && !!qmol?.is_valid()) {
      const subStructHighlightDetails = JSON.parse(
        mol.get_substruct_matches(qmol)
      );
      const subStructHighlightDetailsMerged = !_.isEmpty(
        subStructHighlightDetails
      )
        ? subStructHighlightDetails.reduce(
            (acc: { atoms: any; bonds: any }, { atoms, bonds }: any) => ({
              atoms: [...acc.atoms, ...atoms],
              bonds: [...acc.bonds, ...bonds],
            }),
            { bonds: [], atoms: [] }
          )
        : subStructHighlightDetails;

      return JSON.stringify({
        ...detail,
        ...subStructHighlightDetailsMerged,
      });
    }

    return JSON.stringify(detail);
  }, []);

  if (!rdKit) {
    return <>"Loading renderer..."</>;
  }
  if (rdKitError) {
    return <>"Error loading renderer"</>;
  }
  if (invalidMol) {
    return (
      <span title={`Cannot render structure: ${structure}`}>Render Error.</span>
    );
  }

  return (
    <div
      title={structure}
      className={className}
      style={{ width: width, height: height }}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></div>
  );
};

export default MoleculeStructure;
