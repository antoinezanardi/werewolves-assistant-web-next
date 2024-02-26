<template>
  <div
    id="default-layout"
    class="flex flex-col h-full"
  >
    <NavBar/>

    <div class="content-with-navbar grow h-full">
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