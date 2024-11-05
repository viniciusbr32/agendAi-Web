import { Edit, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "./ui/table";

import { formatarData } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import type { Appointment } from "@/types/dataType";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "./modal-delete";
import { useContext, useState } from "react";
import api from "@/services/api";
import { AuthContext } from "@/contexts/users/auth";
import { toast } from "react-toastify";

type TableDataProps = Appointment & {
	onRefresh: () => void;
};

export function TableData({
	user,
	booking_date,
	booking_hour,
	price,
	doctor,
	service,
	id_appointment,
	onRefresh,
}: TableDataProps) {
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const { user: users } = useContext(AuthContext);
	const token = users?.token;

	const closeModal = () => setOpen(false);
	const openModal = (id: number) => {
		setSelectedId(id);
		setOpen(true);
	};

	const DeleteAppointment = async () => {
		try {
			await api.delete(`/appointments/${selectedId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setOpen(false);
			onRefresh();
			toast.success("Agendamento deletado com sucesso", {
				autoClose: 1000,
			});
		} catch (error) {
			console.log(error);
		}
	};

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
					<button
						type="button"
						className="p-3 text-white bg-red-600 rounded"
						onClick={() => openModal(id_appointment)}
					>
						<Trash2 />
					</button>
					<button
						type="button"
						onClick={() => navigate(`edit/appointment/${id_appointment}`)}
						className="p-3 text-white rounded bg-blueCustom"
					>
						<Edit />
					</button>
				</div>
			</TableCell>
			<ModalDelete
				open={open}
				onDelete={DeleteAppointment}
				onOpenChange={closeModal}
			/>
		</TableRow>
	);
}
