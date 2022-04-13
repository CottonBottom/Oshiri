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
          //Entrance
          enter: "Enter",
          enterTitle: "You must be over 18 years old to enter this page",
          enterList1: "Explicit Message 1",
          enterList2: "Explicit Message 2",
          enterList3: "Explicit Message 3",
          //Only Text
          messageStory:
            "Oshiri Story Introduction Oshiri Story Introduction Oshiri Story Introduction...",
          next: "Next",
          //Customization
          name: "Name",
          skinTone: "Skin Tone",
          size: "Skin Tone",
          tail: "Tail",
          tailColor: "Skin Tone",
          makeOshiri: "Make Oshiri!",
          //MyOshiri
          drawer: "Drawer",
          change: "Change",
          tutorial: "Tutorial",
          getWrappings: "Get Wrappings",
          sendConsent: "Send Consent",
          OSH: "OSH",
          Consent: "Consent",
          inputAddress: "Input the address you want to send consent",
          sendConsentList1:
            "1 of your consent will be sent to the account above",
          sendConsentList2:
            "Please be sure the account has a Oshiri registered and has a Wrapping NFT",
          sendConsentList3:
            "The recipient account will be able to smack your Oshiri and you both will receive OSH",
          //TheirOshiri
          spendConsent: "Spend Consent",
        },
      },
      jp: {
        translation: {
          name: "名前",
          skinTone: "肌の色",
          size: "サイズ",
          tail: "尻尾",
          tailColor: "尻尾の色",
          makeOshiri: "おしりを作る!",
        },
      },
      es: {
        translation: {
          name: "Nombre",
          skinTone: "Color de Piel",
          size: "Tamaño",
          tail: "Cola",
          tailColor: "Color de Cola",
          makeOshiri: "Crear Oshiri!",
        },
      },
    },
  });

export default i18n;
