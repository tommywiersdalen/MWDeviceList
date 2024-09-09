import { useDispatch } from "react-redux";
import { generateDevices } from "../utils/generateDevices";
import { getDevicesFromLocalStorage } from "../features/devices/devicesSlice";
import { toast } from "react-toastify";
export function IntititalizeDB() {
	const dispatch = useDispatch();
	const initDB = () => {
		try {
			if (localStorage.length > 0) {
				console.log("Database already initialized");
				dispatch(getDevicesFromLocalStorage());
			} else {
				console.log("Initializing database");
				const devices = generateDevices();
				localStorage.setItem("devices", JSON.stringify(devices));
				dispatch(getDevicesFromLocalStorage());
			}
			toast.success("Database initialized successfully");
		} catch (error) {
			console.error(error);
			toast.error("Error initializing database");
		}
	};

	return (
		<>
			<h1 className="text-2xl font-bold text-center mt-10">
				Database not initialized
			</h1>
			<div className="flex justify-center mt-10">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={initDB}>
					Initialize Database
				</button>
			</div>
		</>
	);
}
