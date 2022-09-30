import { getValueByKey } from ".";
import { ProviderOptions } from "../../types";
import Apple from "../logos/Apple.svg";
import ChromeExtension from "../logos/ChromeExtensionVenom.svg";
import FirefoxExtension from "../logos/FirefoxExtensionVenom.svg";
import MobileApp from "../logos/MobileAppVenom.svg";
import MobileAppWhite from "../logos/MobileAppVenomWhite.svg";
import PlayMarket from "../logos/PlayMarket.svg";
import VenomWalletLogo from "../logos/VenomWalletLogo.svg";

export { VenomWalletLogo };

export const getVenomIos = (link?: string) => {
  return (
    // url
    //
    "https://venomwallet.page.link" +
    //
    // params
    //
    "/?link=" +
    (link || encodeURIComponent(window.location.href)) +
    //
    "&apn=" +
    "com.venom.wallet" +
    //
    "&isi=" +
    "1622970889" +
    //
    "&ibi=" +
    "foundation.venom.wallet"
  );
};

// for venom
const venomDefaultLink = "/";
const venomIosDeepLink = getVenomIos();
const venomAndroidDeepLink = "https://venomwallet.page.link/download";
const venomExtensionLinkChrome =
  "https://chrome.google.com/webstore/detail/venom-wallet/ojggmchlghnjlapmfbnjholfjkiidbch";
export const venomDefaultLinks = {
  ios: venomIosDeepLink !== null ? venomIosDeepLink || venomDefaultLink : null,
  android:
    venomAndroidDeepLink !== null
      ? venomAndroidDeepLink || venomDefaultLink
      : null,
  qr:
    venomIosDeepLink !== null
      ? venomIosDeepLink || venomAndroidDeepLink || venomDefaultLink
      : null,
  extension: [
    {
      browser: "chrome",
      link:
        venomExtensionLinkChrome !== null
          ? venomExtensionLinkChrome || venomDefaultLink
          : null,
    },
  ],
};
//

export const getVenomQr = (link?: string) => {
  return (
    // url
    //
    "https://venomwallet.page.link" +
    //
    // params
    //
    "/?link=" +
    (link || encodeURIComponent(window.location.href)) +
    //
    "&apn=" +
    "com.venom.wallet" +
    //
    "&isi=" +
    "1622970889" +
    //
    "&ibi=" +
    "foundation.venom.wallet"
  );
};

const VenomWalletLogos = {
  wallet: VenomWalletLogo,
  connectors: {
    chromeExtension: ChromeExtension,
    firefoxExtension: FirefoxExtension,
    mobile: MobileApp,
    mobileWhite: MobileAppWhite,
    ios: MobileApp,
    iosWhite: MobileAppWhite,
    android: MobileApp,
    androidWhite: MobileAppWhite,
    apple: Apple,
    playMarket: PlayMarket,
  },
};

export const venomwallet: ProviderOptions = {
  id: "venomwallet",
  // wallet: {
  //   name: venomWalletName,
  //   description: "The official wallet of the Venom network",
  //   logo: VenomWalletLogos.wallet,
  // },
  walletWaysToConnect: [
    {
      id: "extension",
      type: "extension",
      logo: {
        chrome: VenomWalletLogos.connectors.chromeExtension,
        // firefox: VenomWalletLogos.connectors.firefoxExtension,
      },
      name: "Venom [[browser]] Extension", // [[browser]] will replace to 'Chrome' or 'Firefox'
      options: {
        isCurrentBrowser: [["isChrome", "isDesktop"]],
        installExtensionLink: (links: typeof venomDefaultLinks | undefined) =>
          getValueByKey("venomwallet", "extension")(links),
        checkIsProviderExist: () => !!window.__venom, // todo
      },
    },
    {
      id: "mobile",
      type: "mobile",
      logo: VenomWalletLogos.connectors.mobile,
      logoWhite: VenomWalletLogos.connectors.mobileWhite,
      name: "Venom Mobile App",
      options: {
        qr: (links: typeof venomDefaultLinks | undefined) =>
          getValueByKey("venomwallet", "qr")(links),
        devises: [
          {
            type: "ios",
            img: VenomWalletLogos.connectors.apple,
            text: "iOS App",

            deepLink: (links: typeof venomDefaultLinks | undefined) =>
              getValueByKey("venomwallet", "ios")(links),
            alt: "iOS",
            storeId: "ios",
          },
          {
            type: "android",
            img: VenomWalletLogos.connectors.playMarket,
            text: "Android App",

            deepLink: (
              links: typeof venomDefaultLinks | undefined = venomDefaultLinks
            ) => getValueByKey("venomwallet", "android")(links),
            alt: "Android",
            storeId: "android",
          },
          {
            type: "apk",
            img: VenomWalletLogos.connectors.playMarket,
            text: "Android Apk",

            deepLink: "https://venom.foundation/wallet/android",
            alt: "Android Apk",
            storeId: "android-apk",
          },
        ],
      },
    },
    {
      id: "ios",
      type: "ios",
      logo: VenomWalletLogos.connectors.ios,
      logoWhite: VenomWalletLogos.connectors.iosWhite,
      name: "Venom Mobile App",
      options: {
        text: "Click here to open App Store",

        deepLink: (
          links: typeof venomDefaultLinks | undefined = venomDefaultLinks
        ) => getValueByKey("venomwallet", "ios")(links),
      },
    },
    {
      id: "android",
      type: "android",
      logo: VenomWalletLogos.connectors.android,
      logoWhite: VenomWalletLogos.connectors.androidWhite,
      name: "Venom Mobile App",
      options: {
        text: "Click here to open Google Play",

        deepLink: (
          links: typeof venomDefaultLinks | undefined = venomDefaultLinks
        ) => getValueByKey("venomwallet", "android")(links),
      },
    },
  ],
};
