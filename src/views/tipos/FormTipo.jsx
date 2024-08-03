import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const FormTipo = ({
  modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
      <ModalHeader>
        Registrar Tipo de examen
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
              placeholder='ingrese el nombre del Tipo de examen'
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
              placeholder='Ingrese una descripción del tipo de examen'
              {...register('description')}
            />
          </div>
          <button className='btn btn-primary mb-2'>Enviar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default FormTipo