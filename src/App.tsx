import { Field, Form, Formik } from "formik";
import "./App.css";
import SyntheticRoute from "./components/SyntheticRoute";

interface FormValues {
  target: string;
  max_rxn_steps?: number;
  n_path?: number;
  max_material_cost?: number;
  exclude_substructures?: string[];
  exclude_materials?: string[];
  exclude_rxns?: string[];
}

function App() {
  return (
    <div className="App">
      <Formik<FormValues>
        initialValues={{
          target: "CCOC(=O)C(F)C(NCC(C)C)",
          max_rxn_steps: 3,
          n_path: 5,
        }}
        onSubmit={() => {}}
      >
        <Form>
          <label htmlFor="target">目标分子</label>
          <Field id="target" name="target" />
          <br />

          <label htmlFor="max_rxn_steps">最大实验数</label>
          <Field id="max_rxn_steps" name="max_rxn_steps" type="number" />
          <br />

          <label htmlFor="n_path">路径数</label>
          <Field id="n_path" name="n_path" type="number" />
          <br />

          <label htmlFor="max_material_cost">最大物料花费</label>
          <Field
            id="max_material_cost"
            name="max_material_cost"
            type="number"
          />
          <br />

          <label htmlFor="exclude_substructures">排除分子</label>
          <Field
            id="exclude_substructures"
            name="exclude_substructures"
            type="number"
          />
          <br />

          <label htmlFor="exclude_materials">排除物料</label>
          <Field
            id="exclude_materials"
            name="exclude_materials"
            type="number"
          />
          <br />

          <label htmlFor="exclude_rxns">排除反应</label>
          <Field id="exclude_rxns" name="exclude_rxns" type="number" />
          <br />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
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
