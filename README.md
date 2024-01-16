<p align="center">
  <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/logo/full/werewolves-logo.png?raw=true" width="400" alt="logo"/>
</p>

---

![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=2F73BF)
![Nuxt](https://img.shields.io/badge/-Nuxt-black?style=for-the-badge&logo=nuxt.js&logoColor=00DC81&color=2a2c54)

[![⚙️ Build Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/build.yml/badge.svg)](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/build.yml)
[![🚀 Deploy To Production Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/deploy-to-production.yml/badge.svg)](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/deploy-to-production.yml)

[![GitHub release](https://img.shields.io/github/release/antoinezanardi/werewolves-assistant-web-next.svg)](https://GitHub.com/antoinezanardi/werewolves-assistant-web-next/releases/)
[![semantic-release: conventional commits](https://img.shields.io/badge/semantic--release-conventional%20commits-Æ1A7DBD?logo=semantic-release&color=1E7FBF)](https://github.com/semantic-release/semantic-release)
[![GitHub license](https://img.shields.io/github/license/antoinezanardi/werewolves-assistant-web-next.svg)](https://github.com/antoinezanardi/https://img.shields.io/github/license/werewolves-assistant-web-next.svg/blob/main/LICENSE)
![Dependencies](https://img.shields.io/badge/-dependencies-black?style=flat-square&logoColor=white&logo=pnpm&color=B76507)[![Known Vulnerabilities](https://snyk.io/test/github/antoinezanardi/werewolves-assistant-web-next/badge.svg?targetFile=package.json&style=flat-square)](https://snyk.io/test/github/antoinezanardi/werewolves-assistant-web-next?targetFile=package.json)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)

## 📋 Table of Contents

1. 🐺 [What is this app ?](#what-is-this-app)
2. 🃏 [Available roles](#available-roles)
3. 🔨 [Installation](#installation)
4. 🚀 [Build](#build)
5. 💯 [Tests](#tests)
6. 🌿 [Env variables](#env-variables)
7. ☑️ [Code analysis and consistency](#code-analysis-and-consistency)
8. 📈 [Releases & Changelog](#versions)
9. 🐙 [GitHub Actions](#github-actions)
10. ✨ [Misc commands](#misc-commands)
11. ©️ [License](#license)
12. ❤️ [Contributors](#contributors)

## <a name="what-is-this-app">🐺 What is this app ?</a>
Werewolves Assistant Web is a Nuxt Web App using the Werewolves Assistant API. It helps you, the game master, to manage your games of Werewolves Of Millers Hollow.

This is the **next** version of the current **[Werewolves Assistant Web](https://github.com/antoinezanardi/werewolves-assistant-web)**. It is still under development.

#### 🤔 Want to know more about this awesome project ? <a href="https://werewolves-assistant.antoinezanardi.fr/about" target="_blank">**Check out the dedicated about page**</a>.

## <a name="available-roles">🃏 Available roles</a>

|                <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/werewolf/werewolf-small.jpeg?raw=true" width="40"/><br/>**Werewolf**                |     <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/big-bad-wolf/big-bad-wolf-small.jpeg?raw=true" width="40"/><br/>**Big Bad Wolf**      | <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/accursed-wolf-father/accursed-wolf-father-small.jpeg?raw=true" width="40"/><br/>**Accursed Wolf-Father** |             <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/white-werewolf/white-werewolf-small.jpeg?raw=true" width="40"/><br/>**White Werewolf**             |
|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/villager/villager-small.jpeg?raw=true" width="40"/><br/>**Villager**                |      <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/villager/villager-small.jpeg?raw=true" width="40"/><br/> **Villager-Villager**       |                         <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/seer/seer-small.jpeg?raw=true" width="40"/><br/>**Seer**                         |                          <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/cupid/cupid-small.jpeg?raw=true" width="40"/><br/>**Cupid**                           |
|                    <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/witch/witch-small.jpeg?raw=true" width="40"/><br/>**Witch**                     |              <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/hunter/hunter-small.jpeg?raw=true" width="40"/><br/>**Hunter**               |              <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/little-girl/little-girl-small.jpeg?raw=true" width="40"/><br/>**Little Girl**               |                      <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/defender/defender-small.jpeg?raw=true" width="40"/><br/>**Defender**                      |
|                    <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/elder/elder-small.jpeg?raw=true" width="40"/><br/>**Elder**                     |          <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/scapegoat/scapegoat-small.jpeg?raw=true" width="40"/><br/>**Scapegoat**          |                       <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/idiot/idiot-small.jpeg?raw=true" width="40"/><br/>**Idiot**                        |                 <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/two-sisters/two-sisters-small.jpeg?raw=true" width="40"/><br/>**Two Sisters**                  |
|       <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/three-brothers/three-brothers-small.jpeg?raw=true" width="40"/><br/>**Three Brothers**       |                   <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/fox/fox-small.jpeg?raw=true" width="40"/><br/>**Fox**                   |                <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/bear-tamer/bear-tamer-small.jpeg?raw=true" width="40"/><br/>**Bear Tamer**                |          <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/stuttering-judge/stuttering-judge-small.jpeg?raw=true" width="40"/><br/>**Stuttering Judge**          |
| <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/rusty-sword-knight/rusty-sword-knight-small.jpeg?raw=true" width="40"/><br/>**Rusty Sword Knight** |        <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/wild-child/wild-child-small.jpeg?raw=true" width="40"/><br/>**Wild Child**         |                <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/wolf-hound/wolf-hound-small.jpeg?raw=true" width="40"/><br/>**Wolf-Hound**                |                          <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/thief/thief-small.jpeg?raw=true" width="40"/><br/>**Thief**                           |
|                    <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/angel/angel-small.jpeg?raw=true" width="40"/><br/>**Angel**                     |        <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/pied-piper/pied-piper-small.jpeg?raw=true" width="40"/><br/>**Pied Piper**         |           <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/scandalmonger/scandalmonger-small.jpeg?raw=true" width="40"/><br/>**Scandalmonger**            | <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/prejudiced-manipulator/prejudiced-manipulator-small.jpeg?raw=true" width="40"/><br/>**Prejudiced Manipulator** |
|                    <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/actor/actor-small.jpeg?raw=true" width="40"/><br/>**Actor**                     | <img src="https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/main/public/assets/images/roles/devoted-servant/devoted-servant-small.jpeg?raw=true" width="40"/><br/>**Devoted Servant** |                                                                                                                                                                                                                         |                                                                                                                                                                                                                               |

## <a name="installation">🔨 Installation</a>

To install this project, you will need to have on your machine :

![Node](https://img.shields.io/badge/-nodejs-black?style=for-the-badge&logoColor=white&logo=node.js&color=366A31)
![PNPM](https://img.shields.io/badge/-pnpm-black?style=for-the-badge&logoColor=white&logo=pnpm&color=B76507)

We recommend to use the node version specified in the `.nvmrc` file.

**If you don't have `pnpm` installed, you can still use `npm` for all commands below, but we recommend to use `pnpm` for faster and more reliable installs.**

Then, run the following commands :

```bash
# Install dependencies and Husky hooks
pnpm install

# Run the app in dev mode
pnpm run dev
```

The above command will start the app in development mode and watch for changes on local.

## <a name="build">🚀 Build</a>

In order to build the app for production, run the following command :

```bash
# Build the app
pnpm run build
```

## <a name="tests">💯 Tests</a>

### 🧪 Unit tests

![Vitest](https://img.shields.io/badge/-Vitest-black?style=for-the-badge&logoColor=yellow&logo=vitest&color=30420a)

### 👽 Mutant testing

![Stryker](https://img.shields.io/badge/-Stryker-black?style=for-the-badge&logoColor=white&logo=stryker&color=7F1B10) 

[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fantoinezanardi%2Fwerewolves-assistant-web-next%2Fmain)](https://dashboard.stryker-mutator.io/reports/github.com/antoinezanardi/werewolves-assistant-web-next/main)

You can also check the **[mutation testing report](https://dashboard.stryker-mutator.io/reports/github.com/antoinezanardi/werewolves-assistant-web-next/main#mutant)**.

### ▶️ Commands

Before testing, you must follow the **[installation steps](#installation)**.

Then, run one of the following commands :

```bash
# Assure you started test Docker containers (4 databases are created to parallelize tests)
pnpm run docker:test:start

# Run unit tests with coverage
pnpm run test:unit:cov

# Run unit tests only on staged files (run on pre-commit)
pnpm run test:staged # TODO: Fix this command

# Run mutant tests with coverage
pnpm run test:stryker

# Run mutant tests with coverage from scratch (without using the incremental file)
pnpm run test:stryker:force
```

## <a name="env-variables">🌿 Env variables</a>

Environnement files are available in the **[env directory](https://github.com/antoinezanardi/werewolves-assistant-web-next/tree/main/env)**.

You can create a `.env` file in this directory to override the default values when starting the API locally with `pnpm run dev` command.

Environment variables are :

|                      Name                       |             Description             | Required | Default value |     Limitations     |
|:-----------------------------------------------:|:-----------------------------------:|:--------:|:-------------:|:-------------------:|
| `NUXT_PUBLIC_WEREWOLVES_ASSISTANT_API_BASE_URL` | URL of the Werewolves Assistant API |    ✅     |       ❌       | Must be a valid URL |

## <a name="code-analysis-and-consistency">☑️ Code analysis and consistency</a>

### 🔍 Code linting & formatting

![ESLint](https://img.shields.io/badge/-ESLint-black?style=for-the-badge&logoColor=white&logo=eslint&color=341BAB)

In order to keep the code clean, consistent and free of bad TS practices, more than **300 ESLint rules are activated** !

Complete list of all enabled rules is available in the **[eslintrc.config.js file](https://github.com/antoinezanardi/werewolves-assistant-web-next/blob/master/eslintrc.config.js)**.

### ▶️ Commands

Before linting, you must follow the [installation steps](#installation).

Then, run one of the following commands :

```bash
# Lint 
pnpm run lint

# Lint and fix
pnpm run lint:fix

# Lint and fix only on staged files (runs on pre-commit)
pnpm run lint:staged:fix
```

### 🥇 Project quality scanner

Multiple tools are set up to maintain the best code quality and to prevent vulnerabilities :

![CodeQL](https://img.shields.io/badge/-CodeQL-black?style=for-the-badge&logoColor=white&logo=github&color=2781FE)

You can check the **[CodeQL analysis report here](https://github.com/antoinezanardi/werewolves-assistant-web-next/security/code-scanning)**.

![SonarCloud](https://img.shields.io/badge/-SonarCloud-black?style=for-the-badge&logoColor=white&logo=sonarcloud&color=F37A3A)

SonarCloud summary is available **[here](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)**.

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=coverage)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-web-next&metric=bugs)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-web-next)

## <a name="versions">📈 Releases & Changelog</a>

Releases on **main** branch are generated and published automatically by :

![Semantic Release](https://img.shields.io/badge/-Semantic%20Release-black?style=for-the-badge&logoColor=white&logo=semantic-release&color=000000)

It uses the **[conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)** strategy.

Each change when a new release comes up is listed in the **<a href="https://github.com/antoinezanardi/werewolves-assistant-web-next/blob/master/CHANGELOG.md" target="_blank">CHANGELOG.md file</a>**.

Also, you can keep up with changes by watching releases via the **Watch GitHub button** at the top of this page.

## <a name="github-actions">🐙 GitHub Actions</a>

This project uses **GitHub Actions** to automate some boring tasks.

You can find all the workflows in the **[.github/workflows directory](https://github.com/antoinezanardi/werewolves-assistant-web-next/tree/main/.github/workflows).**

### 🎢 Workflows

|                                                                             Name                                                                             |                                                                                                                                                                          Description & Status                                                                                                                                                                           |                      Triggered on                      |    
|:------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------:|
|                         **[⚙️ Build](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/build.yml)**                          |                                   Various checks for app health, code quality and tests coverage<br/><br/>[![⚙️ Build Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/build.yml/badge.svg)](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/build.yml)                                    | `push` on `develop` and all pull requests to `develop` |
| **[🔃 Lint PR Name Into Develop Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/lint-pr-name-into-develop.yml)** |    Checks if pull request name respects `conventionnal-commit` rules<br/><br/>[![🔃 Lint PR Name Into Develop Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/lint-pr-name-into-develop.yml/badge.svg)](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/lint-pr-name-into-develop.yml)    |         `pull-request` `created` or `updated`          | 
|        **[🔃️ Upsert PR Release Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/upsert-pr-release.yml)**         | Creates or updates pull request to `main` depending on commits on `develop` since last release<br/><br/>[![🔃️ Upsert PR Release Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/upsert-pr-release.yml/badge.svg)](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/upsert-pr-release.yml) |                  `push` on `develop`                   | 
|         **[🏷️ Release Creation Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/release-creation.yml)**          |           Creates a new release using `semantic-release` with tag and updated changelog<br/><br/>[![🏷️ Release Creation Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/release-creation.yml/badge.svg)](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/release-creation.yml)           |                    `push` on `main`                    | 
|      **[🚀 Deploy To Production Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/deploy-to-production.yml)**      |              Deploys app with last tag version to `Docker Hub` and `GCP`<br/><br/>[![🚀 Deploy To Production Workflow](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/deploy-to-production.yml/badge.svg)](https://github.com/antoinezanardi/werewolves-assistant-web-next/actions/workflows/deploy-to-production.yml)               |                     `tag-creation`                     | 

## <a name="misc-commands">✨ Misc commands</a>

### 🔀 Create git branch with a conventional name
```shell
pnpm run script:create-branch
```

### ⤴️ Create pull request against the `develop` branch from current branch
```shell
pnpm run script:create-pull-request
```

### 📣 To all IntelliJ IDEs users (IntelliJ, Webstorm, PHPStorm, etc.)

All the above commands are available in the **.run directory** at the root of the project. 

You can add them as **run configurations** in your IDE.

## <a name="license">©️ License</a>

This project is licensed under the [MIT License](http://opensource.org/licenses/MIT).

## <a name="contributors">❤️ Contributors</a>

There is no contributor yet. Want to be the first ?

If you want to contribute to this project, please read the [**contribution guide**](https://github.com/antoinezanardi/werewolves-assistant-web-next/blob/master/CONTRIBUTING.md).