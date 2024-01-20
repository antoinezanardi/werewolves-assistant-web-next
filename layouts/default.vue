<template>
  <div class="d-flex flex-column h-100">
    <NavBar/>

    <div class="flex-grow-1 h-100">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/components/layouts/default/NavBar/NavBar.vue";
</script>