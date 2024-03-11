<template>
  <div
    id="game-devoted-servant-steal-role-playground"
    class="flex flex-col items-center"
  >
    <GlowCapture>
      <GlowElement>
        <RoleImage
          class="glow:border-gray-400"
          definition="normal"
          :role-name="RoleNames.DEVOTED_SERVANT"
          sizes="175"
        />
      </GlowElement>
    </GlowCapture>

    <h3
      id="devoted-servant-steals-role-question"
      class="my-4"
    >
      {{ devotedServantStealsRoleQuestion }}
    </h3>

    <VuePrimeToggleButton
      id="does-devoted-servant-steal-role-button"
      v-model="doesDevotedServantStealRole"
      class="w-9rem"
      off-icon="fa fa-thumbs-down me-4"
      :off-label="$t('components.GameDevotedServantStealsRolePlayground.sheDoesntStealRole')"
      on-icon="fa fa-thumbs-up me-4 !text-white"
      :on-label="$t('components.GameDevotedServantStealsRolePlayground.sheStealsRole')"
      @change="handleDoesDevotedServantStealRoleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useGamePlay } from "~/composables/api/game/game-play/useGamePlay";
import { PlayerInteraction } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.class";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const { t } = useI18n();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const {
  addMakeGamePlayTargetDto,
  removeMakeGamePlayTargetDto,
} = makeGamePlayDtoStore;

const { getPlayerWithInteractionInCurrentGamePlay } = useGamePlay(game);

const doesDevotedServantStealRole = ref<boolean>(false);

const eliminatedPlayer = computed<Player | undefined>(() => getPlayerWithInteractionInCurrentGamePlay(PlayerInteraction.create({
  source: RoleNames.DEVOTED_SERVANT,
  type: "steal-role",
})));

const devotedServantStealsRoleQuestion = computed<string>(() => {
  const playerName = eliminatedPlayer.value?.name;

  return t("components.GameDevotedServantStealsRolePlayground.doesDevotedServantStealRole", { playerName });
});

function handleDoesDevotedServantStealRoleChange(): void {
  if (eliminatedPlayer.value?._id === undefined) {
    throw createError("Eliminated player is not found.");
  }
  if (doesDevotedServantStealRole.value) {
    addMakeGamePlayTargetDto({ playerId: eliminatedPlayer.value._id });

    return;
  }
  removeMakeGamePlayTargetDto(eliminatedPlayer.value._id);
}
</script>