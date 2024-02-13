import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineModel", {
    shouldIgnore(path) {
      const isDefineEmitsCall = node => node?.type === "Identifier" && node.name === "defineModel";
      const expression = path.node.expression || path.node.init && path.node.init.callee;
      const ignoreReason = "We can't mutate defineModel macro as it is stated here: https://github.com/stryker-mutator/stryker-js/issues/3305.";

      if (expression?.type === "CallExpression" && isDefineEmitsCall(expression.callee)) {
        return ignoreReason;
      }

      const isVariableWithDefineEmits =
        path.isVariableDeclarator() &&
        path.node.id.type === "Identifier" &&
        path.node.init?.type === "CallExpression" &&
        isDefineEmitsCall(path.node.init.callee);

      if (isVariableWithDefineEmits) {
        return ignoreReason;
      }
      return undefined;
    },
  }),
];