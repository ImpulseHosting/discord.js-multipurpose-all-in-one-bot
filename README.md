# AIO DISCORD.JS BOT

- 53 commands

> economy, fun, info, util, moderation, api

---

# COMMANDS

**economy**
- /add-coins
- /remove-coins
- /beg
- /create-account
- /daily
- /deposit
- /gamble
- /steal
- /transfer
- /upgrade
- /wallet
- /dig
- /fish
- /inventory

***api***
- /br-map

**fun**

- /emojify
- /fasttype
- /minesweeper
- /snake

**info**

- /inviteinfo
- /ping
- /free-hosting
- /serverinfo
- /userinfo

***moderation***

+ moderation:
+ /anti-caps enable
+ /anti-caps disable
+ /ban
+ /kick
+ /lock
+ /unlock
+ /mute
+ /purge
+ /unmute
+ /unlock
+ /unban
+ /warn
+ /unwarn
+ /warnings
+ /slowmode
+ /unslowmode
+ /setnick
+ /resetnick
+ /addrole
+ /removerole
+ /server-leave (bot owner only)

**util**

- /avatar
- /banner
- /covid-stats
- /github
- /help
- /password
- /pokedex
- /qrcode
- /urban

---

# CHANGE

If you would like to change something in the code such as embed colors, economy pricing heres how

colors: [discohook](https://discohook.org/) to get the hex code colors
economy pricing: [Settings(models)](./src/database/models/User.js) to change the settings, to change upgrade prices you can go to [Upgrade](./src/commands/economy/upgrade.js) the default is:

```js
    const upgradeCost = level * 10000;
    const upgradeAmount = level * 10000;
```

you can change it by changing the 10000 like this:

```js
    const upgradeCost = level * 500;
    const upgradeAmount = level * 500;
```

---

# HOSTING

[impulsehost](https://dash.impulsehost.cloud/home)

ImpulseHost [discord](https://discord.gg/impulsehost)

---

> if you have any questions join the server! (plenty more new commands & updates in the future)

[LICENSE](./LICENSE)
