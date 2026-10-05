import React, { memo } from 'react';
import './ShinyText.css';

const ShinyText = memo(({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
  style = {}
}) => {
  const animClass = disabled
    ? 'shiny-text--disabled'
    : yoyo
    ? 'shiny-text--yoyo'
    : direction === 'right'
    ? 'shiny-text--right'
    : 'shiny-text--left';

  const pauseClass = pauseOnHover ? 'shiny-text--pause-hover' : '';

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    '--shiny-speed': `${speed}s`,
    '--shiny-delay': `${delay}s`,
    ...style
  };

  return (
    <span
      className={`shiny-text ${animClass} ${pauseClass} ${className}`.trim()}
      style={gradientStyle}
    >
      {text}
    </span>
  );
});

ShinyText.displayName = 'ShinyText';

export default ShinyText;
