import { useEffect, useState } from "react";
import { Snackbar,Alert } from "@mui/material";
import cross from "../assets/AvatarPageCrossIcon.svg";

const CustomSnackbar = ({ message, startColor, endColor, open, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame;

    if (open) {
      setProgress(0);
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const newProgress = Math.min((elapsedTime / 2500) * 100, 100); 

        setProgress(newProgress);

        if (newProgress < 100) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [open]);

  return (
    <Snackbar
  open={open}
  autoHideDuration={3000}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  onClose={onClose}
>
  <Alert
    severity="hidden"
    className="flex items-center rounded-md text-black transition-colors duration-2000 ease-in-out"
    style={{
      background: `linear-gradient(to right, ${endColor} ${progress}%, ${startColor} ${progress}%)`,
    }}
  >
    <div className="flex items-center justify-between w-full">
      <p className="text-base font-normal text-left
        max-[1024px]:text-sm
        max-[768px]:text-xs
        max-[480px]:text-[8px]">
        {message}
      </p>
      <img
        src={cross}
        alt=""
        className="ml-[2%] self-center h-[7%] w-[7%]"
        onClick={onClose}
      />
    </div>
  </Alert>
</Snackbar>
  );
};

export default CustomSnackbar;
