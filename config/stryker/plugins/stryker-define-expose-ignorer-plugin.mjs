import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineExpose", {
    shouldIgnore(path) {
      const isDefinePageMetaCall = node => node?.type === "Identifier" && node.name === "defineExpose";
      const expression = path.node.expression || path.node.init && path.node.init.callee;

      if (expression?.type === "CallExpression" && isDefinePageMetaCall(expression.callee)) {
        return "The macro defineExpose from Nuxt is breaking Stryker, so we ignore it.";
      }
      return undefined;
    },
  }),
];