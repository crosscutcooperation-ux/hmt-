import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector("#heroVideo");

if (video) {
  video.muted = true;
  video.playsInline = true;

  video.play().catch(() => {
    console.log("Autoplay is blocked until user interaction.");
  });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      if (!video.duration) return;
      const progress = self.progress;
      video.currentTime = progress * (video.duration - 0.1);
    }
  });
}
