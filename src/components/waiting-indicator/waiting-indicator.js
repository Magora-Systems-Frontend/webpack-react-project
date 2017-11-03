if(global.IS_BROWSER){
  require("./waiting-indicator.styl");
}

import React from 'react';

function WaitingIndicator({
  backgroundColor ='rgba(255, 255, 255, 0.4)',
  stroke = '#252963',
  strokeWidth = 2,
  size = '120px'
}) {

  return (
    <div
      className='waiting-indicator'
      style={{backgroundColor}}
    >
      <svg
        className='waiting-indicator__circle-container'
        style={{width: size, height: size}}
        viewBox='25 25 50 50'
      >
        <circle
          className='waiting-indicator__circle'
          cx='50'
          cy='50'
          r='20'
          fill='none'
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  )
}

export {WaitingIndicator};
