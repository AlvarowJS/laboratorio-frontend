import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import bdLaboratorio from "../../api/bdLaboratorio";
import TablaLote from "./TablaLote";
import FormLote from "./FormLote";
const MySwal = withReactContent(Swal);
const URL = "/v1/lot";
const Lote = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();
  const [modal, setModal] = useState(false);
  const [modalUbicacion, setModalUbicacion] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [refresh, setRefresh] = useState(false);
  const defaulValuesForm = {
    name: "",
    description: "",
  };
  const getAuthHeaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const toggle = () => {
    setActualizacion(false);
    reset(defaulValuesForm);
    setModal(!modal);
  };

  const toggleActualizacion = () => {
    setModal(!modal);
  };

  useEffect(() => {
    bdLaboratorio
      .get(`${URL}`, getAuthHeaders())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => { });
  }, [refresh]);

  useEffect(() => {
    setFilter(
      data?.filter(
        (e) =>
          e.name.toLowerCase()
            .indexOf(search?.toLowerCase()) !== -1
      )
    );
  }, [search]);

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  // Crear Lote
  const crearLote = (data) => {
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

  // Actualiza Lote (PUT)
  const actualizarLote = (id, data) => {
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

  const eliminarLote = (id) => {
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
              title: "Lote Eliminado",
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
  // Tomara los datos que tiene un registro
  const actualizarLoteId = (id) => {
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
      actualizarLote(data.id, data);
    } else {
      crearLote(data);
    }
  };
  return (
    <>
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
        <Col sm="4"></Col>
        <Col sm="2">
          <Button onClick={toggle} color="primary">
            + Agregar
          </Button>
        </Col>
      </Row>
      <TablaLote
        data={data}
        filter={filter}
        search={search}
        eliminarLote={eliminarLote}
        actualizarLoteId={actualizarLoteId}
      />
      <FormLote
        modal={modal}
        toggle={toggle}
        handleSubmit={handleSubmit}
        submit={submit}
        register={register}
        errors={errors}
      />
    </>
  )
}

export default Lote