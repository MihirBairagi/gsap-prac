import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const Section3 = () => {
  useEffect(() => {
    const container = document.querySelector('.section-3-box');
    const elements = document.querySelectorAll('.draggable-item');

    Draggable.create(elements, {
      type: 'x,y',
      bounds: container, // restrict movement within the container
      onDrag: function() {
        gsap.to(this.target, {
          rotation: gsap.utils.random(-15, 15),
          ease: 'power1.inOut',
          overwrite: true,
        });

        // Handle collisions
        elements.forEach(other => {
          if (this.target !== other && isColliding(this.target, other)) {
            resolveCollision(this.target, other);
          }
        });
      },
      onDragEnd: function() {
        const velocityX = this.endX - this.startX;
        const velocityY = this.endY - this.startY;
        const directionX = velocityX > 0 ? 1 : -1;
        const directionY = velocityY > 0 ? 1 : -1;
        const distanceX = Math.abs(velocityX) * 10;
        const distanceY = Math.abs(velocityY) * 10;

        // Calculate bounds
        const parentRect = container.getBoundingClientRect();
        const itemRect = this.target.getBoundingClientRect();

        // Clamp positions within bounds
        let finalX = gsap.utils.clamp(
          0,
          parentRect.width - itemRect.width,
          this.x + distanceX * directionX
        );
        let finalY = gsap.utils.clamp(
          0,
          parentRect.height - itemRect.height,
          this.y + distanceY * directionY
        );

        // Apply horizontal and vertical inertia while staying within bounds
        gsap.to(this.target, {
          x: finalX,
          y: finalY,
          ease: "power2.out",
          duration: 1,
          onComplete: () => {
            // Gravity effect for Y position
            gsap.to(this.target, {
              y: parentRect.height - itemRect.height - 230,
              ease: "bounce.out",
              duration: 1,
            });
          }
        });
      }
    });

    // Collision detection function
    function isColliding(el1, el2) {
      const rect1 = el1.getBoundingClientRect();
      const rect2 = el2.getBoundingClientRect();

      return !(rect1.right < rect2.left || 
               rect1.left > rect2.right || 
               rect1.bottom < rect2.top || 
               rect1.top > rect2.bottom);
    }

    // Resolve the collision by pushing the elements apart
    function resolveCollision(el1, el2) {
      const rect1 = el1.getBoundingClientRect();
      const rect2 = el2.getBoundingClientRect();

      const overlapX = Math.min(rect1.right - rect2.left, rect2.right - rect1.left);
      const overlapY = Math.min(rect1.bottom - rect2.top, rect2.bottom - rect1.top);

      if (overlapX < overlapY) {
        gsap.to(el1, { x: `-=${overlapX / 2}` });
        gsap.to(el2, { x: `+=${overlapX / 2}` });
      } else {
        gsap.to(el1, { y: `-=${overlapY / 2}` });
        gsap.to(el2, { y: `+=${overlapY / 2}` });
      }
    }
  }, []);

  return (
    <section className='section-3 section'>
      <div className="container">
        <h2>Drag and Play</h2>
        <div className="section-3-box py-[8rem] relative h-[30rem] w-[100%] border-red-700 border-2 overflow-hidden">
          <div className="draggable-item bg-blue-400 w-[2rem] h-[2rem] rounded-lg absolute"></div>
          <div className="draggable-item bg-red-400 w-[2rem] h-[2rem] rounded-lg absolute"></div>
          <div className="draggable-item bg-green-400 w-[2rem] h-[2rem] rounded-lg absolute"></div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
