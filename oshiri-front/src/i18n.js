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
          newDayTitle: "It’s a new day!",
          newDayList1:
            "You have recieved Consent, go ahead and share it with someone...",
          gotWrappingTitle: "You got a new Wrapping!",
          gotWrappingList1: " has been transfered to your wallet",
          gotWrappingList2: "You can change your Wrapping on Drawer",
          changeStatsTitle: "Do you want to change your Oshiri stats?",
          changeStatsList1:
            "You may change your skin tone, size and name for a fee of {{fee}}, you will pay at the end",
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
          name: "名前",
          skinTone: "肌の色",
          size: "サイズ",
          tail: "尻尾",
          tailColor: "尻尾の色",
          makeOshiri: "おしりを作る!",

          //MyOshiri
          drawer: "引き出し",
          change: "変更",
          tutorial: "説明",
          getWrappings: "ラッピングをゲット",
          sendConsent: "同意送信",
          OSH: "OSH",
          Consent: "同意",

          /** Wrapping Names */
          //* Chewing Gum
          chewingGum: "ガム",
          //
          ball: "ボール",
          orange: "オレンジ",
          tallWaist: "トールウェイスト",
          flames: "炎の",
          pocket: "ポケット付き",
          //
          bubble: "バブル",
          red: "赤い",
          pink: "ピンク色の",
          singleStripe: "シングル",
          doubleStripe: "ダブル",
          tag: "タグ",
          //
          stick: "スティック",
          black: "黒い",
          //TODO: Variations

          //* Shared
          plain: "プレーン",
          blue: "青い",
          green: "緑色の",
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
