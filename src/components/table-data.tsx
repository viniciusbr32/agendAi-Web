import { Edit, Trash2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

import { formatarData } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import api from "@/services/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/users/auth";
import type { Appointment } from "@/types/dataType";

export function TableData() {
	const [dataAppointments, setDataAppointments] = useState<
		Appointment[] | null
	>(null);

	const { user } = useContext(AuthContext);
	const token = user?.token;

	useEffect(() => {
		const getAppointments = async () => {
			try {
				const response = await api("/admin/appointments", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setDataAppointments(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getAppointments();
	}, [token]);

	return (
		<Table className="pb-10">
			<TableHeader>
				<TableRow>
					<TableHead className="text-lg font-semibold text-center text-black">
						Paciente
					</TableHead>
					<TableHead className="text-lg font-semibold text-center text-black ">
						Médico
					</TableHead>
					<TableHead className="text-lg font-semibold text-center text-black ">
						Serviço
					</TableHead>
					<TableHead className="text-lg font-semibold text-center text-black ">
						Data / Hora
					</TableHead>
					<TableHead className="text-lg font-semibold text-center text-black ">
						Valor
					</TableHead>
					<TableHead className="text-lg font-semibold text-center text-black ">
						Açoes
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{dataAppointments?.map((consulta) => (
					<TableRow key={consulta.id_appointment}>
						<TableCell className="text-lg text-center ">
							{consulta.user}
						</TableCell>
						<TableCell className="text-lg text-center ">
							{consulta.doctor}
						</TableCell>
						<TableCell className="text-lg text-center ">
							{consulta.service}
						</TableCell>
						<TableCell className="text-lg text-center ">
							{formatarData(consulta.booking_date, consulta.booking_hour)}
						</TableCell>
						<TableCell className="text-lg text-center ">
							{formatPrice(consulta.price)}
						</TableCell>
						<TableCell className="text-lg">
							<div className="flex items-center justify-center gap-2">
								<button
									type="button"
									className="p-3 text-white bg-red-600 rounded"
								>
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
				))}
			</TableBody>
		</Table>
	);
}
