import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "definePageMeta", {
    shouldIgnore(path) {
      const isDefinePageMetaCall = node => node?.type === "Identifier" && node.name === "definePageMeta";
      const expression = path.node.expression || path.node.init && path.node.init.callee;

      if (expression?.type === "CallExpression" && isDefinePageMetaCall(expression.callee)) {
        return "The macro definePageMeta from Nuxt is breaking Stryker, so we ignore it.";
      }
      return undefined;
    },
  }),
];