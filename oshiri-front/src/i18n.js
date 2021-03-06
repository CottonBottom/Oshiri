import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          //Shared
          confirm: "Confirm",
          //Entrance
          enter: "Enter",
          enterTitle: "You must be over 18 years old to enter this page",
          enterList1: "Explicit Message 1",
          enterList2: "Explicit Message 2",
          enterList3: "Explicit Message 3",
          connectWalletTitle: "You need to connect your wallet to continue",
          //Only Text
          oshiriIntro:
            "Oshiri Story Introduction Oshiri Story Introduction Oshiri Story Introduction...",
          wrappingIntro:
            "You cannot have your Oshiri nude out there. Get some clothing first. Your first one is free, but for the next one on you will need to exchange OSH, Put price here XXXX",
          wrappingIntro2: "is the next Wrapping in production.",
          noWrappingError:
            "Seems you have lost your Wrapping somewhere and cannot access Oshiri...",
          next: "Next",
          noWrappingFound: "No wrapping found",
          //Customization
          name: "Name",
          skinTone: "Skin Tone",
          size: "Size",
          tail: "Tail",
          tailColor: "Tail Color",
          makeOshiri: "Make Oshiri!",
          //MyOshiri
          drawer: "Drawer",
          change: "Change",
          tutorial: "Tutorial",
          getWrappings: "Get Wrappings",
          sendConsent: "Send Consent",
          OSH: "OSH",
          Consent: "Consent",
          sendConsentTitle: "Input the address you want to send consent",
          sendConsentList1:
            "1 of your consent will be sent to the account above",
          sendConsentList2:
            "Please be sure the account has a Oshiri registered and has a Wrapping NFT",
          sendConsentList3:
            "The recipient account will be able to smack your Oshiri and you both will receive OSH",
          consentSentTitle: "You have sent consent!",
          consentSentList1:
            "The address {{address}} now have consent to Smack your Oshiri.",
          newDayTitle: "It???s a new day!",
          newDayList1:
            "You have recieved Consent, go ahead and share it with someone...",
          gotWrappingTitle: "You will get this Wrapping!",
          gotWrappingList1: " is the next wrapping in production",
          gotWrappingList2:
            "Once you spend OSH and successfully complete the transaction you will be able to wear your new wrapping",
          spendOSH: "Spend OSH",
          changeStatsTitle: "Do you want to change your Oshiri stats?",
          changeStatsList1:
            "You may change your skin tone, size and name for a fee of {{fee}}, you will pay at the end",
          drawerTitle: "Your owned Wrappings",
          //TheirOshiri
          spendConsent: "Spend Consent",
          smackedOshiri: "You Smacked {{oshiriName}}!",
          smackedAwards:
            "This Smack has awarded {{awardedCurrency}}OSH for both of you",
          /** Wrapping Names */
          //* Chewing Gum
          chewingGum: "Chewing Gum",
          //
          ball: "Ball",
          orange: "Orange",
          tallWaist: "Tall Waist",
          flames: "Flames",
          pocket: "Pocket",
          //
          bubble: "Bubble",
          red: "Red",
          pink: "Pink",
          singleStripe: "Single Stripe",
          doubleStripe: "Double Stripe",
          tag: "Tag",
          //
          stick: "Stick",
          black: "Black",
          //TODO: Variations

          //* Gummies
          gummies: "Gummies",
          //
          //* Cotton Candy
          cottonCandy: "Cotton Candy",
          //
          //* Licorice
          licorice: "Licorice",
          //
          //* Chewable
          chewable: "Chewable",
          //
          //* Caramel
          caramel: "Caramel",
          //
          //* Shared
          plain: "Plain",
          blue: "Blue",
          green: "Green",
        },
      },
      jp: {
        translation: {
          name: "??????",
          skinTone: "?????????",
          size: "?????????",
          tail: "??????",
          tailColor: "????????????",
          makeOshiri: "??????????????????!",

          //MyOshiri
          drawer: "????????????",
          change: "??????",
          tutorial: "??????",
          getWrappings: "???????????????????????????",
          sendConsent: "????????????",
          OSH: "OSH",
          Consent: "??????",

          /** Wrapping Names */
          //* Chewing Gum
          chewingGum: "??????",
          //
          ball: "?????????",
          orange: "????????????",
          tallWaist: "????????????????????????",
          flames: "??????",
          pocket: "??????????????????",
          //
          bubble: "?????????",
          red: "??????",
          pink: "???????????????",
          singleStripe: "????????????",
          doubleStripe: "?????????",
          tag: "??????",
          //
          stick: "???????????????",
          black: "??????",
          //TODO: Variations

          //* Shared
          plain: "????????????",
          blue: "??????",
          green: "?????????",
        },
      },
      es: {
        translation: {
          name: "Nombre",
          skinTone: "Color de Piel",
          size: "Tama??o",
          tail: "Cola",
          tailColor: "Color de Cola",
          makeOshiri: "Crear Oshiri!",
        },
      },
    },
  });

export default i18n;
