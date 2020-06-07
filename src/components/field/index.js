import React from "react";
import uuid from "react-uuid";

import "./index.scss";

function Field({ id, onClick, field }) {
  return (
    <div className="field-container field">
      <span className={`field ${field.color}`} id={id}>
        {field.x ? (
          typeof field.x !== "object" ? (
            <span
              className={`field x ${field.color}`}
              key={uuid()}
              onClick={(event) => {
                if (typeof onClick === "function")
                  onClick(event.target.dataset);
              }}
            >
              {" "}
            </span>
          ) : (
            field.x.map((item, index) => {
              return (
                <span
                  className={`field x ${item.player}`}
                  key={uuid()}
                  onClick={(event) => {
                    if (typeof onClick === "function")
                      onClick(event.target.dataset);
                  }}
                >
                  {" "}
                </span>
              );
            })
          )
        ) : null}
      </span>
    </div>
  );
}
export default Field;
