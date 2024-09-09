import { useAppSelector } from "./app/hooks";
import { DeviceList } from "./components/DeviceList";
import { IntititalizeDB } from "./components/IntititalizeDB";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	const devices = useAppSelector((state) => state.devices.devices);

	return (
		<>
			{devices && devices.length > 0 ? <DeviceList /> : <IntititalizeDB />}
			<ToastContainer />
		</>
	);
}

export default App;
