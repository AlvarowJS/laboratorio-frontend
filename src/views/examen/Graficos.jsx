import React, { useEffect, useState } from 'react'
import { Card } from 'reactstrap'
import Chart from 'react-apexcharts'
const Graficos = ({
    data, tipoExamen, fechaInicio, fechaFin, refresh
}) => {

    const [datos, setDatos] = useState([])
    const [media, setMedia] = useState([])
    const [sd1, setSd1] = useState([])
    const [sdless1, setSdless1] = useState([])
    const [order, setOrder] = useState([])
    useEffect(() => {
        const mediciones = data?.data?.map(item => item?.medition) || []
        const count = mediciones?.length
        const media = data?.media || 0;
        const mediaArray = Array(count).fill(media);
        const ds = data?.ds || 0;
        const dsArray = Array(count).fill(ds);
        const cv = data?.cv || 0;
        const cvArray = Array(count).fill(cv);
        const sd1 = data?.sd1 || 0;
        const sd1Array = Array(count).fill(sd1);
        const sd2 = data?.sd2 || 0;
        const sd2Array = Array(count).fill(sd2);
        const sd3 = data?.sd3 || 0;
        const sd3Array = Array(count).fill(sd3);
        const sdless1 = data?.sdless1 || 0;
        const sdless1Array = Array(count).fill(sdless1);
        const sdless2 = data?.sdless2 || 0;
        const sdless2Array = Array(count).fill(sdless2);
        const sdless3 = data?.sdless3 || 0;
        const sdless3Array = Array(count).fill(sdless3);
        const orderArray = Array.from({ length: count }, (_, i) => i + 1);

        setOrder(orderArray)
        setMedia(mediaArray)
        setSd1(sd1Array)
        setSdless1(sdless1Array)
        setDatos(mediciones)       

    }, [data, refresh])

    const options = {
        chart: {
            zoom: {
                enabled: false
            },
            parentHeightOffset: 0,
            toolbar: {
                show: false
            }
        },

        markers: {
            strokeWidth: 7,
            strokeOpacity: 1,
            strokeColors: ['#FFAD62','#00E396', '#FFE019', '#FF4560'],          
            colors: ['#FFAD62']
            
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        colors: ['#FFAD62', '#00E396', '#FFE019', '#FF4560'],
        grid: {
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        tooltip: {
            shared: false,
            custom(data) {
                return `<div class='px-1 py-50'>
                  <span>${data?.series[data?.seriesIndex][data?.dataPointIndex]}</span>
                </div>`
            }
        },
        xaxis: {
            categories: order
        },
        yaxis: {
            opposite: false,
            labels: {
                formatter: function (val) {
                    return Math.round(val)
                }
            }
        }
    }

    // ** Chart Series
    const series = [
        {
            name: 'Examenes',
            data: datos,
        },
        {
            name: 'Media Real',
            data: media
        },
        {
            name: '+1 SD',
            data: sd1
        },
        {
            name: '-1 SD',
            data: sdless1
        }
    ]
    return (
        <>
            <Card>
                <h1>
                    Graficos
                </h1>
                <Chart options={options} series={series} type='line' height={400} />
            </Card>
        </>
    )
}

export default Graficos