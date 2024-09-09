import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Device } from '../../Interfaces/device'

export interface DevicesState {
    devices: Device[];
}

const initialState: DevicesState = {
    devices: [],
}

export const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        getDevicesFromLocalStorage: (state) => {
            const devices = localStorage.getItem('devices')
            try {
                if (devices) {
                    state.devices = JSON.parse(devices)
                }
            }
            catch (error) {
                console.log(error)
                throw new Error('Error getting devices from local storage')
            }

        },
        filterByStatus: (state, action) => {
            const status = action.payload
            const devices = localStorage.getItem('devices')
            try {
                if (devices) {
                    if (status === 'All') {
                        state.devices = JSON.parse(devices)
                        return
                    } else {
                        state.devices = JSON.parse(devices).filter((device: Device) => device.status === status)
                    }

                }
            }
            catch (error) {
                console.log(error)
                throw new Error('Error filtering devices by status')
            }

        },
        removeDevice: (state, action) => {
            const id = action.payload
            const devices = localStorage.getItem('devices')
            try {
                if (devices) {
                    const newDevices = JSON.parse(devices).filter((device: Device) => device.id !== id)
                    state.devices = newDevices
                    localStorage.setItem('devices', JSON.stringify(newDevices))
                }
            }
            catch (error) {
                console.log(error)
                throw new Error('Error removing device')
            }

        },
        updateDevice: (state, action) => {
            const updatedDevice = action.payload
            const devices = localStorage.getItem('devices')
            try {
                if (devices) {
                    const newDevices = JSON.parse(devices).map((device: Device) => {
                        try {
                            if (device.id === updatedDevice.id) {
                                return updatedDevice
                            }
                            return device
                        }
                        catch (error) {
                            console.log(error)
                            throw new Error('Error updating device')
                        }
                    })
                    state.devices = newDevices
                    localStorage.setItem('devices', JSON.stringify(newDevices))
                }

            }
            catch (error) {
                console.log(error)
                throw new Error('Error updating device')
            }

        }
    }
})

export const { getDevicesFromLocalStorage, filterByStatus, updateDevice, removeDevice } = devicesSlice.actions
export const selectCount = (state: RootState) => state.devices

export default devicesSlice.reducer