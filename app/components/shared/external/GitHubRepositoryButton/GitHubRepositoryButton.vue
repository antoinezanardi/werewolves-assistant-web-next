<template>
  <a
    id="github-repository-link"
    class="p-button primary"
    href="https://www.github.com/antoinezanardi/werewolves-assistant-web-next"
    rel="noopener noreferrer"
    target="_blank"
  >
    <FontAwesomeIcon
      icon="fab fa-github"
    />

    <span>
      {{ textButton }}
    </span>
  </a>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GitHubRepositoryButtonProps } from "~/components/shared/external/GitHubRepositoryButton/git-hub-repository-button.types";

const props = defineProps<GitHubRepositoryButtonProps>();

const { t } = useI18n();

const textButton = computed<string>(() => {
  if (props.textButton !== undefined) {
    return props.textButton;
  }
  return t("components.GitHubRepositoryButton.thisProjectIsOpenSource");
});
</script>