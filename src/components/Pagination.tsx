interface PaginationProps {
	devicesPerPage: number;
	totalDevices: number;
	paginateFront: () => void;
	paginateBack: () => void;
	currentPage: number;
}

export default function Pagination({
	devicesPerPage,
	totalDevices,
	paginateFront,
	paginateBack,
	currentPage,
}: PaginationProps) {
	return (
		<div className="py-2 flex justify-around">
			<div>
				<p className="text-sm text-gray-700">
					Showing <b>{currentPage}</b> of{" "}
					<b>{Math.ceil(totalDevices / devicesPerPage)}</b>
				</p>
			</div>
			<nav className="block"></nav>
			<div>
				<nav
					className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
					aria-label="Pagination">
					<a
						onClick={() => {
							paginateBack();
						}}
						href="#"
						className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
						<span>Previous</span>
					</a>

					<a
						onClick={() => {
							paginateFront();
						}}
						href="#"
						className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
						<span>Next</span>
					</a>
				</nav>
			</div>
		</div>
	);
}
