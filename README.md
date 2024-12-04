(best view with https://marketplace.visualstudio.com/items?itemName=hnw.vscode-auto-open-markdown-preview)

# AIO DISCORD.JS BOT

(my first actual discord.js project)

- 53 commands

> economy, fun, info, util

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

![Impulse Host Banner](https://media.discordapp.net/attachments/1282489543278461050/1309682217143767081/impulsehostbanner.png?ex=6742781d&is=6741269d&hm=b1193e47a494485a72e5f6055441f264d86572330f4de771ab5e56946af9f5a1&=&format=webp&quality=lossless&width=550&height=309)

[impulsehost](https://dash.impulsehost.cloud/home) provides the best free discord bot hosting servercise with cheap prices and plans shown below:

![alt text](https://media.discordapp.net/attachments/1144970574205026304/1309688011998629898/image.png?ex=67427d82&is=67412c02&hm=f4ac5aa8f5b35e60cb119df1473cf8b6746310d1313933e0722284c13bc26fe6&=&format=webp&quality=lossless&width=438&height=618)

![alt text](https://media.discordapp.net/attachments/1144970574205026304/1309688012250157177/image.png?ex=67427d82&is=67412c02&hm=e4a988b34c5bce5f24d594a575b32bf6e63c58c04cb20f38a41aab09239c84e8&=&format=webp&quality=lossless)

![alt text](https://media.discordapp.net/attachments/1144970574205026304/1309688012543623273/image.png?ex=67427d83&is=67412c03&hm=aef575872a1df2183c0ca7aa28c34c917a7e6aa47532dc58c19bc081ccd9526d&=&format=webp&quality=lossless)

ImpulseHost [discord](https://discord.gg/impulsehost)

---

> UPDATES WILL BE POSTED IN UPDATES.md

---

> if you have any questions join the server! (plenty more new commands & updates in the future)

[LICENSE](./LICENSE)