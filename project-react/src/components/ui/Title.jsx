import React from "react";
import BlurText from "../reactbits/BlurText";
import SplitText from "../reactbits/SplitText";
import TextType from "../reactbits/TextType.jsx";
import Search_Bar from "./Search_Bar.jsx";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const Title = () => {
  return (
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
      <BlurText
        className="text-4xl font-bold text-white text-5xl md:text-6xl font-serif max-w-4xl leading-[1.1]"
        text="Your Gateway to the"
        delay={200}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
      />
      <BlurText
        className="text-4xl font-bold title-yellow text-5xl md:text-6xl font-serif max-w-4xl leading-[1.1] italic mb-6"
        text="Extraordinary"
        delay={200}
        animateBy="words"
        direction="bottom"
        onAnimationComplete={handleAnimationComplete}
      />
      <TextType
        text={[
          "สัมผัสประสบการณ์ความหรูหราและความสะดวกสบายอย่างที่ไม่เคยมีมาก่อน",
          "การเข้าพักที่สมบูรณ์แบบของคุณเริ่มต้นที่นี่.",
        ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor
        cursorCharacter="▎"
        deletingSpeed={50}
        variableSpeedEnabled={false}
        variableSpeedMin={60}
        variableSpeedMax={120}
        cursorBlinkDuration={0.5}
        className="text-white/80 text-md font-light mb-12 max-w-2xl"
      />
      <Search_Bar />
    </div>
  );
};

export default Title;
