import React from 'react'
import { Card, Col, Row } from 'reactstrap'

const Resultado = ({
    data
}) => {
    console.log(data, "repte mucho?")
    return (

        <Card>
            <Row className="p-2">
                <h1>Calculos</h1>
                <Col sm="5">
                    <p>Media</p><hr />
                    <p>Desviación Estandar</p><hr />
                    <p>Coeficiente de Variación</p><hr />
                    <p>3sd</p><hr />
                    <p>2sd</p><hr />
                    <p>1sd</p><hr />
                    <p>1sd</p><hr />
                    <p>2sd</p><hr />
                    <p>3sd</p>
                </Col>
                <Col sm="2">
                    <p>: </p><hr />
                    <p>: </p><hr />
                    <p>: </p><hr />
                    <p>: </p><hr />
                    <p>: </p><hr />
                    <p>: </p><hr />
                    <p>: </p><hr />
                    <p>: </p><hr />
                    <p>: </p><hr />

                </Col>
                <Col sm="5">
                    {
                        data ? (
                            <>
                                <p>{data?.media}</p><hr />
                                <p>{data?.ds}</p><hr />
                                <p>{data?.cv}</p><hr />
                                <p>{data?.sd3}</p><hr />
                                <p>{data?.sd2}</p><hr />
                                <p>{data?.sd1}</p><hr />
                                <p>{data?.sdless1}</p><hr />
                                <p>{data?.sdless2}</p><hr />
                                <p>{data?.sdless3}</p>
                            </>
                        ) : null
                    }

                </Col>
            </Row>

        </Card>
    )
}

export default Resultado