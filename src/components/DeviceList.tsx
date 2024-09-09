import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Pagination from "./Pagination";
import { filterByStatus } from "../features/devices/devicesSlice";

import { DeviceTable } from "./DeviceTable";

export function DeviceList() {
	const devices = useAppSelector((state) => state.devices.devices);
	const [currentPage, setCurrentPage] = useState(1);
	const [devicesPerPage] = useState(10);

	const indexOfLastDevice = currentPage * devicesPerPage;
	const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
	const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);

	const paginateFront = () => setCurrentPage(currentPage + 1);
	const paginateBack = () => setCurrentPage(currentPage - 1);

	const getAllActiveDevices = () => {
		return devices.filter((device) => device.status === "Active");
	};
	const getAllInactiveDevices = () => {
		return devices.filter((device) => device.status === "Inactive");
	};
	const getActiveDevices = () => {
		return currentDevices.filter((device) => device.status === "Active");
	};
	const getInactiveDevices = () => {
		return currentDevices.filter((device) => device.status === "Inactive");
	};

	const dispatch = useAppDispatch();

	return (
		<div>
			<div className="flex flex-col">
				<div className="flex justify-center">
					<div>
						<h1 className="text-2xl font-bold">Devices</h1>
						<p className="text-sm text-gray-700">
							Active Total Devices: {getAllActiveDevices().length}
						</p>
						<p className="text-sm text-gray-700">
							Inactive Total Devices: {getAllInactiveDevices().length}
						</p>
						<p className="text-sm text-gray-700">
							Active Current Page: {getActiveDevices().length}
						</p>
						<p className="text-sm text-gray-700">
							Inactive Curremt Devices: {getInactiveDevices().length}
						</p>
					</div>
				</div>
			</div>
			<div className="flex justify-end pr-72">
				<select
					className="border border-gray-300 rounded-md"
					onChange={(e) => dispatch(filterByStatus(e.target.value))}>
					<option value="All">All</option>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
			</div>
			<DeviceTable devices={currentDevices} />
			<Pagination
				devicesPerPage={devicesPerPage}
				totalDevices={devices.length}
				paginateBack={paginateBack}
				paginateFront={paginateFront}
				currentPage={currentPage}
			/>
		</div>
	);
}
