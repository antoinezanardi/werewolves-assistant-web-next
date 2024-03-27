import { addComponent, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  async setup() {
    await addComponent({
      name: "VueFlip",
      export: "VueFlip",
      filePath: "vue-flip",
    });
  },
});