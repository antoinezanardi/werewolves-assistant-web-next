<template>
  <div class="row">
    <div class="col-6">
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

    <div class="col-6 d-flex justify-content-end">
      <GitHubRepositoryButton/>
    </div>
  </div>
</template>

<script setup lang="ts">
import GitHubRepositoryButton from "~/components/shared/external/GitHubRepositoryButton/GitHubRepositoryButton.vue";
</script>