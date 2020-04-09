import React from 'react';

import './index.scss';

function Field({ id, onClick, field, row }) {
  return (
    <div className="field-container field">
      <span className={`field ${field.color}`} id={id}>
        {
          field.x ? <span className={`field x ${field.x}`}
            data-type={field.x}
            data-row={row}
            data-index={id}
            data-stoneId={field.stoneId}
            onClick={(event) => {
              if (typeof (onClick) === "function") onClick(event.target.dataset)
            }}
          > </span> : null
        }
      </span>
    </div >
  )
}
export default Field;