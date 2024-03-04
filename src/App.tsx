import React, { useEffect, useState } from 'react';
import { Navbar } from './components/navbar/Navbar';
import './app.scss'
import DatePicker from "react-datepicker";
import { subYears, addYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { ApiMetas, ApiMetasGuardar } from './api/ApiMetas';
function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [cstm, setCstm] = useState("");
  const [stateButton, setStateButton] = useState(false);
  const [viewMessage, setViewMessage] = useState(false);
  const [users, setUsers] = useState([{
    ano: "",
    id: "",
    first_name: "",
    last_name: "",
    mes01: 0,
    mes02: 0,
    mes03: 0,
    mes04: 0,
    mes05: 0,
    mes06: 0,
    mes07: 0,
    mes08: 0,
    mes09: 0,
    mes10: 0,
    mes11: 0,
    mes12: 0,
    segmento: "",
  }]);
  const [tableShow, setTableShow] = useState(false);
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  useEffect(() => {
    if (cstm === "") {
      return;
    }
    handleChangeCstm()
  }, [cstm,startDate])
  

  const handleChangeCstm = async () => {
    setViewMessage(false)
    setTableShow(false)
    let body = {
      segmento: cstm,
      ano: moment(startDate).year()
    }
    const user = await ApiMetas(body).then(result => {
      return result.data
    })
    setUsers(user)
    setTableShow(true)
  }

  const handleSubmit = async (e: any) => {
    setStateButton(true)
    setViewMessage(false)
    e.preventDefault()
    const pickingFormated = users.map((item,i) => {
      const obj = {
        'iduser': item.id,
        ...item
      };
      delete obj.id;
      delete obj.ano;
      delete obj.segmento;
      delete obj.first_name;
      delete obj.last_name;
      return obj;
    });
    const data = {
      segmento: e.target.segmento.value,
      ano: e.target.year.value,
      users: pickingFormated
    }
    const response = await  ApiMetasGuardar(data).then(result => {
      return result.data
    })
    if(response){
       setStateButton(false)
        setViewMessage(true)
    }
   
  }

  const handleInputChange = (e: any) => {

    let id = e.name.split('_');
    let usermod = users.map((element, i) => {
      if (i == id[1]) {
        switch (id[2]) {
          case 'mes01':
            element.mes01 = e.value
            break;
          case 'mes02':
            element.mes02 = e.value
            break;
          case 'mes03':
            element.mes03 = e.value
            break;
          case 'mes04':
            element.mes04 = e.value
            break;
          case 'mes05':
            element.mes05 = e.value
            break;
          case 'mes06':
            element.mes06 = e.value
            break;
          case 'mes07':
            element.mes07 = e.value
            break;
          case 'mes08':
            element.mes08 = e.value
            break;
          case 'mes09':
            element.mes09 = e.value
            break;
          case 'mes10':
            element.mes10 = e.value
            break;
          case 'mes11':
            element.mes11 = e.value
            break;
          case 'mes12':
            element.mes12 = e.value
            break;
          default:
            break;
        }

      }
      return element
    });
    setUsers(usermod)
  }
  return (
    <>
      <Navbar />
      {
          viewMessage && 
          <div className="alert alert-success alert-dismissible fade show" role="alert">
             <strong>Guardado con exito!</strong>
           {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
          </div> 
      }
      
      <div className="container-fluid">
        <div className="row pt-4">
          <div className="col-4">
            <div className="mb-3 ">
              <label className="form-label">Set Meta For:</label>
              <select defaultValue={0} className="form-select form-select-lg" aria-label="Default select example" onChange={(event) => setCstm(event.target.value)}>
                <option value="0" disabled>Open this select menu</option>
                <option value="1">HHT</option>
                <option value="2">BIG DEAL</option>
                <option value="3">RESIDENCIAL</option>
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label className="form-label">Year:</label><br />
              <DatePicker
                className="form-select form-select-lg float-start "
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearPicker
                dateFormat="yyyy"
                minDate={subYears(new Date(), 1)}
                maxDate={addYears(new Date(), 1)}
              />
            </div>
          </div>
          
        </div>
        {
          tableShow && (
            <form onSubmit={(event) => handleSubmit(event)}>
               <input type="hidden" name="year" value={moment(startDate).year()} />
               <input type="hidden" name="segmento" value={cstm} />
              <div className='row'>
                <div className='col-12'>
                  <table className="table table-striped table-hover table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        {
                          meses.map((mes,i) =>
                            <th key={i} scope="col">{mes + '-' + moment(startDate).year()}</th>
                          )
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.map((user, i) =>
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{user.first_name + " " + user.last_name}</td>
                           
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes01}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes01"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes02}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes02"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes03}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes03"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes04}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes04"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes05}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes05"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes06}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes06"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes07}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes07"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes08}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes08"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes09}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes09"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes10}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes10"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes11}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes11"}
                                min={0}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control form-control-sm w-75"
                                type="number"
                                value={user.mes12}
                                onChange={(event) => handleInputChange(event.target)}
                                name={"user_" + i + "_mes12"}
                                min={0}
                              />
                            </td>


                          </tr>
                        )

                      }

                    </tbody>
                  </table>
                  <button type="submit" className="btn btn-primary float-end btn-lg" disabled={stateButton}>Guardar</button>
                </div>
              </div>
            </form>
          )
        }
      </div>

    </>
  );
}

export default App;
