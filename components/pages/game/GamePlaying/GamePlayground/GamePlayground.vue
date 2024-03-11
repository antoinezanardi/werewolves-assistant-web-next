<template>
  <div
    id="game-playground"
    class="flex flex-col h-full w-full"
  >
    <GamePlaygroundHeader/>

    <CurrentPlayExpectedPlayersToAct class="flex-none"/>

    <CurrentPlayQuestion/>

    <GamePlaygroundContent class="grow overflow-y-auto"/>

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