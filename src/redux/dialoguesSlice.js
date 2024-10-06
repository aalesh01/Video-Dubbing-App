import { createSlice } from "@reduxjs/toolkit";

const dialoguesSlice = createSlice({
  name: "dialogues",
  initialState: {
    dialogues: [
      {
        id: 1,
        originalText: "[संगीत]",
        translatedText: "[Music]",
      },
      {
        id: 2,
        originalText: "[प्रशंसा]",
        translatedText: "[Applause]",
      },
      {
        id: 3,
        originalText: "70 मिनट है तुम्हारे पास",
        translatedText: "Seventy minutes. You have seventy minutes.",
      },
      {
        id: 4,
        originalText: "शायद तुम्हारी जिंदगी के सबसे अच्छा",
        translatedText:
          "Perhaps the most important seventy minutes of your life.",
      },
      {
        id: 5,
        originalText: "चाहे कुछ रहे या ना रहे तुम हर हो या जीतो",
        translatedText:
          "Whether you play well or not, you will remember these seventy minutes for the rest of your life.",
      },
      {
        id: 6,
        originalText: "लेकिन ये 70 मिनट तुमसे कोई नहीं जीत सकता",
        translatedText: "Nobody can take these seventy minutes away from you.",
      },
      {
        id: 7,
        originalText: "कोई नहीं",
        translatedText: "Nobody.",
      },
      {
        id: 8,
        originalText:
          "तो मैं सोचा की इस मैच में कैसा खेलने है आज मैं तुम्हें नहीं बताऊंगा बल्कि तुम मुझे बताओगे खेल कर",
        translatedText:
          "Today, I am not going to tell you how to play. Instead, you will tell me - by playing the game.",
      },
      {
        id: 9,
        originalText:
          "क्योंकि मैं जानता हूं की अगर यह 70 मिनट इस टीम का हर प्ले हर अपने जिंदगी की सबसे बढ़िया हॉकी खेल गया",
        translatedText:
          "Because I am confident, that if every player in this team plays the best hockey of her life...",
      },
      {
        id: 10,
        originalText: "तो ये 70 मिनट खुदा भी तुमसे वापस नहीं मांग सकता",
        translatedText:
          "...then even God himself cannot take these seventy minutes away from you.",
      },
      {
        id: 11,
        originalText:
          "जो और अपने आप से इस जिंदगी से अपने खुदा से इंसान से जिसने तुम्हें तुम पर भरोसा नहीं किया",
        translatedText:
          "So go forth - and from yourself, from your life and from every person who ever doubted you, grab these seventy minutes.",
      },
      {
        id: 12,
        originalText: "[संगीत]",
        translatedText: "[Music]",
      },
      {
        id: 13,
        originalText: "[प्रशंसा]",
        translatedText: "[Applause]",
      },
    ],
    currentDialogueIndex: 0,
    recording: false,
  },
  reducers: {
    setDialogueIndex: (state, action) => {
      state.currentDialogueIndex = action.payload;
    },
    setRecording: (state, action) => {
      state.recording = action.payload;
    },
  },
});

export const { setDialogueIndex, setRecording } = dialoguesSlice.actions;
export default dialoguesSlice.reducer;
