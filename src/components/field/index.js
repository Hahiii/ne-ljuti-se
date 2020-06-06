import React from 'react';
import uuid from 'react-uuid';

import './index.scss';

function Field({ id, onClick, field, row }) {
  return (
    <div className="field-container field">
      <span className={`field ${field.color}`} id={id}>
        {
          field.x ? typeof (field.x) !== "object" ?
            <span
              className={`field x ${field.x}`}
              data-type={field.x}
              data-row={row}
              data-index={id}
              data-stoneid={field.stoneId}
              key={uuid()}
              onClick={(event) => {
                if (typeof (onClick) === "function") onClick(event.target.dataset)
              }}
            > </span> : field.x.map((item, index) => {
              return (<span className={`field x ${item.x}`}
                data-type={item.x}
                data-row={row}
                data-index={id}
                data-stoneid={item.stoneId}
                key={uuid()}
                onClick={(event) => {
                  if (typeof (onClick) === "function") onClick(event.target.dataset)
                }}
              > </span>)
            }) : null
        }
      </span>
    </div >
  )
}
export default Field;