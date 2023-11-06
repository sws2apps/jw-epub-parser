# [3.4.0](https://github.com/sws2apps/jw-epub-parser/compare/v3.3.0...v3.4.0) (2023-10-30)


### Features

* **deps:** bump node-html-parser from 6.1.10 to 6.1.11 ([88dc4c6](https://github.com/sws2apps/jw-epub-parser/commit/88dc4c67d434335904213c5503aca71dd538d74c))
* **localize:** updated translation from Crowdin ([87cbaff](https://github.com/sws2apps/jw-epub-parser/commit/87cbaff5a0dd59363398a5a2cdb6e9c1b1e05030))

# [3.3.0](https://github.com/sws2apps/jw-epub-parser/compare/v3.2.0...v3.3.0) (2023-10-22)


### Features

* **module:** support parsing watchtower epub starting 202401 ([c6e8ba8](https://github.com/sws2apps/jw-epub-parser/commit/c6e8ba892be4854ab71b6f38795d835faeaa07c4))

# [3.2.0](https://github.com/sws2apps/jw-epub-parser/compare/v3.1.0...v3.2.0) (2023-10-14)


### Features

* **localize:** updated translation from Crowdin ([f2b5d91](https://github.com/sws2apps/jw-epub-parser/commit/f2b5d91045cf7f6298254af5422b5873d53299e0))

# [3.1.0](https://github.com/sws2apps/jw-epub-parser/compare/v3.0.1...v3.1.0) (2023-10-13)


### Features

* **localize:** updated translation from Crowdin ([d0889ad](https://github.com/sws2apps/jw-epub-parser/commit/d0889ad7d91fdbb7ad796d42f01ae7a58193f837))

## [3.0.1](https://github.com/sws2apps/jw-epub-parser/compare/v3.0.0...v3.0.1) (2023-10-08)


### Bug Fixes

* **module:** temporarily block parsing mwb starting issue 202401 ([f5bd2d8](https://github.com/sws2apps/jw-epub-parser/commit/f5bd2d89cb4368948f0af4499edc857dc7056651))

# [3.0.0](https://github.com/sws2apps/jw-epub-parser/compare/v2.1.0...v3.0.0) (2023-09-27)


### Features

* **deps:** update semantic-release to latest version ([63133a2](https://github.com/sws2apps/jw-epub-parser/commit/63133a2cd74f8edac3691d28b52a552c845bb1f9))


### BREAKING CHANGES

* **deps:** The `week_date` value in enhanced parsing is now formatted as `yyyy/mm/dd`

# [2.1.0](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0...v2.1.0) (2023-09-27)


### Features

* **deps:** bump node-html-parser from 6.1.6 to 6.1.9 ([e63d3a5](https://github.com/sws2apps/jw-epub-parser/commit/e63d3a5f8eb9c087a609f0d5698193fb087a1570))
* **deps:** bump node-html-parser from 6.1.9 to 6.1.10 ([77bc774](https://github.com/sws2apps/jw-epub-parser/commit/77bc7742423978091094fe4a370cbef6eca97d5b))
* **module:** change week date format to yyyy/mm/dd ([2bf8f5e](https://github.com/sws2apps/jw-epub-parser/commit/2bf8f5eccdc5efd2b886fdcd3325998808867f35))

# [2.0.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.41.0...v2.0.0) (2023-09-12)


### Features

* **deps:** bump @cypress/request and cypress ([c22a63a](https://github.com/sws2apps/jw-epub-parser/commit/c22a63a99a2c562ce7787733dc1977f57ae0def9))
* **module:** parse meeting data from Watchtower Study epub file ([47f6406](https://github.com/sws2apps/jw-epub-parser/commit/47f64063dd39b38907256806033e3582f724aeb1))


### BREAKING CHANGES

* **module:** With this release, the `loadEPUB` function will return an array of objects, containing all the weekly source materials. The property names were all adjusted. Also the, the study point for students parts is no longer a separate property. It is now included with the source part.

# [2.0.0-beta.9](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2023-08-21)


### Features

* **module:** add functions to parse meeting data from wol ([eb82157](https://github.com/sws2apps/jw-epub-parser/commit/eb821575791e60fb0bc37173829089e0bc98d646))

# [2.0.0-beta.8](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2023-08-18)


### Features

* **module:** use node-html-parser to parse html strings ([d8e6609](https://github.com/sws2apps/jw-epub-parser/commit/d8e6609508b925a8d75f507a45cee5b31c4fe6b1))

# [2.0.0-beta.7](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2023-08-16)


### Features

* **module:** add support for German and Ukrainian languages [from main] ([3685010](https://github.com/sws2apps/jw-epub-parser/commit/368501084e458a53b8c4d28c03cdd0c71a0ecf65))

# [1.41.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.40.1...v1.41.0) (2023-08-14)


### Features

* **deps:** bump global-jsdom from 9.0.1 to 9.1.0 ([1949863](https://github.com/sws2apps/jw-epub-parser/commit/194986319f730e4063bad9b78127edcd7fa97db8))
* **deps:** bump node-fetch from 3.3.1 to 3.3.2 ([4e3fb87](https://github.com/sws2apps/jw-epub-parser/commit/4e3fb8707d93cc9c94c93d9ee9e262f7b3a59cf7))
* **deps:** bump tough-cookie from 4.1.2 to 4.1.3 ([debb7b1](https://github.com/sws2apps/jw-epub-parser/commit/debb7b11f4361122bcb356eeb47417c034e0cb15))
* **module:** add support for German and Ukrainian languages ([bb15d93](https://github.com/sws2apps/jw-epub-parser/commit/bb15d93fb459a466f267228b741d50a6bfe61a7a))

# [2.0.0-beta.6](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2023-07-12)


### Bug Fixes

* **rules:** wrong week date parsed from wt study ([5adbf91](https://github.com/sws2apps/jw-epub-parser/commit/5adbf91b3b844c7207f13ac67d97909f1c15c909))

# [2.0.0-beta.5](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2023-07-05)


### Features

* **module:** add support for madagascar sign language ([21b26b9](https://github.com/sws2apps/jw-epub-parser/commit/21b26b919676917dd0a127acf81183c74d1843d7))

# [2.0.0-beta.4](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2023-06-24)


### Bug Fixes

* **module:** update property names for living parts ([af9318c](https://github.com/sws2apps/jw-epub-parser/commit/af9318cc5b8e926924b8351c3c0025ed28838b2f))

# [2.0.0-beta.3](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2023-06-24)


### Bug Fixes

* **browser:** global variables not accessible ([1282e30](https://github.com/sws2apps/jw-epub-parser/commit/1282e300f9e9a33ff2e8cbf49f6a8936d2f59be2))

# [2.0.0-beta.2](https://github.com/sws2apps/jw-epub-parser/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2023-06-23)


### Bug Fixes

* force version bump ([271c237](https://github.com/sws2apps/jw-epub-parser/commit/271c237763335d2afec051331b6d7dc90ed34dd5))

# [2.0.0-beta.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.40.1...v2.0.0-beta.1) (2023-06-23)


### Features

* **module:** remove study point from students parts and properties change ([dfc2bec](https://github.com/sws2apps/jw-epub-parser/commit/dfc2bec0545a19b82e9665b014d89248a678d246))


### BREAKING CHANGES

* **module:** With this release, the `loadEPUB` function will return an array of objects, containing all the weekly source materials. The property names were all adjusted. Also the, the study point for students parts is no longer a separate property. It is now included with the source part.

## [1.40.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.40.0...v1.40.1) (2023-06-05)


### Bug Fixes

* **module:** force bump version to include latest translation ([346ba29](https://github.com/sws2apps/jw-epub-parser/commit/346ba299b736f5ff6f9d55c82f9047fa02239b5f))

# [1.40.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.39.0...v1.40.0) (2023-05-29)


### Features

* **deps:** bump jsdom and global-jsdom ([d6fb0b5](https://github.com/sws2apps/jw-epub-parser/commit/d6fb0b57c63e947f209410f5921f350ed98f8420))
* **deps:** bump jsdom from 21.1.1 to 21.1.2 ([cc25de4](https://github.com/sws2apps/jw-epub-parser/commit/cc25de401574c6596a55761ab440072e6dcf4729))
* **deps:** bump jsdom from 22.0.0 to 22.1.0 ([cf8ebf1](https://github.com/sws2apps/jw-epub-parser/commit/cf8ebf1ebd6ea715da524762438d32f1f1117ec3))

# [1.39.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.38.1...v1.39.0) (2023-04-25)


### Bug Fixes

* **module:** reduce code smells ([72ecb7e](https://github.com/sws2apps/jw-epub-parser/commit/72ecb7e0ea0d0dc8760fef8976cbc6453f4b68e6))


### Features

* **deps:** bump yaml and semantic-release ([27b33ee](https://github.com/sws2apps/jw-epub-parser/commit/27b33ee6e8bfad6a544d999f5815235e6622e599))

## [1.38.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.38.0...v1.38.1) (2023-04-20)


### Bug Fixes

* **module:** add job permission for each environment ([86968fb](https://github.com/sws2apps/jw-epub-parser/commit/86968fbda414114bb4ca561accf5fc499c0afc4d))

# [1.38.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.37.0...v1.38.0) (2023-04-20)


### Features

* **deps:** bump @babel/preset-env from 7.20.2 to 7.21.4 ([1bcafb3](https://github.com/sws2apps/jw-epub-parser/commit/1bcafb3e56a736edfb86ac5b693c9b58306ffe61))
* **deps:** bump @rollup/plugin-commonjs from 24.0.1 to 24.1.0 ([efca902](https://github.com/sws2apps/jw-epub-parser/commit/efca9022bc336c42f0034164f7a6b0d617cb0f83))
* **deps:** bump @rollup/plugin-node-resolve from 15.0.1 to 15.0.2 ([ae32efd](https://github.com/sws2apps/jw-epub-parser/commit/ae32efd593162d9b75f6e2cecbc62fb3ba04973d))
* **deps:** bump rimraf from 4.4.1 to 5.0.0 ([52c65c6](https://github.com/sws2apps/jw-epub-parser/commit/52c65c63e93b9d4a41d5dcc3fd57cf8de665c6bc))
* **deps:** bump rollup from 3.20.2 to 3.20.3 ([a6452ab](https://github.com/sws2apps/jw-epub-parser/commit/a6452ab3d7074d2a3901f4eafc92dd42f69932b0))
* **module:** add provenance setting ([812ffc1](https://github.com/sws2apps/jw-epub-parser/commit/812ffc13b82ee50c384e68b827733ace0c53fcc0))

# [1.37.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.36.0...v1.37.0) (2023-04-01)


### Bug Fixes

* **module:** update html element to get source text ([4e98136](https://github.com/sws2apps/jw-epub-parser/commit/4e98136bfaae2ecdadee97c29a388a61f0e37693))


### Features

* **deps:** bump @semantic-release/changelog from 6.0.2 to 6.0.3 ([de4ce5a](https://github.com/sws2apps/jw-epub-parser/commit/de4ce5ad8c0a84ba44368f776fbc7a13c57d522d))
* **deps:** bump global-jsdom from 8.7.0 to 8.8.0 ([7bf2766](https://github.com/sws2apps/jw-epub-parser/commit/7bf2766f9f1780ab6ea24d9fdce04d6b40f6d182))
* **deps:** bump rimraf from 4.4.0 to 4.4.1 ([bc16fb6](https://github.com/sws2apps/jw-epub-parser/commit/bc16fb63aa0fd5476f58981ae993f05a91c7a2ad))
* **deps:** bump rollup from 3.19.1 to 3.20.0 ([9631d29](https://github.com/sws2apps/jw-epub-parser/commit/9631d299bffaa2ffc3ffc7e0d57b28b2e0891bce))
* **deps:** bump rollup from 3.20.0 to 3.20.1 ([0a73787](https://github.com/sws2apps/jw-epub-parser/commit/0a7378787615aac06b4c861bb0716ccf294d5f39))
* **deps:** bump rollup from 3.20.1 to 3.20.2 ([0b9cb03](https://github.com/sws2apps/jw-epub-parser/commit/0b9cb033bed9852674428a006103904a3f7d7694))

# [1.36.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.35.0...v1.36.0) (2023-03-13)


### Features

* **deps:** bump jsdom from 21.1.0 to 21.1.1 ([48025ba](https://github.com/sws2apps/jw-epub-parser/commit/48025ba3b4df31d8c2d1404d9e541f1c03b1fe44))
* **deps:** bump node-fetch from 3.3.0 to 3.3.1 ([c8ae05c](https://github.com/sws2apps/jw-epub-parser/commit/c8ae05cc54190c82ac1691d64180810dff7281cd))
* **deps:** bump rimraf from 4.1.2 to 4.1.3 ([b8a1952](https://github.com/sws2apps/jw-epub-parser/commit/b8a19523f1b6775c46ab659fc83d2abddbdfc586))
* **deps:** bump rimraf from 4.1.3 to 4.2.0 ([a055786](https://github.com/sws2apps/jw-epub-parser/commit/a055786313e7573d27a65cb052ed076b165f6e50))
* **deps:** bump rimraf from 4.2.0 to 4.3.0 ([c71c31c](https://github.com/sws2apps/jw-epub-parser/commit/c71c31cfc7345f4d15419fb1c83111c28af777b2))
* **deps:** bump rimraf from 4.3.0 to 4.3.1 ([1cf716f](https://github.com/sws2apps/jw-epub-parser/commit/1cf716f842daa8e628c5bdff77399a4625ad367a))
* **deps:** bump rimraf from 4.3.1 to 4.4.0 ([0a7bfcb](https://github.com/sws2apps/jw-epub-parser/commit/0a7bfcb635354c6f65a4da537fa90aa41a9749af))
* **deps:** bump rollup from 3.17.3 to 3.18.0 ([544c69c](https://github.com/sws2apps/jw-epub-parser/commit/544c69c52ea6c86eeb9d6fa5ade8c40249f5d085))
* **deps:** bump rollup from 3.18.0 to 3.19.0 ([9331762](https://github.com/sws2apps/jw-epub-parser/commit/93317628b73a835c5d087aa013bf98808f1a1287))
* **deps:** bump rollup from 3.19.0 to 3.19.1 ([f5b987b](https://github.com/sws2apps/jw-epub-parser/commit/f5b987b130fe3644b3310169c5510cbb5e7b94d4))

# [1.35.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.34.0...v1.35.0) (2023-02-27)


### Features

* **browser:** add support for loading epub from url ([7a48063](https://github.com/sws2apps/jw-epub-parser/commit/7a48063fd175c86536dbd95c1882ce8960fb1c0e))

# [1.34.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.33.0...v1.34.0) (2023-02-27)


### Features

* **deps:** bump rollup from 3.17.2 to 3.17.3 ([059a9ce](https://github.com/sws2apps/jw-epub-parser/commit/059a9ce5a82822aeee40f68d52db6d807e7bf9a6))
* **module:** don’t parse meeting workbook prior to july 2022 ([1738328](https://github.com/sws2apps/jw-epub-parser/commit/173832828efec42bf22c6c96be8e18f8fd3e5774))

# [1.33.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.32.1...v1.33.0) (2023-02-26)


### Bug Fixes

* **parsing:** fix issue when week date spans between two months ([c051f1f](https://github.com/sws2apps/jw-epub-parser/commit/c051f1fa6b5ab704a3586296f8f97397c3145b39))


### Features

* **deps:** bump rollup from 3.15.0 to 3.17.1 ([0e37849](https://github.com/sws2apps/jw-epub-parser/commit/0e37849ee48dc2711c0cab205f2453607b3c9859))
* **deps:** bump rollup from 3.17.1 to 3.17.2 ([c779e7e](https://github.com/sws2apps/jw-epub-parser/commit/c779e7ed9a7c55ad170a1b4a0a55a7cde1cf26e7))

## [1.32.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.32.0...v1.32.1) (2023-02-19)


### Bug Fixes

* **rules:** update language rules for F and TND ([c1813c1](https://github.com/sws2apps/jw-epub-parser/commit/c1813c10973310652fd3f5abcfb108c9642ad2c4))

# [1.32.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.31.1...v1.32.0) (2023-02-17)


### Features

* **deps:** bump rollup from 3.14.0 to 3.15.0 ([e58a752](https://github.com/sws2apps/jw-epub-parser/commit/e58a752d9ef0c9337fad7b0f19147b86327ff88c))
* **module:** improve parsing rules ([eb5da5f](https://github.com/sws2apps/jw-epub-parser/commit/eb5da5f8377bd36e41ab9d480a8e315426710498))

## [1.31.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.31.0...v1.31.1) (2023-02-12)


### Bug Fixes

* **browser:** add missing parameters preventing import ([d6cb959](https://github.com/sws2apps/jw-epub-parser/commit/d6cb95916a43b9996074b2c32a4888f1df346602))

# [1.31.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.5...v1.31.0) (2023-02-10)


### Features

* **browser:** allow fetch from url ([f3fe773](https://github.com/sws2apps/jw-epub-parser/commit/f3fe7737b104a1d037b2b136862138dc40fc75a2))

## [1.30.5](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.4...v1.30.5) (2023-02-09)


### Bug Fixes

* **module:** restore back support for language without epub ([1496414](https://github.com/sws2apps/jw-epub-parser/commit/14964146869a97b8a994a542feee4e18b177455c))

## [1.30.4](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.3...v1.30.4) (2023-02-08)


### Bug Fixes

* **module:** cleanup reference to invalid language ([6f669cd](https://github.com/sws2apps/jw-epub-parser/commit/6f669cd05d62d6c75c346ff0d3854ae974653bc7))

## [1.30.3](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.2...v1.30.3) (2023-02-08)


### Bug Fixes

* **module:** remove support for languages without epub file ([cab36cd](https://github.com/sws2apps/jw-epub-parser/commit/cab36cd4b8c8245cf8f110a591282e2c1775cb39))

## [1.30.3](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.2...v1.30.3) (2023-02-08)


### Bug Fixes

* **module:** remove support for languages without epub file ([cab36cd](https://github.com/sws2apps/jw-epub-parser/commit/cab36cd4b8c8245cf8f110a591282e2c1775cb39))

## [1.30.2](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.1...v1.30.2) (2023-02-08)


### Bug Fixes

* **parsing-rules:** fix assignment timing when number is found in type ([819b38c](https://github.com/sws2apps/jw-epub-parser/commit/819b38c1bb1a3bc33fc02c723232d59a5dc89263))

## [1.30.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.0...v1.30.1) (2023-02-07)


### Bug Fixes

* **parsing-rules:** exit weekdate extraction as soon as value is set ([641aaf8](https://github.com/sws2apps/jw-epub-parser/commit/641aaf8683f440e8a6b34fbaedb13ca33bc97e72))

# [1.30.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.29.0...v1.30.0) (2023-02-07)


### Features

* **deps:** bump @rollup/plugin-commonjs from 23.0.4 to 23.0.5 ([b33cf4d](https://github.com/sws2apps/jw-epub-parser/commit/b33cf4dbb49a648bfbc2683f6cf38cdb853e95c1))
* **deps:** bump @rollup/plugin-commonjs from 23.0.5 to 24.0.0 ([dfbe27a](https://github.com/sws2apps/jw-epub-parser/commit/dfbe27ab6e8c084a3a444f12369e1e43e894c230))
* **deps:** bump @rollup/plugin-commonjs from 24.0.0 to 24.0.1 ([748c419](https://github.com/sws2apps/jw-epub-parser/commit/748c419d2363405206835bd85b892bee26fcff12))
* **deps:** bump global-jsdom from 8.6.0 to 8.7.0 ([cf076a4](https://github.com/sws2apps/jw-epub-parser/commit/cf076a4162a9c25bf18150058391f404d18f10a6))
* **deps:** bump jsdom from 20.0.3 to 21.0.0 ([d9c314d](https://github.com/sws2apps/jw-epub-parser/commit/d9c314daf1762646387763f87c8327e22c0d4f5d))
* **deps:** bump jsdom from 21.0.0 to 21.1.0 ([5b38e2b](https://github.com/sws2apps/jw-epub-parser/commit/5b38e2b6f98e5f271b2ce9f5c46b628a51d06bbd))
* **deps:** bump mocha from 10.1.0 to 10.2.0 ([a2e955b](https://github.com/sws2apps/jw-epub-parser/commit/a2e955b453b51cbc36f5a25327284a33a1837478))
* **deps:** bump rimraf from 3.0.2 to 4.0.4 ([af15517](https://github.com/sws2apps/jw-epub-parser/commit/af1551722b070d78ef298d6e5c175c7d9a0fa217))
* **deps:** bump rimraf from 4.0.4 to 4.0.7 ([9502956](https://github.com/sws2apps/jw-epub-parser/commit/95029563ccb8b68488979f582be8b814d97fda9e))
* **deps:** bump rimraf from 4.0.7 to 4.1.0 ([fe524c7](https://github.com/sws2apps/jw-epub-parser/commit/fe524c7a29d5f31fad5f3b2ef9487603ae6f97c1))
* **deps:** bump rimraf from 4.1.0 to 4.1.1 ([e91f4ad](https://github.com/sws2apps/jw-epub-parser/commit/e91f4ad5001e8e78faa83b0a417b69b91e7b534d))
* **deps:** bump rimraf from 4.1.1 to 4.1.2 ([13cd6de](https://github.com/sws2apps/jw-epub-parser/commit/13cd6debebf31dcac3f88d2dc5c92414e50697be))
* **deps:** bump rollup from 3.10.0 to 3.10.1 ([996d1df](https://github.com/sws2apps/jw-epub-parser/commit/996d1df59ea93288cc5b5d062494e51da90df07e))
* **deps:** bump rollup from 3.10.1 to 3.11.0 ([cc49d2f](https://github.com/sws2apps/jw-epub-parser/commit/cc49d2fd1c0fbd3763b52f8ff9ef0d51ff79afdf))
* **deps:** bump rollup from 3.11.0 to 3.12.0 ([5f3b3e9](https://github.com/sws2apps/jw-epub-parser/commit/5f3b3e9436acefbc0ab77fa5d992d446110eb19d))
* **deps:** bump rollup from 3.12.0 to 3.12.1 ([937da81](https://github.com/sws2apps/jw-epub-parser/commit/937da8102dbfc78e0175d5fa86afc46ab9ae70e5))
* **deps:** bump rollup from 3.12.1 to 3.14.0 ([cad40fd](https://github.com/sws2apps/jw-epub-parser/commit/cad40fd6e7599f9fadfbd43ffa2169085a946f2a))
* **deps:** bump rollup from 3.7.0 to 3.7.3 ([e6b9ecb](https://github.com/sws2apps/jw-epub-parser/commit/e6b9ecb1fb5964fd5a9e3317541015a820d7a094))
* **deps:** bump rollup from 3.7.3 to 3.7.4 ([36e6495](https://github.com/sws2apps/jw-epub-parser/commit/36e64959b6c1d73389314888706e208090fa511c))
* **deps:** bump rollup from 3.7.4 to 3.7.5 ([2fc29bb](https://github.com/sws2apps/jw-epub-parser/commit/2fc29bbc67639ccca17c911e315158ddbe2552de))
* **deps:** bump rollup from 3.7.5 to 3.8.0 ([ab80d49](https://github.com/sws2apps/jw-epub-parser/commit/ab80d499648d4f1990ba9042702df43f1a7b2c5f))
* **deps:** bump rollup from 3.8.0 to 3.8.1 ([daf7c7a](https://github.com/sws2apps/jw-epub-parser/commit/daf7c7abeaa107ae3d45d84a34d67f128762b7fa))
* **deps:** bump rollup from 3.8.1 to 3.9.0 ([6b097de](https://github.com/sws2apps/jw-epub-parser/commit/6b097decb6767c0039654ec19df6b9841b05e49b))
* **deps:** bump rollup from 3.9.0 to 3.9.1 ([7ed5338](https://github.com/sws2apps/jw-epub-parser/commit/7ed533865d58f4de58aa9a993fb7057cbfc80ad7))
* **deps:** bump rollup from 3.9.1 to 3.10.0 ([5079f09](https://github.com/sws2apps/jw-epub-parser/commit/5079f099998fc54a615d2657b1aa08ff9f60adb5))
* **module:** add support for additional languages and integration with Crowdin ([ed19cd7](https://github.com/sws2apps/jw-epub-parser/commit/ed19cd7184ea629d0911e8bcf3b18c38fe0a8f2d))

# [1.30.0-alpha.7](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.0-alpha.6...v1.30.0-alpha.7) (2022-12-31)


### Bug Fixes

* **parsing:** change week date formatting ([f47d715](https://github.com/sws2apps/jw-epub-parser/commit/f47d7150f3c3504fb62d6a667c5a0156a071bd79))

# [1.30.0-alpha.6](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.0-alpha.5...v1.30.0-alpha.6) (2022-12-31)


### Bug Fixes

* **parsing:** issue when parsing student assignments th study point ([c39b186](https://github.com/sws2apps/jw-epub-parser/commit/c39b18608fc13c6790768f93e3e1bf50aec03bfa))

# [1.30.0-alpha.5](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.0-alpha.4...v1.30.0-alpha.5) (2022-12-30)


### Bug Fixes

* **module:** update supported languages ([83b6832](https://github.com/sws2apps/jw-epub-parser/commit/83b6832fac885ef150b513242e127769384cb4c6))

# [1.30.0-alpha.4](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.0-alpha.3...v1.30.0-alpha.4) (2022-12-30)


### Bug Fixes

* **localization:** update month names for french ([e6e24de](https://github.com/sws2apps/jw-epub-parser/commit/e6e24dea217512b2c6b9328259d5b997bed414e0))

# [1.30.0-alpha.3](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.0-alpha.2...v1.30.0-alpha.3) (2022-12-30)


### Bug Fixes

* handle parsing for roman diacritics ([5245b02](https://github.com/sws2apps/jw-epub-parser/commit/5245b023dfec3691683c4b21e3ffcbb0d7753d3a))

# [1.30.0-alpha.2](https://github.com/sws2apps/jw-epub-parser/compare/v1.30.0-alpha.1...v1.30.0-alpha.2) (2022-12-28)


### Bug Fixes

* handle concluding convention song ([ca7c312](https://github.com/sws2apps/jw-epub-parser/commit/ca7c3125ddfd16b69439de683e13f4efa6d7c3cc))

# [1.30.0-alpha.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.29.0...v1.30.0-alpha.1) (2022-12-27)


### Features

* **deps:** bump @rollup/plugin-commonjs from 23.0.4 to 23.0.5 ([b33cf4d](https://github.com/sws2apps/jw-epub-parser/commit/b33cf4dbb49a648bfbc2683f6cf38cdb853e95c1))
* **deps:** bump @rollup/plugin-commonjs from 23.0.5 to 24.0.0 ([dfbe27a](https://github.com/sws2apps/jw-epub-parser/commit/dfbe27ab6e8c084a3a444f12369e1e43e894c230))
* **deps:** bump mocha from 10.1.0 to 10.2.0 ([a2e955b](https://github.com/sws2apps/jw-epub-parser/commit/a2e955b453b51cbc36f5a25327284a33a1837478))
* **deps:** bump rollup from 3.7.0 to 3.7.3 ([e6b9ecb](https://github.com/sws2apps/jw-epub-parser/commit/e6b9ecb1fb5964fd5a9e3317541015a820d7a094))
* **deps:** bump rollup from 3.7.3 to 3.7.4 ([36e6495](https://github.com/sws2apps/jw-epub-parser/commit/36e64959b6c1d73389314888706e208090fa511c))
* **deps:** bump rollup from 3.7.4 to 3.7.5 ([2fc29bb](https://github.com/sws2apps/jw-epub-parser/commit/2fc29bbc67639ccca17c911e315158ddbe2552de))
* **deps:** bump rollup from 3.7.5 to 3.8.0 ([ab80d49](https://github.com/sws2apps/jw-epub-parser/commit/ab80d499648d4f1990ba9042702df43f1a7b2c5f))
* **deps:** bump rollup from 3.8.0 to 3.8.1 ([daf7c7a](https://github.com/sws2apps/jw-epub-parser/commit/daf7c7abeaa107ae3d45d84a34d67f128762b7fa))
* **module:** add enhanced parsing mode ([daef34c](https://github.com/sws2apps/jw-epub-parser/commit/daef34ca674758bb1f7a2ef9d048f71c427fdd6d))

# [1.29.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.28.0...v1.29.0) (2022-12-09)


### Features

* **deps:** bump @rollup/plugin-babel from 6.0.2 to 6.0.3 ([7a35aea](https://github.com/sws2apps/jw-epub-parser/commit/7a35aea05a4a7f85578b6656d36495f18c58b863))
* **deps:** bump @rollup/plugin-commonjs from 23.0.2 to 23.0.3 ([f9e3224](https://github.com/sws2apps/jw-epub-parser/commit/f9e3224615fca6ebe96f8e5bac3eb8a6c78bed1d))
* **deps:** bump @rollup/plugin-commonjs from 23.0.3 to 23.0.4 ([3496a3e](https://github.com/sws2apps/jw-epub-parser/commit/3496a3edfb2147541d329ef731c648181be934f8))
* **deps:** bump @semantic-release/changelog from 6.0.1 to 6.0.2 ([ca72eab](https://github.com/sws2apps/jw-epub-parser/commit/ca72eab4af64bcb9a81f6b3b8df57a01ada8a021))
* **deps:** bump rollup from 3.4.0 to 3.5.0 ([dd57aac](https://github.com/sws2apps/jw-epub-parser/commit/dd57aacadc9cee662455c3bbd78c8126fd51992e))
* **deps:** bump rollup from 3.5.0 to 3.5.1 ([5c78268](https://github.com/sws2apps/jw-epub-parser/commit/5c78268aabec4dc822727c4ecf9989d620072e84))
* **deps:** bump rollup from 3.5.1 to 3.6.0 ([a64e6b1](https://github.com/sws2apps/jw-epub-parser/commit/a64e6b1ebb143c7fd7f83cc13deef562f8adcfc0))
* **deps:** bump rollup from 3.6.0 to 3.7.0 ([bd398c7](https://github.com/sws2apps/jw-epub-parser/commit/bd398c77e23434e47ddfcd13f299a91c341eb17a))

# [1.28.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.27.0...v1.28.0) (2022-11-25)


### Bug Fixes

* **common:** update replace to replaceAll when searching glue space ([d36975a](https://github.com/sws2apps/jw-epub-parser/commit/d36975ab83592d2becd3e24934a987230ed89a77))


### Features

* **deps:** bump @babel/preset-env from 7.19.4 to 7.20.2 ([5fdd93d](https://github.com/sws2apps/jw-epub-parser/commit/5fdd93daf4f506bfa47e0c164564cfd64ffbc3cd))
* **deps:** bump chai from 4.3.6 to 4.3.7 ([1c8035f](https://github.com/sws2apps/jw-epub-parser/commit/1c8035f145554dd78d5a839e6b683dd67e0ddb2a))
* **deps:** bump jsdom from 20.0.2 to 20.0.3 ([a7b1623](https://github.com/sws2apps/jw-epub-parser/commit/a7b162399cbb98e56f60d0066bd4519802478e25))
* **deps:** bump node-fetch from 3.2.10 to 3.3.0 ([54dee42](https://github.com/sws2apps/jw-epub-parser/commit/54dee4260b53d4ae84d09ab3735a8e8ffa5866d9))
* **deps:** bump rollup from 3.2.4 to 3.2.5 ([c4431af](https://github.com/sws2apps/jw-epub-parser/commit/c4431afe9223a10e035147d6e8a4e8793de56cba))
* **deps:** bump rollup from 3.2.5 to 3.3.0 ([37c22f1](https://github.com/sws2apps/jw-epub-parser/commit/37c22f100b941e9bef74be1e70d0882279edda49))
* **deps:** bump rollup from 3.3.0 to 3.4.0 ([2804d0e](https://github.com/sws2apps/jw-epub-parser/commit/2804d0e41ae8c807d212575195cd7314a84d4f7e))

# [1.27.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.26.0...v1.27.0) (2022-11-01)


### Features

* **deps:** bump @rollup/plugin-babel from 6.0.0 to 6.0.2 ([b1a745a](https://github.com/sws2apps/jw-epub-parser/commit/b1a745a680c2ac2a0c4b6a58d7b4f18af4f056a4))
* **deps:** bump @rollup/plugin-commonjs from 23.0.0 to 23.0.1 ([495377e](https://github.com/sws2apps/jw-epub-parser/commit/495377e6b44f8157795eeb3709c104b5319c31dd))
* **deps:** bump @rollup/plugin-commonjs from 23.0.1 to 23.0.2 ([ca20c43](https://github.com/sws2apps/jw-epub-parser/commit/ca20c43c9e39e0476033450fc71300ca892113db))
* **deps:** bump @rollup/plugin-node-resolve from 15.0.0 to 15.0.1 ([d846333](https://github.com/sws2apps/jw-epub-parser/commit/d8463335b77c997857ba227593f64ce0be11018d))
* **deps:** bump jsdom from 20.0.1 to 20.0.2 ([7adadec](https://github.com/sws2apps/jw-epub-parser/commit/7adadec6f0f1efd4879a829a961dda1d69acc9df))
* **deps:** bump rollup from 3.2.2 to 3.2.3 ([ed06160](https://github.com/sws2apps/jw-epub-parser/commit/ed061604a185593b820fa3fa46f6781b751a020b))
* **deps:** bump rollup from 3.2.3 to 3.2.4 ([1e2ce8f](https://github.com/sws2apps/jw-epub-parser/commit/1e2ce8feeadf5dc3e6d85a747a48a4eb0581bf62))

# [1.26.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.25.0...v1.26.0) (2022-10-17)


### Features

* **deps:** bump @babel/preset-env from 7.19.3 to 7.19.4 ([6ae16db](https://github.com/sws2apps/jw-epub-parser/commit/6ae16db82e5e2553aff97a7503bd8570c054e124))
* **deps:** bump @rollup/plugin-node-resolve from 14.1.0 to 15.0.0 ([e48d434](https://github.com/sws2apps/jw-epub-parser/commit/e48d434fa03639bc14fbb860344a821bbd2476bc))
* **deps:** bump mocha from 10.0.0 to 10.1.0 ([b4c80af](https://github.com/sws2apps/jw-epub-parser/commit/b4c80af3c0b08040ba7173f83a30352a78f207bc))
* **deps:** bump rollup from 2.79.1 to 3.0.0 ([9cd114d](https://github.com/sws2apps/jw-epub-parser/commit/9cd114dc3ec04f98ddbd755b41af46184aa16341))
* **deps:** bump rollup from 3.0.0 to 3.1.0 ([6f60fae](https://github.com/sws2apps/jw-epub-parser/commit/6f60fae2177a8f79c8e53aa0d1524b0c52326322))
* **deps:** bump rollup from 3.1.0 to 3.2.2 ([be48b49](https://github.com/sws2apps/jw-epub-parser/commit/be48b4928c54a435d14892dafdd6826d3a8b5f74))
* **node:** cleanup output file ([de0b050](https://github.com/sws2apps/jw-epub-parser/commit/de0b05097c3de1a9823213898c5df675b5dc7714))

# [1.25.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.24.0...v1.25.0) (2022-10-10)


### Features

* **deps:** bump @rollup/plugin-babel from 5.3.1 to 6.0.0 ([6867292](https://github.com/sws2apps/jw-epub-parser/commit/68672922fe84954c5ac4a5c88ed1f3611321b4ef))
* **deps:** bump @rollup/plugin-commonjs from 22.0.2 to 23.0.0 ([5c090c3](https://github.com/sws2apps/jw-epub-parser/commit/5c090c3cec70bff95faef0f7202df0b2a00c114c))

# [1.24.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.23.3...v1.24.0) (2022-10-03)


### Features

* **deps:** bump @babel/preset-env from 7.19.1 to 7.19.3 ([2288a76](https://github.com/sws2apps/jw-epub-parser/commit/2288a767ea39eef2130c6700ed969f1a878eb7ce))
* **deps:** bump global-jsdom from 8.5.0 to 8.6.0 ([7ca886c](https://github.com/sws2apps/jw-epub-parser/commit/7ca886ccf28b70740dd599438c69d0f13f67cdb9))
* **deps:** bump jsdom from 20.0.0 to 20.0.1 ([e873f94](https://github.com/sws2apps/jw-epub-parser/commit/e873f940ab5a54c89beb42f5af3ed06a519c2214))
* **deps:** bump rollup from 2.79.0 to 2.79.1 ([da27297](https://github.com/sws2apps/jw-epub-parser/commit/da27297a01335a8a124405adeb338376c519f527))

## [1.23.3](https://github.com/sws2apps/jw-epub-parser/compare/v1.23.2...v1.23.3) (2022-09-17)


### Bug Fixes

* **node&browser:** initiate new instance of JSZip for each call ([b04825a](https://github.com/sws2apps/jw-epub-parser/commit/b04825a896f13c5f75cb59acb1fd8c69b1627c9b))

## [1.23.2](https://github.com/sws2apps/jw-epub-parser/compare/v1.23.1...v1.23.2) (2022-09-17)


### Bug Fixes

* **node:** add variable reset ([6e935a2](https://github.com/sws2apps/jw-epub-parser/commit/6e935a22a32fbbcd5cc97e9b18b1e9b3896b2ab0))

## [1.23.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.23.0...v1.23.1) (2022-09-17)


### Bug Fixes

* **module:** update dist contents to include missing generated files ([a7add6a](https://github.com/sws2apps/jw-epub-parser/commit/a7add6af33099a3ee2b8140339c4f987ff165336))

# [1.23.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.22.0...v1.23.0) (2022-09-17)


### Features

* **node:** add support for loading epub file from url ([0d24d4f](https://github.com/sws2apps/jw-epub-parser/commit/0d24d4f89389b915e42ed522d5d5dd6066ed4853))

# [1.22.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.21.0...v1.22.0) (2022-09-15)


### Features

* **deps:** bump @babel/preset-env from 7.19.0 to 7.19.1 ([8533122](https://github.com/sws2apps/jw-epub-parser/commit/85331225fe10a51ca491b583be22a32415239e65))
* **deps:** bump @rollup/plugin-node-resolve from 13.3.0 to 14.0.1 ([f307c3c](https://github.com/sws2apps/jw-epub-parser/commit/f307c3c987370649db3b7a5c49702a2b77e962ff))
* **deps:** bump @rollup/plugin-node-resolve from 14.0.1 to 14.1.0 ([6cbf45f](https://github.com/sws2apps/jw-epub-parser/commit/6cbf45f62cf748c793161a4476741338285701b3))

# [1.21.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.20.0...v1.21.0) (2022-09-06)


### Features

* **deps:** bump @babel/preset-env from 7.18.10 to 7.19.0 ([8dc1562](https://github.com/sws2apps/jw-epub-parser/commit/8dc1562ab4548a5d95504254d2b00d1a53d19b05))
* **deps:** bump rollup from 2.77.3 to 2.78.0 ([e793295](https://github.com/sws2apps/jw-epub-parser/commit/e7932959634e479694040da2903e485c227e22c9))
* **deps:** bump rollup from 2.78.0 to 2.78.1 ([6ee57af](https://github.com/sws2apps/jw-epub-parser/commit/6ee57af9753568425745b6fec4c2d7111d684336))
* **deps:** bump rollup from 2.78.1 to 2.79.0 ([935d0ea](https://github.com/sws2apps/jw-epub-parser/commit/935d0ea28ff3598a0665559361f7a6bb1705f28a))

# [1.20.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.19.0...v1.20.0) (2022-08-12)


### Features

* **deps:** bump rollup from 2.77.2 to 2.77.3 ([b56d280](https://github.com/sws2apps/jw-epub-parser/commit/b56d2800f8bd2ba2ed6b5e2c88a7ef0fc7c02876))

# [1.19.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.18.0...v1.19.0) (2022-08-08)


### Features

* **deps:** bump @rollup/plugin-commonjs from 22.0.1 to 22.0.2 ([018b282](https://github.com/sws2apps/jw-epub-parser/commit/018b2822493a65165b02d4c1ca793e5fd078c8a0))

# [1.18.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.17.0...v1.18.0) (2022-08-03)


### Features

* **deps:** bump jszip from 3.10.0 to 3.10.1 ([9eef583](https://github.com/sws2apps/jw-epub-parser/commit/9eef58385d2b27bc9d4754db678f6d8f3c6fabf1))

# [1.17.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.16.0...v1.17.0) (2022-08-02)


### Features

* **deps:** bump @babel/preset-env from 7.18.9 to 7.18.10 ([80379e7](https://github.com/sws2apps/jw-epub-parser/commit/80379e77fa041c028913217408508b1749dddb28))

# [1.16.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.15.0...v1.16.0) (2022-07-29)


### Features

* **github:** change dependabot prefix for all dependencies ([20ca04c](https://github.com/sws2apps/jw-epub-parser/commit/20ca04cf2f8a98fb5281bf57d0362279fa712b87))

# [1.15.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.14.0...v1.15.0) (2022-06-27)


### Features

* **deps:** bump global-jsdom from 8.4.0 to 8.5.0 ([cd578df](https://github.com/sws2apps/jw-epub-parser/commit/cd578dfc0b3cfc134d56f7a1c0d23d78c71f7eeb))

# [1.14.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.13.0...v1.14.0) (2022-06-20)


### Features

* **deps:** bump jsdom from 19.0.0 to 20.0.0 ([7914e00](https://github.com/sws2apps/jw-epub-parser/commit/7914e00fe43fb3523e924d173f47d6939bda573b))

# [1.13.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.12.0...v1.13.0) (2022-06-10)


### Features

* **deps:** bump semantic-release from 19.0.2 to 19.0.3 ([a6bf4e0](https://github.com/sws2apps/jw-epub-parser/commit/a6bf4e02260256641f998a024bd256746cccfb99))

# [1.12.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.11.0...v1.12.0) (2022-06-04)


### Features

* **deps:** bump npm from 8.6.0 to 8.12.0 ([804aadb](https://github.com/sws2apps/jw-epub-parser/commit/804aadb10956d4c151c7a9b8ff235ade41ce9d1a))
* **deps:** bump semver-regex from 3.1.3 to 3.1.4 ([0d3a856](https://github.com/sws2apps/jw-epub-parser/commit/0d3a856840f4c970c4082da58cc8d8380d63c1c2))

# [1.11.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.10.2...v1.11.0) (2022-05-23)


### Features

* **deps:** bump jszip from 3.9.1 to 3.10.0 ([080d3b9](https://github.com/sws2apps/jw-epub-parser/commit/080d3b9bc591cdd18793e30d965397dcf881e622))

## [1.10.2](https://github.com/sws2apps/jw-epub-parser/compare/v1.10.1...v1.10.2) (2022-05-10)


### Bug Fixes

* **jszip:** change from nodebuffer to arraybuffer ([72955c1](https://github.com/sws2apps/jw-epub-parser/commit/72955c194d81fd5ae8e663cf21b29ac517949dc7))

## [1.10.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.10.0...v1.10.1) (2022-05-10)


### Bug Fixes

* **rollup:** update config ([85f8f1f](https://github.com/sws2apps/jw-epub-parser/commit/85f8f1fa601848109101c58bde9618baa980f65a))

# [1.10.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.9.0...v1.10.0) (2022-05-10)


### Features

* **deps:** update deps location ([f5313c5](https://github.com/sws2apps/jw-epub-parser/commit/f5313c57037d62981765494f639bac1f8879737a))

# [1.9.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.8.0...v1.9.0) (2022-05-10)


### Features

* **deps:** update dependencies location ([8923c37](https://github.com/sws2apps/jw-epub-parser/commit/8923c37ed1dd6008e9b182ecc07d1cb4179779c6))

# [1.8.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.7.1...v1.8.0) (2022-04-13)


### Features

* **module:** update dist to use new format ([8e9af02](https://github.com/sws2apps/jw-epub-parser/commit/8e9af0283530720d2f071ef29c2986c2b34c0565))

## [1.7.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.7.0...v1.7.1) (2022-04-07)


### Bug Fixes

* **module:** force version bumping ([76c6efa](https://github.com/sws2apps/jw-epub-parser/commit/76c6efabbb6092b86f8603d9eda073ba6e406b4e))

# [1.7.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.6.0...v1.7.0) (2022-04-07)


### Features

* **deps:** bump jszip from 3.9.0 to 3.9.1 ([e290529](https://github.com/sws2apps/jw-epub-parser/commit/e290529a48210c4cbdd39e6cc5ed83f8454c5c83))

# [1.6.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.5.0...v1.6.0) (2022-04-05)


### Features

* **deps:** bump jszip from 3.8.0 to 3.9.0 ([c3fb1a8](https://github.com/sws2apps/jw-epub-parser/commit/c3fb1a8820f886c1cac7692236249f907854f9c8))

# [1.5.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.2...v1.5.0) (2022-03-31)


### Features

* **deps:** bump jszip from 3.7.1 to 3.8.0 ([4b80ee2](https://github.com/sws2apps/jw-epub-parser/commit/4b80ee2ac72f4998f02c7c3399bb134ae94b2bb1))

## [1.4.2](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.1...v1.4.2) (2022-03-05)


### Bug Fixes

* **module:** fix forth assignment not being populated ([66db7d8](https://github.com/sws2apps/jw-epub-parser/commit/66db7d8774eef576a5a0deaf798bb83ef6d8b460))

## [1.4.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.0...v1.4.1) (2022-03-04)


### Bug Fixes

* **jszip:** path traversal detection update ([a097318](https://github.com/sws2apps/jw-epub-parser/commit/a097318b3d6098b289edaf4cee761d0b0b48862e))

# [1.4.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.3.1...v1.4.0) (2022-03-04)


### Features

* **module:** dependency update ([ac790df](https://github.com/sws2apps/jw-epub-parser/commit/ac790dff325e4cac6de26bb82b0828e21561c790))

# [1.4.0-beta.7](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.0-beta.6...v1.4.0-beta.7) (2022-03-04)


### Features

* **module:** use domparser to parse epub content ([6cae90b](https://github.com/sws2apps/jw-epub-parser/commit/6cae90b70838cebbc27f22b01cabb92337cc4929))

# [1.4.0-beta.6](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.0-beta.5...v1.4.0-beta.6) (2022-03-04)


### Features

* **module:** use jszip to read and parse epub ([ab70322](https://github.com/sws2apps/jw-epub-parser/commit/ab70322fe22c1b6114f9630b15b9300f0d07a9f3))

# [1.4.0-beta.5](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.0-beta.4...v1.4.0-beta.5) (2022-03-02)


### Bug Fixes

* **release:** run build before npm publish ([d044eba](https://github.com/sws2apps/jw-epub-parser/commit/d044eba76428ff7181f5cad32b84774963448aed))

# [1.4.0-beta.4](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.0-beta.3...v1.4.0-beta.4) (2022-03-02)


### Features

* **app:** module output improvement ([21c9502](https://github.com/sws2apps/jw-epub-parser/commit/21c95026ae419f2cecdcf358806ffe67ffaae68e))

# [1.4.0-beta.3](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.0-beta.2...v1.4.0-beta.3) (2022-02-27)


### Bug Fixes

* **module:** code refactor to cjs ([d4fc7db](https://github.com/sws2apps/jw-epub-parser/commit/d4fc7db457cb2fee4e3de023bda0d6243b063e94))

# [1.4.0-beta.2](https://github.com/sws2apps/jw-epub-parser/compare/v1.4.0-beta.1...v1.4.0-beta.2) (2022-02-27)


### Bug Fixes

* **module:** use single file for module ([218fa09](https://github.com/sws2apps/jw-epub-parser/commit/218fa09ff6341c07b727e5466e9f5fb9c15e90fb))

# [1.4.0-beta.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.3.1...v1.4.0-beta.1) (2022-02-27)


### Features

* **module:** update function declaration ([1b83916](https://github.com/sws2apps/jw-epub-parser/commit/1b83916813a2fb42bd0fe4ba10c1b750d831de2b))

## [1.3.1](https://github.com/sws2apps/jw-epub-parser/compare/v1.3.0...v1.3.1) (2022-02-15)


### Bug Fixes

* **main:** remove unnecessary console log when parsing ([0863f9f](https://github.com/sws2apps/jw-epub-parser/commit/0863f9fcf540b6371387377f9571f5f007eec35c))


# [1.3.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.2.0...v1.3.0) (2022-02-14)


### Features

* **deps:** bump node-fetch from 2.6.6 to 2.6.7 ([50a6e88](https://github.com/sws2apps/jw-epub-parser/commit/50a6e88b33ecd56d6c09d0842147a1b42957090c))
* **deps:** bumps jsdom to latest version ([121b58d](https://github.com/sws2apps/jw-epub-parser/commit/121b58dbd5844bc47c8b8fcd79e93031b21e77cb))


# [1.2.0](https://github.com/sws2apps/jw-epub-parser/compare/v1.1.0...v1.2.0) (2021-12-13)


### Features

* **module:** JW EPUB Parser: initial release of this module
