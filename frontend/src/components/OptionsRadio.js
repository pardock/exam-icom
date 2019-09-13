import React, { Fragment } from "react";

const OptionsRadio = ({filterMinutes}) => {

    const changeMinutos = (e) => {
        if(e.target.checked){
            filterMinutes(e.target.value)
        }

    }
  return (
    <Fragment>
      <div className="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          className="custom-control-input"
          id="defaultInline1"
          name="inlineDefaultRadiosExample"
          value="60"
          onChange={changeMinutos}
        />
        <label className="custom-control-label" htmlFor="defaultInline1">
          1 Hora
        </label>
      </div>

      <div className="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          className="custom-control-input"
          id="defaultInline2"
          name="inlineDefaultRadiosExample"
          value="360"
          onChange={changeMinutos}
        />
        <label className="custom-control-label" htmlFor="defaultInline2">
          6 Horas
        </label>
      </div>

      <div className="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          className="custom-control-input"
          id="defaultInline3"
          name="inlineDefaultRadiosExample"
          value="720"
          onChange={changeMinutos}
        />
        <label className="custom-control-label" htmlFor="defaultInline3">
          12 Horas
        </label>
      </div>

      <div className="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          className="custom-control-input"
          id="defaultInline3"
          name="inlineDefaultRadiosExample"
          value="1440"
          onChange={changeMinutos}
        />
        <label className="custom-control-label" htmlFor="defaultInline3">
          24 Horas
        </label>
      </div>

      <div className="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          className="custom-control-input"
          id="defaultInline3"
          name="inlineDefaultRadiosExample"
          value="432000"
          onChange={changeMinutos}
        />
        <label className="custom-control-label" htmlFor="defaultInline3">
          1 Mes
        </label>
      </div>
    </Fragment>
  );
};

export default OptionsRadio;
