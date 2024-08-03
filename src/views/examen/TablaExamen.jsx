import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Badge, Card } from 'reactstrap'


const TablaExamen = ({
  data, filter, search, actualizarExamenId, eliminarExamen
}) => {
  const columns = [
    {
      sortable: true,
      name: 'ID',
      minWidth: '25px',
      maxWidth: '80px',
      selector: row => row?.id
    },
    {
      sortable: true,
      name: 'Fecha',
      minWidth: '25px',
      selector: row => row?.date
    },
    {
      sortable: true,
      name: 'Medición',
      minWidth: '50px',
      selector: row => row?.medition
    },

    {
      name: 'Acciones',
      minWidth: '50px',
      selector: row => {
        return (
          <>
            <Edit
              className='me-2'
              size={20}
              onClick={() => actualizarExamenId(row.id)}
            />
            <Trash
              size={20}
              onClick={() => eliminarExamen(row.id)}
            />
          </>
        )
      }
    }
  ]
  return (
    <Card className='mt-2'>
      <DataTable
        noHeader
        pagination
        className='react-datatable'
        columns={columns}
        data={search ? filter : data}

      />
    </Card>
  )
}

export default TablaExamen