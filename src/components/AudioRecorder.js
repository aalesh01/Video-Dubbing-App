import React, { useState, useRef, useEffect } from "react";

const AudioRecorder = ({ audioUrl, setAudioUrl, playDubbed, startDubbing }) => {
  const [recording, setRecording] = useState(false);
  const [, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const animationIdRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    audioChunks.current = [];
    recorder.ondataavailable = (e) => audioChunks.current.push(e.data);
    recorder.start();

    setRecording(true);
    visualize(stream);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      setAudioBlob(audioBlob);
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    };

    stopVisualization();
  };

  const visualize = (stream) => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;

    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);

    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    sourceRef.current = source;
    drawWaveform();
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = dataArrayRef.current;

    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "#f3f3f3";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#4a90e2";

      canvasCtx.beginPath();
      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  const stopVisualization = () => {
    const source = sourceRef.current;
    if (source) {
      source.disconnect();
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().then(() => {
        audioContextRef.current = null;
      });
    }
    cancelAnimationFrame(animationIdRef.current);
  };

  const visualizePlayback = () => {
    if (audioUrl && audioRef.current) {
      // Only set up the audio context and visualizer if it's not already running
      if (
        !audioContextRef.current ||
        audioContextRef.current.state === "closed"
      ) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;

        if (!sourceRef.current) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(
            audioRef.current
          );
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }

        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
      }

      drawWaveform(); // Start the visualization
    }
  };

  useEffect(() => {
    return () => {
      stopVisualization();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (playDubbed && audioUrl) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [audioUrl, playDubbed]);

  useEffect(() => {
    if (startDubbing) {
      startRecording();
    }
    if (!startDubbing && recording) {
      stopRecording();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDubbing]);

  return (
    <div className="max-w-md mx-auto p-4 text-center space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          onClick={recording ? stopRecording : startRecording}
          className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
        >
          {recording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      <canvas ref={canvasRef} className="w-full h-32 bg-gray-100" />

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          controls
          className="w-full mt-4"
          onPlay={visualizePlayback} // Start visualization when playing
          onPause={stopVisualization} // Stop when paused
          onEnded={stopVisualization} // Stop when audio ends
        />
      )}
    </div>
  );
};

export default AudioRecorder;
