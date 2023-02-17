import { RDKitModule } from "@rdkit/rdkit";
import { SyntheticRoute } from "./SyntheticRoute";
import { SyntheticRouteNode } from "./SyntheticRouteNode";

export const syntheticRouteToNode = ({
  target,
  rxn,
  children,
}: SyntheticRoute): SyntheticRouteNode => {
  if (!rxn) {
    return {
      value: target,
    };
  }

  const allChildrenSmiles = rxn.split(">>")[0].split(".");
  const [main, others] = parseChild(children, allChildrenSmiles);
  return {
    value: target,
    rxn,
    mainReactant: syntheticRouteToNode(main),
    otherReactants: others,
    hasSideRoute: children.length > 1,
  };
};

const parseChild = (
  intermediates: SyntheticRoute[],
  allChildrenSmiles: string[]
): [SyntheticRoute, string[]] => {
  if (intermediates.length === 0) {
    const longest = allChildrenSmiles.reduce((acc, cur) =>
      acc.length > cur.length ? acc : cur
    );
    const others = allChildrenSmiles.filter((child) => child !== longest);
    return [{ children: [], rxn: "", step: -1, target: longest }, others];
  }

  const intermediateWithLongestPath = intermediates.reduce((acc, cur) =>
    calTreeDeepth(acc) >= calTreeDeepth(cur) ? acc : cur
  );
  const others = allChildrenSmiles.filter(
    (smile) => smile !== intermediateWithLongestPath.target
  );
  return [intermediateWithLongestPath, others];
};

const calTreeDeepth = ({ children }: SyntheticRoute): number => {
  if (!children.length) {
    return 1;
  }
  return (
    children
      .map((child) => calTreeDeepth(child))
      .reduce((acc, cur) => Math.max(acc, cur)) + 1
  );
};

const initRDKit = (() => {
  let rdkitLoadingPromise: Promise<RDKitModule>;

  return () => {
    /**
     * Utility function ensuring there's only one call made to load RDKit
     * It returns a promise with the resolved RDKit API as value on success,
     * and a rejected promise with the error on failure.
     *
     * The RDKit API is also attached to the global object on successful load.
     */
    if (!rdkitLoadingPromise) {
      rdkitLoadingPromise = new Promise((resolve, reject) => {
        window
          .initRDKitModule()
          .then((RDKit) => {
            window.RDKit = RDKit;
            resolve(RDKit);
          })
          .catch((e) => {
            reject();
          });
      });
    }

    return rdkitLoadingPromise;
  };
})();

export default initRDKit;
