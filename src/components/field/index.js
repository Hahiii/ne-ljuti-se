import React from 'react';

import './index.scss';

function Field({ sort, positionX, positionY }) {
  console.log(sort)
  return (
    <div className="field-container" style={{ left: `${positionX}px`, top: `${positionY}px` }}>
      <span className={`field ${sort}`} ></span>
    </div>
  )
}
export default Field;