<template>
  <div id="no-action-needed">
    <h2
      id="no-action-needed-message"
      class="flex flex-col items-center justify-center text-gray-300"
    >
      <FontAwesomeIcon
        class="fa-2x mb-2 text-success"
        icon="thumbs-up"
      />

      <span>
        {{ $t("components.NoActionNeeded.noActionNeeded") }}
      </span>
    </h2>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>