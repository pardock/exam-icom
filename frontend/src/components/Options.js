import React, { useState } from 'react';
const Options = ({reload}) => {

    const[ checkbox, setCheckbox] = useState({
        maximo : false,
        minimo : false,
        cambio : false,
        apertura : false
    })


    const changeValue = (e) => {
        const newData = {
            ...checkbox,
            [e.target.name] : e.target.checked
        }
        setCheckbox(newData)
        reload(newData);
    }


    return ( 
        <form>
            <div className="control-group">
                <p className="pull-left" style={{ color : 'black'}}>Selecciona las Opciones</p>
                <div className="controls span2">
                    <div className="custom-control custom-checkbox">
                        <input onChange={(e) => changeValue(e)} name="maximo" type="checkbox" className="custom-control-input" id="maximoDia" />
                        <label className="custom-control-label" htmlFor="maximoDia">Precio Maximo 24 hrs.</label>
                    </div>
                    <br/>
                    <div className="custom-control custom-checkbox">
                        <input onChange={(e) => changeValue(e)} name="minimo" type="checkbox" className="custom-control-input" id="minimoDia" />
                        <label className="custom-control-label" htmlFor="minimoDia">Precio Bajo 24 hrs.</label>
                    </div>
                    <br/>
                    <div className="custom-control custom-checkbox">
                        <input onChange={(e) => changeValue(e)} name="cambio" type="checkbox" className="custom-control-input" id="cambio" />
                        <label className="custom-control-label" htmlFor="cambio">Cambio 24 hrs.</label>
                    </div>
                    <br/>
                    <div className="custom-control custom-checkbox">
                        <input onChange={(e) => changeValue(e)} name="apertura" type="checkbox" className="custom-control-input" id="apertura" />
                        <label className="custom-control-label" htmlFor="apertura">Precio Apertura Dia</label>
                    </div>
                </div>
            </div>
        </form>
     );
}
 
export default Options;