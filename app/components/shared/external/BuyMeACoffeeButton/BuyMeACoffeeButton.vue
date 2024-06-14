<template>
  <a
    href="https://www.buymeacoffee.com/antoinezanardi"
    rel="noopener noreferrer"
    target="_blank"
  >
    <img
      :alt="$t('components.BuyMeACoffeeButton.alt')"
      :src="src"
    >
  </a>
</template>

<script setup lang="ts">
import { stringify } from "qs";
import { objectToSnake } from "ts-case-convert";

const baseUri = "https://img.buymeacoffee.com/button-api";
const urlQueryParams = objectToSnake({
  text: "Buy me a coffee",
  slug: "antoinezanardi",
  buttonColour: "46a6ff",
  fontColour: "FFFFFF",
  fontFamily: "Lato",
  outlineColour: "000000",
  coffeeColour: "FFDD00",
});
const src = `${baseUri}/?${stringify(urlQueryParams)}`;
</script>