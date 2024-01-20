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

    <div class="col-6 d-flex justify-content-end text-right">
      <a
        :aria-label="$t('components.IndexFooter.thisProjectIsOpenSource')"
        class="p-button p-button-help"
        href="https://www.github.com/antoinezanardi/werewolves-assistant-web-next"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span class="fa-github fab me-2"/>
        {{ $t('components.IndexFooter.thisProjectIsOpenSource') }}
      </a>
    </div>
  </div>
</template>