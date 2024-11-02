import { Edit, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "./ui/table";

import { formatarData } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import type { Appointment } from "@/types/dataType";

export function TableData({
	user,
	booking_date,
	booking_hour,
	price,
	doctor,
	service,
	id_appointment,
}: Appointment) {
	return (
		<TableRow key={id_appointment}>
			<TableCell className="text-lg text-center ">{user}</TableCell>
			<TableCell className="text-lg text-center ">{doctor}</TableCell>
			<TableCell className="text-lg text-center ">{service}</TableCell>
			<TableCell className="text-lg text-center ">
				{formatarData(booking_date, booking_hour)}
			</TableCell>

			<TableCell className="text-lg text-center ">
				{formatPrice(price)}
			</TableCell>
			<TableCell className="text-lg">
				<div className="flex items-center justify-center gap-2">
					<button type="button" className="p-3 text-white bg-red-600 rounded">
						<Trash2 />
					</button>
					<button
						type="button"
						className="p-3 text-white rounded bg-blueCustom"
					>
						<Edit />
					</button>
				</div>
			</TableCell>
		</TableRow>
	);
}
