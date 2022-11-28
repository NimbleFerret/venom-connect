import { getValueByKey } from ".";
import { ProviderOptions } from "../../types";

// todo logos
import MobileApp from "../logos/MobileAppCommon.svg";

// export const getOxychatQr = (link?: string) => {
//   return (
//     // url
//     //
//     ""
//   );
// };

// export const getOxychatIos = getOxychatQr;
// export const getOxychatAndroid = getOxychatQr;

// for oxychat
const oxychatDefaultLink = "https://oxy.chat/";
const oxychatIosDeepLink = oxychatDefaultLink;
const oxychatAndroidDeepLink = oxychatDefaultLink;
const oxychatExtensionLinkChrome = oxychatDefaultLink;
export const oxychatDefaultLinks = {
  ios: oxychatIosDeepLink,
  android: oxychatAndroidDeepLink,
  qr: undefined,
  extension: [
    {
      browser: "chrome",
      link:
        oxychatExtensionLinkChrome !== null
          ? oxychatExtensionLinkChrome || oxychatDefaultLink
          : null,
    },
  ],
};

const OxychatWalletLogos = {
  connectors: {
    extension: MobileApp,
    ios: MobileApp,
    android: MobileApp,
  },
};

export const oxychatwallet: ProviderOptions = {
  id: "oxychatwallet",
  walletWaysToConnect: [
    {
      id: "extension",
      type: "extension",
      logo: {
        chrome: OxychatWalletLogos.connectors.extension,
      },
      name: "OXY.CHAT Mobile App",
      options: {
        isCurrentBrowser: [["isFalse", "isDesktop"]],
        installExtensionLink: (links: typeof oxychatDefaultLinks | undefined) =>
          getValueByKey("oxychatwallet", "extension")(links),
        checkIsProviderExist: () => !!window.__oxy, // todo,
      },
    },
    {
      id: "ios",
      type: "ios",
      logo: OxychatWalletLogos.connectors.ios,
      name: "OXY.CHAT Mobile App",
      options: {
        text: "Click here to open App Store",

        deepLink: (
          links: typeof oxychatDefaultLinks | undefined = oxychatDefaultLinks
        ) => getValueByKey("oxychatwallet", "ios")(links),
      },
    },
    {
      id: "android",
      type: "android",
      logo: OxychatWalletLogos.connectors.android,
      name: "OXY.CHAT Mobile App",
      options: {
        text: "Click here to open Google Play",

        deepLink: (
          links: typeof oxychatDefaultLinks | undefined = oxychatDefaultLinks
        ) => getValueByKey("oxychatwallet", "android")(links),
      },
    },
  ],
};
