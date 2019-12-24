import React, { useState } from "react";

var d3 = require("d3");

const Quest = ({
  objects = null,
  reactives = null,
  selected = null,
  setSelect = null
}) => {
  const [step, setStep] = useState(1);
  const steper = steap => {
    const reactive = reactives[steap];

    const evaluate = () => {
      const svgDoom = d3
        .select("svg")
        .selectAll("#maproot")
        .selectAll("g[id]:not([id=Leaves])");

      const items = svgDoom._groups[0];

      Object.values(items).map(key => {
        const ifExist = reactive.objects.find(element => {
          return element === key.id;
        });
        const ifselected = selected.find(element => {
          return element.idObject === key.id;
        });
        if ((!!ifExist && ifselected)) {
          key.style.stroke = "green";
          return key;
        } else if (!ifExist && !ifselected) {
          key.style.stroke = "none";
        } else {
          key.style.stroke = "red";
        }
      });
    };

    const continuar = () => {
      if (reactives.length === steap) {
        return;
      }
      setStep(step + 1);
    };
    return (
      <div>
        {(!!reactive && reactive.reactive && (
          <>
            <h4 className="text-center">{reactive.reactive}</h4>
            <div className="col-12 ">
              <ul className="list-group">
                {selected.map((object, index) => {
                  const tag = objects.find(element => {
                    return element.idObject === object.idObject;
                  });

                  return (
                    <li key={index} className="list-group-item">
                      <i className="fa  pr-1" />
                      {(tag && tag.tag) || object.idObject}
                    </li>
                  );
                })}
              </ul>
              <div className="d-flex justify-content-between">
                <div
                  className="btn btn-primary col-md-4 "
                  onClick={() => {
                    evaluate();
                  }}
                >
                  Evaluar
                </div>
                {(step < reactives.length - 1 && (
                  <div
                    className="btn btn-success col-md-4"
                    onClick={() => {
                      setSelect();
                      continuar();
                    }}
                  >
                    Continuar
                  </div>
                )) || (
                  <div
                    className="btn btn-success col-md-4"
                    onClick={() => {
                      setSelect();
                      continuar();
                    }}
                  >
                    finalizar
                  </div>
                )}
              </div>
            </div>
          </>
        )) ||
          (reactives.length === steap && (
            <>
              <div className="card card-body bg-success text-white mb-3">
                Felicidades, has completado el cuestionario
              </div>
              <div
                className="btn btn-info col-md-4"
                onClick={() => {
                  setStep(1);
                }}
              >
                Reiniciar
              </div>
            </>
          ))}
      </div>
    );
  };
  return <div className="mt-4">{steper(step)}</div>;
};

export default Quest;
