import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export default function RaycastBackground() {
  const { width, height } = useWindowSize();
  return (
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}>
      <UnicornScene production={true} projectId="cbmTT38A0CcuYxeiyj5H" width={width} height={height} />
    </div>
  );
}