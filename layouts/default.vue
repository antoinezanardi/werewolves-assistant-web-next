<template>
  <div
    id="default-layout"
    class="d-flex flex-column h-100"
  >
    <NavBar/>

    <div class="content-with-navbar flex-grow-1 h-100">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/components/layouts/default/NavBar/NavBar.vue";
</script>

<style lang="scss" scoped>
.content-with-navbar {
  max-height: calc(100vh - 4rem);
}
</style>