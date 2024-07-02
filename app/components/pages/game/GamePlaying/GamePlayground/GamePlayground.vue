<template>
  <div
    id="game-playground"
    class="flex flex-col h-full w-full"
  >
    <GamePlaygroundHeader/>

    <CurrentPlayExpectedPlayersToAct class="flex-none"/>

    <CurrentPlayQuestion/>

    <div class="flex justify-center">
      <PrimeVueDivider class="!mb-2 !mt-4 !w-3/4"/>
    </div>

    <GamePlaygroundContent class="grow overflow-y-auto py-2"/>

    <GamePlaygroundFooter/>
  </div>
</template>

<script setup lang="ts">
import CurrentPlayExpectedPlayersToAct from "~/components/pages/game/GamePlaying/GamePlayground/CurrentPlayExpectedPlayersToAct/CurrentPlayExpectedPlayersToAct.vue";
import CurrentPlayQuestion from "~/components/pages/game/GamePlaying/GamePlayground/CurrentPlayQuestion/CurrentPlayQuestion.vue";
import GamePlaygroundContent from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundContent.vue";
import GamePlaygroundFooter from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooter.vue";
import GamePlaygroundHeader from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeader.vue";
</script>