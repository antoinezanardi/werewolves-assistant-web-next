<template>
  <div
    id="index-footer"
    class="flex"
  >
    <div class="flex flex-auto">
      <a
        id="contact-button"
        class="p-button p-button-secondary"
        href="mailto: antoine.zanardi@epitech.eu"
      >
        <span class="fa fa-envelope me-2"/>

        <span>
          {{ $t('components.IndexFooter.contact') }}
        </span>
      </a>
    </div>

    <div class="flex flex-auto justify-end">
      <GitHubRepositoryButton/>
    </div>
  </div>
</template>

<script setup lang="ts">
import GitHubRepositoryButton from "~/components/shared/external/GitHubRepositoryButton/GitHubRepositoryButton.vue";
</script>