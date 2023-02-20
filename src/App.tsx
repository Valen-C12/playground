import { Field, Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import "./App.css";
import SyntheticRoute from "./components/SyntheticRoute";
import { useRouteSearch } from "./services/routeSearch";
import { RouteSearchParams } from "./services/routeSearch/type";

function App() {
  const [params, setParams] = useState<RouteSearchParams>({
    target: "CCOC(=O)C(F)C(NCC(C)C)",
    max_rxn_steps: 3,
    n_path: 5,
  });
  const { data, isLoading } = useRouteSearch(params);
  const [displayStyle, setDisplayStyle] = useState<string>("rdKit");

  return (
    <div className="App">
      <Formik<RouteSearchParams>
        initialValues={params}
        onSubmit={(value) => setParams(value)}
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
          <br />

          <div role="group">
            <label>
              <Field
                type="radio"
                name="display"
                value="rdKit"
                onClick={(e) => setDisplayStyle(e.target?.value)}
              />
              rdKit
            </label>
            <label>
              <Field
                type="radio"
                name="display"
                value="smilesDrawer"
                onClick={(e) => setDisplayStyle(e.target?.value)}
              />
              SmilesDrawer
            </label>
          </div>
        </Form>
      </Formik>
      {!isLoading && data?.data ? (
        <SyntheticRoute routes={data.data} display={displayStyle} />
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
