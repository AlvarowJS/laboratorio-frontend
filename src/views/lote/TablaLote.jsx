import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Badge, Card } from 'reactstrap'

const TablaLote = ({
  data, filter, search, actualizarLoteId, eliminarLote
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
      name: 'Nombre',
      minWidth: '25px',
      selector: row => row?.name
    },
    {
      sortable: true,
      name: 'Descripción',
      minWidth: '50px',
      selector: row => row?.description,
      cell: row => {
        return (
          <Card>
            <p>
              {row?.description}
            </p>
          </Card>
        )
      }
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
              onClick={() => actualizarLoteId(row.id)}
            />
            <Trash
              size={20}
              onClick={() => eliminarLote(row.id)}
            />
          </>
        )
      }
    }
  ]
  return (
    <div>
      <Card className='mt-2'>
        <DataTable
          noHeader
          pagination
          className='react-datatable'
          columns={columns}
          data={search ? filter : data}

        />
      </Card>
    </div>
  )
}

export default TablaLote