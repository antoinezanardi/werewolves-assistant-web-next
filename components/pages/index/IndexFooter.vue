<template>
  <div class="row">
    <div class="col-6">
      <a
        :aria-label="$t('components.IndexFooter.contact')"
        class="p-button p-button-secondary"
        href="mailto: antoine.zanardi@epitech.eu"
      >
        <span class="fa fa-envelope me-2"/>
        {{ $t('components.IndexFooter.contact') }}
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