import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import bdLaboratorio from '../../api/bdLaboratorio'
import { useForm } from "react-hook-form";
const URLTIPOS = "/v1/exam-type";
const URLLOTES = "/v1/lot";
const URL = "/v1/exam";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TablaExamen from './TablaExamen';
import FormExamen from './FormExamen';
import Resultado from './Resultado';
import Graficos from './Graficos';
const MySwal = withReactContent(Swal);
const Examen = () => {
    const token = localStorage.getItem("token");
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [lotes, setLotes] = useState()
    const [tiposExamenes, setTiposExamenes] = useState()
    const [tipoExamen, setTipoExamen] = useState()
    const [fechaInicio, setFechaInicio] = useState()
    const [fechaFin, setFechaFin] = useState()
    const [refresh, setRefresh] = useState(false)
    const [modal, setModal] = useState(false);
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState();
    const [actualizacion, setActualizacion] = useState(false);
    const defaulValuesForm = {
        date: "",
        medition: "",
    };

    const getAuthHeaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    useEffect(() => {
        if (fechaInicio && fechaFin && tipoExamen) {
            bdLaboratorio
            .get(`${URL}?start_date=${fechaInicio}&end_date=${fechaFin}&type=${tipoExamen?.value}`,
                getAuthHeaders())
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                setData([]);
             });          
        }     
    }, [refresh, fechaInicio, fechaFin, tipoExamen]);

    useEffect(() => {
        setFilter(
            data?.data?.filter(
                (e) =>
                    e?.date?.toLowerCase()
                        .indexOf(search?.toLowerCase()) !== -1
            )
        );
    }, [search]);

    const handleFilter = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        bdLaboratorio
            .get(URLTIPOS, getAuthHeaders())
            .then((res) => {
                setTiposExamenes(res.data);
            })
            .catch((err) => { });
    }, [refresh]);

    useEffect(() => {
        bdLaboratorio
            .get(URLLOTES, getAuthHeaders())
            .then((res) => {
                setLotes(res.data);
            })
            .catch((err) => { });
    }, [refresh]);

    const handleChange = (selected) => {
        setTipoExamen(selected);
    };

    const options = tiposExamenes?.map(option => ({
        value: option?.id,
        label: option?.name + option?.description
    }));

    const handleFechaInicio = (e) => {
        setFechaInicio(e.target.value)
    }
    const handleFechaFin = (e) => {
        setFechaFin(e.target.value)
    }

    const toggle = () => {
        setActualizacion(false);
        reset(defaulValuesForm);
        setModal(!modal);
    };

    const toggleActualizacion = () => {
        setModal(!modal);
    };
    const crearExamen = (data) => {
        bdLaboratorio
            .post(URL, data, getAuthHeaders())
            .then((res) => {
                reset(defaulValuesForm);
                toggle.call();
                setRefresh(!refresh);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Lote creado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {

                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Contacte con soporte",
                    showConfirmButton: false,
                });

            });
    };

    const actualizaExamen = (id, data) => {
        bdLaboratorio
            .put(`${URL}/${id}`, data, getAuthHeaders())
            .then((res) => {
                reset(defaulValuesForm);
                toggle.call();
                setRefresh(!refresh);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Usuario Actualizado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Contacte con soporte",
                    showConfirmButton: false,
                });
            });
    };

    const eliminarExamen = (id) => {
        return MySwal.fire({
            title: "¿Estás seguro de eliminar?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-danger ms-1",
            },
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                bdLaboratorio
                    .delete(`${URL}/${id}`, getAuthHeaders())
                    .then((res) => {
                        setRefresh(!refresh);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Tipo de examen Eliminado",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Contacte con soporte",
                            showConfirmButton: false,
                        });
                    });
            }
        });
    };

    const actualizarExamenId = (id) => {
        toggleActualizacion.call();
        setActualizacion(true);
        bdLaboratorio
            .get(`${URL}/${id}`, getAuthHeaders())
            .then((res) => {
                reset(res.data);
            })
            .catch((err) => null);
    };

    // Si es actualizacion llamara a actualizarPaciente pero si es false crear un Consultorio
    const submit = (data) => {
        if (actualizacion) {
            actualizaExamen(data.id, data);
        } else {
            crearExamen(data);
        }
    };

    return (
        <>
            <Row>
                <Col sm="6">
                    <Label>
                        Fecha Inicio
                    </Label>
                    <Input
                        type="date"
                        onChange={handleFechaInicio}
                    />
                    <Label>
                        Fecha Fin
                    </Label>
                    <Input
                        type="date"
                        onChange={handleFechaFin}
                    />

                </Col>
                <Col sm="6">
                    <Label>
                        Tipo de Examen
                    </Label>
                    <Select
                        id="tipoExamen"
                        value={tipoExamen}
                        onChange={handleChange}
                        options={options}
                        isSearchable={true}
                        placeholder="No especifica"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="12" md="12" lg="6">
                    <Row>
                        <Col sm="6">
                            <Label className="me-1" for="search-input">
                                Buscar
                            </Label>
                            <Input
                                className="dataTable-filter"
                                type="text"
                                bsSize="sm"
                                id="search-input"
                                placeholder="Buscar lote"
                                onChange={handleFilter}
                            />
                        </Col>
                        <Col sm="6" className='mt-2'>
                            <Button onClick={toggle} color="primary">
                                + Agregar
                            </Button>
                        </Col>

                    </Row>

                    <TablaExamen
                        data={data?.data}
                        filter={filter}
                        search={search}
                        eliminarExamen={eliminarExamen}
                        actualizarExamenId={actualizarExamenId}
                    />
                </Col>
                <Col sm="12" md="12" lg="6">               
                    <Resultado
                        data={data}
                    />
                </Col>
            </Row >
            <Row>
                {
                    tipoExamen && fechaFin && fechaInicio ? (
                        <Graficos 
                        data={data}
                        tipoExamen={tipoExamen}
                        fechaFin={fechaFin}
                        fechaInicio={fechaInicio}
                        refresh={refresh}
                    />
                    ) : null
                }
              
            </Row>
            <FormExamen
                modal={modal}
                toggle={toggle}
                handleSubmit={handleSubmit}
                submit={submit}
                register={register}
                errors={errors}
                tiposExamenes={tiposExamenes}
                lotes={lotes}
            />

        </>
    )
}

export default Examen