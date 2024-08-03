import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const FormExamen = ({
  modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors,
  lotes, tiposExamenes
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
      <ModalHeader>
        Registrar Examen
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group my-2'>
            <label htmlFor="">
              Fecha
            </label>
            <input
              className="form-control"
              type="date"
              {...register('date')}
            />
          </div>

          <div className='form-group my-2'>
            <label htmlFor="">
              Medición
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='Ingrese el número de medición'
              {...register('medition')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="examtype_id">Tipo de Examen</label>
            <select className="form-select" id="examtype_id" {...register("examtype_id")}>
              {
                tiposExamenes?.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.name} </option>
                ))
              }
            </select>
          </div>
          <div className='form-group my-2'>
            <label htmlFor="examtype_id">Lote</label>
            <select className="form-select" id="examtype_id" {...register("lot_id")}>
              {
                lotes?.map(lote => (
                  <option key={lote.id} value={lote.id}>{lote.name} </option>
                ))
              }
            </select>
          </div>
          <button className='btn btn-primary mb-2'>Enviar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default FormExamen