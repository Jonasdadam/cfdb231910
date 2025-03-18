require("dotenv/config");

module.exports = {

  botToken: process.env.BotToken,

  database: {
    host: process.env.DBhost,
    user: process.env.DBuser,
    password: process.env.DBpassword,
    database: process.env.DBname,
  },

  developement: {
    devServerID: "1198380562352717914",
    developersID: ["337696854642917376"],
    mysqlNotifierChannelID: "1273690835925336169"
  },

  logs: {
    errorlogger: true,
    commandlogger: true,
    auditlogs: true
  },

  fivemserver: {
    ip: "188.34.182.251:30120"
  },

  names: {
    fullName: "El Cartel Moreno",
    shortName: "Moreno",
    initials: "ECM"
  },

  colors: {
    mainColor: "#ffcd00",
    greenColor: "#73e02b",
    redColor: "#e0372b"
  },

  channels: {
    gangMainChatChannelID: "1294835073354301470",
    changelogChannelID: "1287791692757598208",
    portoChannelID: "1287799839815634945",
    deepwebsChannelID: "1288271985104650354",
    feedbackChannelParentID: "1287800175657488394",
    weaponPurchaseChannelID: "1288271697702551562",
    welcomeChannelID: "1287776999095533651",
    auditlogsChannelID: "1288276879928983572"
  },

  icons: {
    gangIcon: "https://i.postimg.cc/QN7Ph9MG/moreno-logo.png",
    logIcon: "https://i.postimg.cc/fRGFY9DD/log.png",
    gangIconGreen: "https://i.postimg.cc/vm4bSHHc/moreno-Green-Snake.png",
    gangIconRed: "https://i.postimg.cc/nz7ZpRmx/moreno-Red-Snake.png",
    warehouseIcon: "https://i.postimg.cc/6qFCc6kc/warehouse.png",
    drugIcon: "https://i.postimg.cc/Z5KkrgNk/wv7n5.png",
    weaponIcon: "https://i.postimg.cc/sDbBtxBj/pistol-simple-icon-gun-icon-pistol-icon-645658-2607.jpg",
    waitIcon: "https://i.postimg.cc/XvSDZ5r0/hourglass-done-231b.png",
    checkmarkIcon: "https://i.postimg.cc/bvXn2nLc/check-mark-2714-fe0f.png",
    crossmarkIcon: "https://i.postimg.cc/HsDD8hmS/cross-mark-274c.png",
    deleteIcon: "https://i.postimg.cc/SNYQjgYv/3807871.png",
    lockerIcon: "https://i.postimg.cc/m2CrthdJ/3209702.png",
    moneyIcon: "https://i.postimg.cc/BnW11MH9/7630510.png"
  },

  ranks: {
    everyone: "1287776998386827394",

    elJefeID: "1287785121474154568",
    elCoronelID: "1307920927081627720",
    comandanteID: "1307921020338044938",
    leidingID: "1287785936075362325",

    consejeroID: "1307921125929517106",
    bajoLiderazgoID: "1287786027955654729",

    sargentoID: "1307921156145414175",
    asesinoID: "1307921179876786189",
    cerebroID: "1307921204832763944",
    enlaceID: "1307921230355107860",

    corazaID: "1307921261543821342",
    soldatoID: "1307921299485491251",
    seguidorID: "1287785632894025841",
    morenoID: "1287786106221236224",

    novatoID: "1287785676904861717",
    soldatoAusenteID: "1287785719732899984",

    cerebroApoyoID: "1287786241739329636",

    cobertizoID: "1287786271862951956",
    cobertizo2aID: "1287786305861718066",
    cobertizo2bID: "1287786351281967164",
    cobertizo3aID: "1287786383066398801"
  },

  salary: {
    coke: {
      pluk: 108,
      verkoop: 7
    },
    meth: {
      pluk: 132,
      verkoop: 7
    }
  },

  messages: {
    commandDevOnly: "This cannot be executed in this server. (DO)",
    commandTestMode: "This cannot be executed in this server. (TM)",
    userNoPermissions: "You do not have enough permissions to execute this command.",
    botNoPermissions: "I do not have enough permissions to execute this command.",
    notAMember: "Wat probeer je? Je bent geen member."
  },

  images: {
    welcomeBGimg: "https://i.postimg.cc/rwRtsdrM/Schermafbeelding-2024-10-14-074754.png",
    webhookAvatar: "https://i.postimg.cc/fRGFY9DD/log.png"
  }
};
