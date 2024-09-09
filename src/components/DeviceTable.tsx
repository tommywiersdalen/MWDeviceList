import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { updateDevice, removeDevice } from "../features/devices/devicesSlice";
import { Device } from "../Interfaces/device";
import { toast } from "react-toastify";

interface DeviceTableProps {
	devices: Device[];
}

export function DeviceTable({ devices }: DeviceTableProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editRow, setEditRow] = useState<Device | null>(null);

	const dispatch = useAppDispatch();

	const handleEdit = (id: string) => {
		const device = devices.find((device) => device.id === id);
		if (device && id === device.id) {
			setEditRow(device);
		}
		setIsEditing(!isEditing);
	};

	const handleUpdate = (device: Device) => {
		toast.success("Device updated successfully");
		dispatch(updateDevice(device));
		setEditRow(null);
		setIsEditing(!isEditing);
	};

	const handleDelete = (id: string) => {
		toast.success("Device deleted successfully");
		dispatch(removeDevice(id));
	};
	return (
		<div className="flex justify-center">
			<table className="table-auto">
				<thead>
					<tr>
						<th className="px-4 py-2">Serial</th>
						<th className="px-4 py-2">Name</th>
						<th className="px-4 py-2">Last connected</th>
						<th className="px-4 py-2">Status</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{devices.map((device) => (
						<tr key={device.id}>
							<td className="border px-4 py-2">{device.id}</td>
							<td className="border px-4 py-2">
								{isEditing && editRow?.id === device.id ? (
									<input
										type="text"
										value={editRow.name}
										onChange={(e) =>
											setEditRow({ ...editRow, name: e.target.value })
										}
									/>
								) : (
									device.name
								)}
							</td>
							<td className="border px-4 py-2">{device.lastConnection}</td>
							<td className="border px-4 py-2">
								{isEditing && editRow?.id === device.id ? (
									<select
										value={editRow.status}
										onChange={(e) =>
											setEditRow({ ...editRow, status: e.target.value })
										}>
										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
									</select>
								) : (
									device.status
								)}
							</td>

							<td className="border px-4 py-2 space-x-4">
								{isEditing && editRow?.id === device.id ? (
									<button
										className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
										onClick={() => handleUpdate(editRow)}>
										Save
									</button>
								) : (
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
										onClick={() => handleEdit(device.id)}>
										Edit
									</button>
								)}

								<button
									className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
									onClick={() => handleDelete(device.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
