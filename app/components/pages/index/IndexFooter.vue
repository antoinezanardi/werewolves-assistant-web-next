<template>
  <div
    id="index-footer"
    class="flex"
  >
    <div class="flex flex-auto">
      <a
        id="contact-button"
        class="p-button p-button-secondary"
        :href="contactButtonHref"
      >
        <FontAwesomeIcon
          icon="envelope"
        />

        <span class="hidden md:inline">
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import GitHubRepositoryButton from "~/components/shared/external/GitHubRepositoryButton/GitHubRepositoryButton.vue";

const runtimeConfig = useRuntimeConfig();

const contactButtonHref = computed<string>(() => `mailto:${runtimeConfig.public.contactEmail}`);
</script>