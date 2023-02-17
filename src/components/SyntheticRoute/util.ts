import { SyntheticRoute } from ".";

export interface SyntheticRouteNode {
  value: string;
  mainReactant?: SyntheticRouteNode;
  otherReactants?: string[];
  hasSideRoute?: boolean;
}

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
