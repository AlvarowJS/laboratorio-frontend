import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const FormLote = ({
  modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
      <ModalHeader>
        Registrar Lote
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group my-2'>
            <label htmlFor="">
              Nombre
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese el nombre del lote'
              {...register('name')}
            />
          </div>

          <div className='form-group my-2'>
            <label htmlFor="">
              Descripción
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='Ingrese una descripción del lote'
              {...register('description')}
            />
          </div>
          <button className='btn btn-primary mb-2'>Enviar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default FormLote