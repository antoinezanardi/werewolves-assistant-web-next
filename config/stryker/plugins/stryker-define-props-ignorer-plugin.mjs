import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineProps", {
    // eslint-disable-next-line complexity
    shouldIgnore(path) {
      const isDefinePropsCall = node => node?.type === "Identifier" && node.name === "defineProps";
      const expression = path.node.expression || path.node.init && path.node.init.callee;
      const ignoreReason = "We can't mutate defineProps macro as it is stated here: https://github.com/stryker-mutator/stryker-js/issues/3305.";

      if (
        expression?.type === "CallExpression" &&
        (isDefinePropsCall(expression.callee) ||
        expression.callee?.name === "withDefaults" &&
        expression.arguments[0]?.type === "CallExpression" &&
        isDefinePropsCall(expression.arguments[0]?.callee))
      ) {
        return ignoreReason;
      }

      const isVariableWithDefineProps =
        path.isVariableDeclarator() &&
        path.node.id.type === "Identifier" &&
        path.node.init?.type === "CallExpression" &&
        (isDefinePropsCall(path.node.init.callee) ||
        path.node.init?.callee?.name === "withDefaults" &&
        path.node.init?.arguments[0]?.type === "CallExpression" &&
        isDefinePropsCall(path.node.init?.arguments[0]?.callee));

      if (isVariableWithDefineProps) {
        return ignoreReason;
      }
      return undefined;
    },
  }),
];