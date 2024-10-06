import React, { useEffect, useRef, useState } from "react";
import { useAppState } from "../context/AppStateContext";

const VideoPlayer = ({
  setPlayDubbed,
  playDubbed,
  audioUrl,
  setStartDubbing,
  startDubbing,
}) => {
  const videoRef = useRef(null);
  const { videoStatus, setVideoStatus } = useAppState();
  const [videoSrc, setVideoSrc] = useState("./assets/videoplayback.mp4");

  // const handlePlayPause = () => {
  //   if (videoStatus.playing) {
  //     videoRef.current.pause();
  //     setVideoStatus({ ...videoStatus, playing: false });
  //   } else {
  //     videoRef.current.play();
  //     setVideoStatus({ ...videoStatus, playing: true });
  //   }
  // };

  const handlePlaySynced = (e) => {
    setPlayDubbed(!playDubbed);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  const handleProgress = () => {
    const currentTime = videoRef.current.currentTime;
    setVideoStatus({ ...videoStatus, currentTime });
  };

  // const handleVideoUrlChange = (e) => {
  //   setVideoSrc(e.target.value);
  // };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideoSrc(fileURL);
    }
  };

  useEffect(() => {
    if (startDubbing) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [startDubbing]);

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-2xl">
        {/* Responsive video container */}
        <div className="aspect-w-16 aspect-h-9">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full"
            onTimeUpdate={handleProgress}
            controls
            muted={playDubbed}
          ></video>
        </div>
      </div>

      {/* Input for video URL */}
      <div className="flex gap-3">
        <div className="flex flex-col items-center mt-4 space-y-2">
          <label
            htmlFor="fileInput"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        {audioUrl && (
          <div className="flex flex-col items-center mt-4 space-y-2">
            <label
              htmlFor="playSynced"
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300"
            >
              Play Synced
            </label>
            <button id="playSynced" onClick={handlePlaySynced} />
          </div>
        )}
        <div className="flex flex-col items-center mt-4 space-y-2">
          <label
            htmlFor="startDubbing"
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            {startDubbing ? "Stop Dubbing" : "Start Dubbing"}
          </label>
          <button
            id="startDubbing"
            onClick={() => setStartDubbing(!startDubbing)}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
