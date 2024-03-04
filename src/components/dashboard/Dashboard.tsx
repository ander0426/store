import React, { useState } from 'react'
import { Navbar } from '../navbar/Navbar'

export const Dashboard = () => {

    const [cardShow, setCardShow] = useState(false);

    const handleChangeUser = (id) => {
        setCardShow(true)
        console.log(id);
        }
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row pt-4">
                    <div className="col-12">
                    <div className="mb-3 ">
                        <label className="form-label">Usuario:</label>
                        <select className="form-select form-select-lg" aria-label="Default select example" onChange={(event) => handleChangeUser(event.target.value)}>
                            <option selected disabled>Selecciona</option>
                            <option value="1">Pedro</option>
                            <option value="2">Maria</option>
                            <option value="3">Jose</option>
                        </select>
                        </div>
                    </div>
                    {cardShow && (
                    <div className='row'>
                    <div className="col-3">
                        <div className="card shadow py-3">
                            <div className="card-body">
                                <h3 className=" text-secondary">Metas Totales Mes Actual</h3>
                                <p className="h4">Procesos:</p>
                                <p className="h4">Monto: </p>
                                <span className="rounded-circle bg-secondary position-absolute span-rounded top-0 end-0 mt-3 me-2 h3 text-center py-2 text-light">
                                    RES
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card shadow py-3">
                                <div className="card-body">
                                    <h3 className=" text-secondary">Metas Totales Mes Actual</h3>
                                    <p className="h4">Procesos:</p>
                                    <p className="h4">Monto: </p>
                                    <span className="rounded-circle bg-secondary position-absolute span-rounded top-0 end-0 mt-3 me-2 h3 text-center py-2 text-light">
                                        RES
                                    </span>
                                </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card shadow py-3">
                            <div className="card-body">
                                <h3 className=" text-secondary">Metas Totales Mes Actual</h3>
                                <p className="h4">Procesos:</p>
                                <p className="h4">Monto: </p>
                                <span className="rounded-circle bg-secondary position-absolute span-rounded top-0 end-0 mt-3 me-2 h3 text-center py-2 text-light">
                                    RES
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card shadow py-3">
                            <div className="card-body">
                                <h3 className=" text-secondary">Metas Totales Mes Actual</h3>
                                <p className="h4">Procesos:</p>
                                <p className="h4">Monto: </p>
                                <span className="rounded-circle bg-secondary position-absolute span-rounded top-0 end-0 mt-2 me-2 h3 text-center py-2 text-light">
                                    RES
                                </span>
                            </div>
                        </div>
                    </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}
