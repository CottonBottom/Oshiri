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
