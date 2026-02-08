import React from "react";
import AnimatedContent from "../reactbits/AnimatedContent";

const Hero = () => {
  return (
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base/7 text-gray-600">
                จองที่พักได้ทุกที่ทุกเวลา ระบบรองรับการทำงานตลอด 24 ชั่วโมง
              </dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                24/7
              </dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base/7 text-gray-600">ระบบชำระเงินมาตรฐานสากล ข้อมูลของคุณจะถูกเก็บเป็นความลับ</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Safe 100
              </dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt class="text-base/7 text-gray-600">ทีมงานพร้อมดูแลคุณในทุกย่างก้าวของการเดินทาง</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Supports
              </dd>
            </div>
          </dl>
        </AnimatedContent>
      </div>
    </div>
  );
};

export default Hero;
