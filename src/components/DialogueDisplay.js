// components/DialogueDisplay.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogueIndex } from '../redux/dialoguesSlice';

const DialogueDisplay = () => {
  const { dialogues, currentDialogueIndex } = useSelector(state => state.dialogues);
  const dialogue = dialogues[currentDialogueIndex];
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dialogue</h2>
      <textarea value={dialogue.originalText} readOnly className="w-full p-2 border mt-2" />
      <textarea value={dialogue.translatedText} readOnly className="w-full p-2 border mt-2" />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => dispatch(setDialogueIndex(Math.max(0, currentDialogueIndex - 1)))}
          className="bg-gray-500 text-white py-1 px-4"
        >
          Previous
        </button>
        <button
          onClick={() => dispatch(setDialogueIndex(Math.min(dialogues.length - 1, currentDialogueIndex + 1)))}
          className="bg-gray-500 text-white py-1 px-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DialogueDisplay;