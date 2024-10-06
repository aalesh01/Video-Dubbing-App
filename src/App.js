import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import AudioRecorder from "./components/AudioRecorder";
import DialogueDisplay from "./components/DialogueDisplay";

function App() {
  const [playDubbed, setPlayDubbed] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [startDubbing, setStartDubbing] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-blue-500 to-indigo-600 p-6 flex flex-col items-center">
      <header className="w-full flex flex-col gap-4 max-w-4xl">
        <div>
          <img
            src="https://goquestmedia.com/wp-content/themes/gqv2/img/logo.png"
            alt="Netlify Logo"
            className="w-42 mx-auto"
          />
        </div>
        <h1 className="text-4xl font-mono font-extrabold text-center text-white mb-6">
          Video & Audio Sync App
        </h1>
      </header>

      <div className="w-full flex flex-col md:flex-row gap-8 justify-between items-stretch mb-8">
        <div className="w-full flex-grow-1 md:w-1/2 bg-white p-3 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
          <VideoPlayer
            audioUrl={audioUrl}
            setPlayDubbed={setPlayDubbed}
            playDubbed={playDubbed}
            setStartDubbing={setStartDubbing}
            startDubbing={startDubbing}
          />
        </div>
        <div className="w-full flex-grow-1 md:w-1/2 bg-white p-3 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
          <AudioRecorder
            audioUrl={audioUrl}
            playDubbed={playDubbed}
            setAudioUrl={setAudioUrl}
            startDubbing={startDubbing}
          />
        </div>
      </div>
      <div className="w-full h-full max-w-4xl bg-white p- shadow-lg rounded-lg">
        <DialogueDisplay />
      </div>
    </div>
  );
}

export default App;
