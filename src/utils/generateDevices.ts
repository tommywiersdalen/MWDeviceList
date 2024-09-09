
import { faker } from '@faker-js/faker';
import { Device } from '../Interfaces/device';

export function generateDevices() {
    const devices = [] as Device[];
    for (let i = 0; i < 200; i++) {
        devices.push({
            id: faker.string.alphanumeric(16),
            name: `Device ${i}`,
            lastConnection: faker.date.recent().toLocaleDateString(),
            status: Math.random() > 0.5 ? 'Active' : 'Inactive',
        });
    }
    return devices;
}