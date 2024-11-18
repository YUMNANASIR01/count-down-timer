
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function CountDownTimer() {
  //------------------- variables --------------------//
  const [duration, setDuration] = useState<number | string>(""); // Changed let to const
  const [timeLeft, setTimeLeft] = useState(0); // Changed let to const
  const [isActive, setIsActive] = useState<boolean>(false); // Changed let to const
  const timer = useRef<NodeJS.Timeout | null>(null); // Use NodeJS.Timeout for proper type

  //------------------- timeformat --------------------//
  const timeformat = (time: number): string => {
    const minutes = Math.floor(time / 60); // Changed let to const
    const seconds = time % 60; // Changed let to const
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  //--------------------------- setbutton ---------------------//
  const setbtn = () => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
    }
  };

  //---------------------- start button----------------------//
  const startbtn = () => {
    setIsActive(true);
  };

  //---------------------- pause button ---------------------//
  const pausebtn = () => {
    setIsActive(false);
    if (timer.current) {
      clearInterval(timer.current);
    }
  };

  //----------------------- reset button-----------------------------//
  const resetbtn = () => {
    setIsActive(false);
    setTimeLeft(0);
    setDuration("");
    if (timer.current) {
      clearInterval(timer.current);
    }
  };

  useEffect(() => {
    if (isActive) {
      timer.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            clearInterval(timer.current!);
            return 0;
          }
        });
      }, 1000);
    } else {
      if (timer.current) {
        clearInterval(timer.current!);
      }
    }

    // Cleanup interval on component unmount
    return () => {
      if (timer.current) {
        clearInterval(timer.current!);
      }
    };
  }, [isActive]);

  return (
    <>
      <div className="h-[400px] w-[600px] bg-slate-400 rounded-[16px] shadow-orange-300 border-[#741f78] border-[8px] flex justify-center items-center flex-col">
        <h1 className="text-[35px] font-[700] mb-[20px]">
          <hr />
          <hr />
          <hr />
          Count Down Timer
          <hr />
          <hr />
          <hr />
        </h1>
        <div className="flex gap-[20px] mt-[10px]">
          <Input
            className="w-[300px] text-[16px]"
            placeholder="Enter Duration in Seconds "
            type="number"
            onChange={(e) => {
              setDuration(Number(e.target.value));
            }}
            value={duration}
          />
          <Button onClick={setbtn}>Set</Button>
        </div>
        <div className="text-[70px] font-[700]">{timeformat(timeLeft)}</div>
        <div className="flex gap-[30px]">
          <Button onClick={startbtn}>Start</Button>
          <Button onClick={pausebtn}>Pause</Button>
          <Button onClick={resetbtn}>Reset</Button>
        </div>
      </div>
    </>
  );
}

export default CountDownTimer;






