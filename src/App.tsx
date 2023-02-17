import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SyntheticRoute from "./components/SyntheticRoute";

function App() {
  return (
    <div className="App">
      <SyntheticRoute routes={routes} />
    </div>
  );
}

export default App;

const routes = [
  {
    target: "CCOC(=O)C(F)C(NCC(C)C)c1cc(C)c(OC)c(C)c1",
    rxn: "CC(C)(C)[O-].CC(C)CN.CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1.[Li+]>>CCOC(=O)C(F)C(NCC(C)C)c1cc(C)c(OC)c(C)c1",
    children: [
      {
        target: "CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1",
        rxn: "BrP(Br)Br.CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1>>CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1",
        step: 2,
        children: [
          {
            target: "CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1",
            rxn: "CCOC(=O)C(F)Br.COc1c(C)cc(C=O)cc1C.O=S(=O)([O-])O.[K+].[Mn]>>CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1",
            step: 3,
            children: [],
          },
        ],
      },
    ],
    step: 1,
  },
  {
    target: "CCOC(=O)C(F)C(NCC(C)C)c1cc(C)c(OC)c(C)c1",
    rxn: "CC(C)(C)[O-].CC(C)CN.CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1.[Li+]>>CCOC(=O)C(F)C(NCC(C)C)c1cc(C)c(OC)c(C)c1",
    children: [
      {
        target: "CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1",
        rxn: "BrP(Br)Br.CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1>>CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1",
        step: 2,
        children: [
          {
            target: "CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1",
            rxn: "CCOC(=O)C(F)Br.COc1c(C)cc(C=O)cc1C.O=C([O-])O.[Na+].[Zn]>>CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1",
            step: 3,
            children: [],
          },
        ],
      },
    ],
    step: 1,
  },
  {
    target: "CCOC(=O)C(F)C(NCC(C)C)c1cc(C)c(OC)c(C)c1",
    rxn: "CC(C)(C)[O-].CC(C)CN.CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1.[Li+]>>CCOC(=O)C(F)C(NCC(C)C)c1cc(C)c(OC)c(C)c1",
    children: [
      {
        target: "CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1",
        rxn: "BrP(Br)Br.CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1>>CCOC(=O)C(F)C(Br)c1cc(C)c(OC)c(C)c1",
        step: 2,
        children: [
          {
            target: "CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1",
            rxn: "CCCC[N+](CCCC)(CCCC)CCCC.CCOC(=O)C(F)Br.COc1c(C)cc(C=O)cc1C.C[Si](C)(C)Cl.O=C([O-])O.[Cl-].[F-].[Mn].[NH4+].[Na+]>>CCOC(=O)C(F)C(O)c1cc(C)c(OC)c(C)c1",
            step: 3,
            children: [],
          },
        ],
      },
    ],
    step: 1,
  },
];
