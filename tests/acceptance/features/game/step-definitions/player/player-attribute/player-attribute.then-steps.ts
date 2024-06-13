import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPlayerAttributeByRoleNameInGameTeamSide } from "~/tests/acceptance/features/game/helpers/player/player-attribute/player-attribute.then-steps-helpers";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the player with name "(?<name>.+)" should have the attribute seen by seer in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const seenBySeerAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, "The Seer saw this player and thus knows his role.");

  await expect(seenBySeerAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute eaten by werewolves in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const eatenByWerewolvesAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, "The Werewolves ate this player, he'll die the next morning.");

  await expect(eatenByWerewolvesAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute eaten by big bad wolf in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const eatenByBigBadWolfAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, "The Big Bad Wolf ate this player, he'll die the next morning.");

  await expect(eatenByBigBadWolfAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute acting by actor in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const actingByActorAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, "The player is acting, he's playing another role for the current turn.");

  await expect(actingByActorAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute charmed by pied piper in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const charmedByPiedPiperAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, "The Pied Piper charmed this player.");

  await expect(charmedByPiedPiperAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute contaminated by rusty sword knight in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The Rusty Sword Knight contaminated this player, he'll be eliminated the next night.";
  const contaminatedByRustySwordKnightAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(contaminatedByRustySwordKnightAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute drank life potion by witch in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The Witch gave a life potion to this player, he'll be saved from werewolves.";
  const drankLifePotionByWitchAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(drankLifePotionByWitchAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute eaten by white werewolf in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The White Werewolf ate this player, he'll die the next morning.";
  const eatenByWhiteWerewolfAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(eatenByWhiteWerewolfAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute in love by cupid in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "Cupid made this player fall in love with another one.";
  const inLoveByCupidAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(inLoveByCupidAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute powerless by actor in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The player can't act anymore, he's powerless.";
  const powerlessByActorAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(powerlessByActorAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should(?<notPowerless> not)? have the attribute powerless by werewolves in the game$/u, async function(this: CustomWorld, name: string, notPowerless: string | null): Promise<void> {
  const roleName = "The player became powerless because he became a werewolf.";
  const powerlessByWerewolvesAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  if (notPowerless !== null) {
    await expect(powerlessByWerewolvesAttribute).toBeHidden();

    return;
  }
  await expect(powerlessByWerewolvesAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute powerless by accursed wolf father in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The player became powerless because he was infected by the Accursed Father of Wolves.";
  const powerlessByAccursedWolfFatherAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(powerlessByAccursedWolfFatherAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute powerless by fox in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The player became powerless because he didn't sniff a werewolf in his last turn.";
  const powerlessByFoxAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(powerlessByFoxAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute powerless by elder in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The player became powerless because one or more villagers eliminated the Elder.";
  const powerlessByElderAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(powerlessByElderAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute protected by defender in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The Defender protects this player from the werewolves for the current night.";
  const protectedByDefenderAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(protectedByDefenderAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute scandalmonger marked by scandalmonger in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The Scandalmonger marked this player, he'll have 2 more votes against him the next morning.";
  const scandalmongerMarkedByScandalmongerAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(scandalmongerMarkedByScandalmongerAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute sheriff by sheriff in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The player became the Sheriff because the previous Sheriff delegated his role to him.";
  const sheriffBySheriffAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(sheriffBySheriffAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute sheriff by survivors in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The survivors elected this player as the Sheriff.";
  const sheriffBySurvivorsAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(sheriffBySurvivorsAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute stolen role by devoted servant in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The Devoted Servant stole the role of this player.";
  const stolenRoleByDevotedServantAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(stolenRoleByDevotedServantAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute worshiped by wild child in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The Wild Child chose this player as his model.";
  const worshipedByWildChildAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(worshipedByWildChildAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute scandalmonger-marked by scandalmonger in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleName = "The Scandalmonger marked this player, he'll have 2 more votes against him the next morning.";
  const worshipedByWildChildAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, roleName);

  await expect(worshipedByWildChildAttribute).toBeVisible();
});