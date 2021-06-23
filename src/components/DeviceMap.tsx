import React from 'react'
import { Map, Marker } from 'react-bmap'
import { getAllDevice } from '../api/device';
import { Device } from '../types/device';

interface Props {

}

export const DeviceMap: React.FC<Props> = () => {
    const [devices, setDevices] = React.useState<Device[]>([])
    React.useEffect(() => {
        getAllDevice()
            .then(setDevices)
            .catch(console.log)

        const i = setInterval(() => {
            getAllDevice()
                .then(setDevices)
                .catch(console.log)
        }, 5000)
        return () => { clearInterval(i) }
    }, [])


    return (
        <div style={{  marginBottom: '-100%', paddingBottom: '100%' }}>
            <Map center={{ lng: 120.120687, lat: 30.262883 }} zoom="11" enableScrollWheelZoom={true}>
                {devices.map(device => {
                    return (
                        <Marker position={{ lng: device.lng, lat: device.lat }} key={device.clientId} />
                    )
                })}
            </Map>
        </div>
    );
}