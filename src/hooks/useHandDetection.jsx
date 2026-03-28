import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/predict";

export default function useHandDetection({ onPrediction, predictInterval = 500, enabled = true }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastPredictRef = useRef(0);
  const [cameraReady, setCameraReady] = useState(false);
  const [gesture, setGesture] = useState("---");
  const [confidence, setConfidence] = useState(0);

  const buildLandmarkArray = useCallback((results) => {
    const arr = new Array(126).fill(0);
    if (results.multiHandLandmarks && results.multiHandedness) {
      results.multiHandLandmarks.forEach((lm, i) => {
        const label = results.multiHandedness[i]?.label;
        const offset = label === "Right" ? 0 : 63;
        lm.forEach((p, j) => {
          arr[offset + j * 3] = p.x;
          arr[offset + j * 3 + 1] = p.y;
          arr[offset + j * 3 + 2] = p.z;
        });
      });
    }
    return arr;
  }, []);

  const predict = useCallback(async (landmarks, extra = {}) => {
    try {
      const res = await axios.post(API_URL, { landmarks, ...extra });
      const { gesture: g, confidence: c } = res.data;
      setGesture(g || "---");
      setConfidence(c || 0);
      onPrediction?.(g, c);
    } catch {
      /* server not available */
    }
  }, [onPrediction]);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCameraReady(true);
        }

        const { Hands } = await import("@mediapipe/hands");
        if (cancelled) return;
        const hands = new Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.6, minTrackingConfidence: 0.5 });
        hands.onResults((results) => {
          const now = Date.now();
          if (now - lastPredictRef.current >= predictInterval) {
            lastPredictRef.current = now;
            const lm = buildLandmarkArray(results);
            predict(lm);
          }
        });
        handsRef.current = hands;

        const tick = async () => {
          if (cancelled) return;
          if (videoRef.current && videoRef.current.readyState >= 2) {
            await hands.send({ image: videoRef.current });
          }
          animFrameRef.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (err) {
        console.error("Camera/MediaPipe error:", err);
      }
    };
    init();

    return () => {
      cancelled = true;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      handsRef.current?.close();
      streamRef.current?.getTracks().forEach(t => t.stop());
      setCameraReady(false);
    };
  }, [enabled, predictInterval, buildLandmarkArray, predict]);

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    handsRef.current?.close();
    streamRef.current?.getTracks().forEach(t => t.stop());
    setCameraReady(false);
  }, []);

  return { videoRef, canvasRef, cameraReady, gesture, confidence, stopCamera };
}
