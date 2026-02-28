import React, { useEffect, useState } from 'react';

const FloatingDez: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1.5 second delay before taking entrance action
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const chatButton = document.getElementById('lc-fab-button');
    if (chatButton) {
      chatButton.click();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          @keyframes slideInDesktop {
            from {
              transform: translateX(-100%) translateY(0);
              opacity: 0;
            }
            to {
              transform: translateX(0) translateY(0);
              opacity: 1;
            }
          }
                        
          @keyframes slideInMobile {
            from {
              transform: translateX(-100%) translateY(0);
              opacity: 0;
            }
            to {
              transform: translateX(0) translateY(0);
              opacity: 1;
            }
          }

          @keyframes bobAndGlow {
            0%, 100% {
              transform: translateY(0);
              filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.4)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.2));
            }
            50% {
              transform: translateY(-15px);
              filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.7)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.4));
            }
          }

          .floating-dez-container {
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            z-index: 50; /* Above regular content, below highest overlay/navs */
            cursor: pointer;
            width: 200px; /* Desktop size */
            height: auto;
            /* Entrance animation */
            animation: slideInDesktop 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }

          .floating-dez-image {
            width: 100%;
            height: auto;
            /* Continuous bobbing and glowing */
            animation: bobAndGlow 4s ease-in-out infinite;
            /* Important to prevent dragging on image */
            user-select: none;
            -webkit-user-drag: none;
            transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
            
          .floating-dez-image:hover {
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            .floating-dez-container {
              bottom: 1rem;
              left: 1rem;
              width: 120px; /* Mobile size */
              animation: slideInMobile 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
          }
        `}
      </style>

      <div
        className="floating-dez-container"
        onClick={handleClick}
        title="Chat with Live Concierge"
        role="button"
        tabIndex={0}
      >
        <img
          src="/desiree-float.png"
          alt="Desiree floating illustration"
          className="floating-dez-image"
        />
      </div>
    </>
  );
};

export default FloatingDez;
