import { gsap } from 'gsap';
import { LINE_COUNT } from '../../constants'
let isLeft = true;

const Animate = (tempo) => {
  if (isLeft) {
    for (let i = 0; i < LINE_COUNT; i++) {
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
    for (let i = (LINE_COUNT - 1); i >= 0; i--) {
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