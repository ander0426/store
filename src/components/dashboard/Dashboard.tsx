import React, { useEffect, useState } from 'react'
import { Navbar } from '../navbar/Navbar'
import { ApiMetasConsulUser, ApiMetasConsulUserMes } from '../../api/ApiMetas';

export const Dashboard = () => {

    const [cardShow, setCardShow] = useState(false)
    const [users, setUsers] = useState([])
    const [cardsData, setCardsData] = useState({
        "month": {
            "first_day": "",
            "last_day": "",
            "ammount": 0,
            "opportunities": []
        },
        "year": {
            "first_day": "",
            "last_day": "",
            "opportunities": [
                {
                    "process_quantity": "",
                    "assigned_user_id": "",
                    "tipo_de_servicio_c": "",
                    "amount_usdollar": 0
                }
            ]
        }
    })

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const consultUsers = async () => {
        const user = await ApiMetasConsulUser().then(result => {
            return result.data
        })
        setUsers(user)
    }

    const typeMeta = (type:any) => {
        console.log(type)
        switch (type) {
            case "Big Deal":
                return "BDL"
                break;
            case "HHT":
                return "HHT"
                break;
            case "Residencial":
                return "RST"
                break;

            default:
                break;
        }
    }

    useEffect(() => {

        consultUsers()

    }, [])

    const handleChangeUser = async (id) => {
        let data = {
            iduser: id
        }
        const metas = await ApiMetasConsulUserMes(data).then(result => {
            return result.data
        })
        setCardsData(metas)
        setCardShow(true)
    }
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row pt-4">
                    <div className="col-12">
                        <div className="mb-3 ">
                            <label className="form-label">Usuario:</label>
                            <select className="form-select form-select-lg" defaultValue={"00"} aria-label="Default select example" onChange={(event) => handleChangeUser(event.target.value)}>
                                <option value="00" disabled>Selecciona</option>
                                {
                                    users.map((user, i) =>
                                        <option key={i} value={user.id}>{user.first_name + " " + user.last_name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    {cardShow && (
                        <div className='row'>
                            {
                                cardsData.month.opportunities.map((item, i) =>
                                    <div className="col-3" key={i}>
                                        <div className="card shadow py-3">
                                            <div className="card-body">
                                                <h3 className=" text-secondary">Metas Totales Mes Actual</h3>
                                                <p className="h4">Procesos: {item.process_quantity}</p>
                                                <p className="h4">Monto: {USDollar.format(item.amount_usdollar)}</p>

                                                <span className="rounded-circle bg-secondary position-absolute span-rounded top-0 end-0 mt-3 me-2 h3 text-center py-2 text-light">
                                                    {typeMeta(item.tipo_de_servicio_c)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                cardsData.year.opportunities.map((item, i) =>
                                    <div className="col-3" key={i}>
                                        <div className="card shadow py-3">
                                            <div className="card-body">
                                                <h3 className=" text-secondary">Metas Totales YTD</h3>
                                                <p className="h4">Procesos: {item.process_quantity}</p>
                                                <p className="h4">Monto: {USDollar.format(item.amount_usdollar)}</p>

                                                <span className="rounded-circle bg-secondary position-absolute span-rounded top-0 end-0 mt-3 me-2 h3 text-center py-2 text-light">
                                                    {typeMeta(item.tipo_de_servicio_c)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
