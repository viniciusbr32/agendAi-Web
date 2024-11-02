import { Header } from "../components/ui/header";
import { TableData } from "@/components/table-data";
import api from "@/services/api";
import { useContext, useEffect, useState } from "react";
import type { Appointment, Doctor } from "@/types/dataType";
import { AuthContext } from "@/contexts/users/auth";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function Home() {
	const [doctors, setDoctors] = useState<Doctor[] | null>(null);
	const [dataAppointments, setDataAppointments] = useState<
		Appointment[] | null
	>(null);

	const [idDoctor, setIdDoctor] = useState("");
	const [dtStart, setDtStart] = useState("");
	const [dtEnd, setDtEnd] = useState("");

	const { user } = useContext(AuthContext);
	const token = user?.token;

	const getAppointments = async () => {
		if (!token) return;
		try {
			const response = await api("/admin/appointments", {
				params: {
					id_doctor: idDoctor,
					dt_start: dtStart,
					dt_end: dtEnd,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setDataAppointments(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getDoctors = async () => {
		if (!token) return;
		try {
			const response = await api.get("/doctors", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setDoctors(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getDoctors();
		getAppointments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		<div className="">
			<Header />
			<div className="w-full px-9">
				<div className="flex items-center justify-between border-b border-[#E1E1E1] py-10">
					<div className="flex items-center gap-7">
						<p className="text-2xl font-bold">Agendamentos</p>
						<button
							type="button"
							className="px-3 py-3 rounded text-blueCustom outline outline-2"
						>
							Novo Agendamento
						</button>
					</div>

					<div className="flex items-center justify-center space-x-7">
						<div className="flex items-center gap-2 ">
							<input
								value={dtStart}
								onChange={(e) => setDtStart(e.target.value)}
								type="date"
								className="p-4 transition-all border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							<span>Até</span>
							<input
								value={dtEnd}
								onChange={(e) => setDtEnd(e.target.value)}
								type="date"
								className="p-4 transition-all border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						<div className="flex items-center gap-5">
							<select
								onChange={(e) => setIdDoctor(e.target.value)}
								value={idDoctor}
								className="p-4 bg-white border border-gray-300 rounded focus:outline-none"
							>
								<option value="">Todos os médicos</option>
								{doctors?.map((doctor) => (
									<option key={doctor.id_doctor} value={doctor.id_doctor}>
										{doctor.name}
									</option>
								))}
							</select>
							<button
								type="button"
								onClick={getAppointments}
								className="px-6 py-4 font-semibold text-white rounded bg-blueCustom"
							>
								Filtrar
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full px-9">
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
						{dataAppointments?.map((appointment) => (
							<TableData
								key={appointment.id_appointment}
								user={appointment.user}
								doctor={appointment.doctor}
								service={appointment.service}
								booking_date={appointment.booking_date}
								booking_hour={appointment.booking_hour}
								price={appointment.price}
								id_appointment={appointment.id_appointment}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
