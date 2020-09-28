import { gsap } from 'gsap';

let isLeft = true;

const Animate = (tempo) => {
  if (isLeft) {
    for (let i = 0; i < 40; i++) {
      gsap.fromTo(
        `#L${i}`,
        { scaleX: 1 },
        {
          scaleX: 2,
          duration: 60 / tempo / 5,
          delay: (i - 1) / (tempo * 2),
          repeat: 1,
          yoyo: true,
        }
      );
    }
  } else {
    for (let i = 39; i >= 0; i--) {
      gsap.fromTo(
        `#L${i}`,
        { scaleX: 1 },
        {
          scaleX: 2,
          duration: 60 / tempo / 5,
          delay: ((i - 39) * -1) / (tempo * 2),
          repeat: 1,
          yoyo: true,
        }
      );
    }
  }

  isLeft = !isLeft;
};

export {
  Animate
}