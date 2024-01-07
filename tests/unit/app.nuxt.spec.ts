import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@/app.vue";

describe("App Component", () => {
  it("should render component when mounted.", async() => {
    const component = await mountSuspended(App);

    expect(component).toBeTruthy();
  });
});