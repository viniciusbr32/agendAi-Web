import { Header } from "@/components/ui/header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { horarios } from "@/constants/horariosAgendamentos";
import { AuthContext } from "@/contexts/users/auth";

import api from "@/services/api";
import type { Doctor, DoctorService, Users } from "@/types/dataType";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateAppointment() {
	const [doctors, setDoctors] = useState<Doctor[] | null>(null);
	const [services, setServices] = useState<DoctorService[] | null>(null);
	const [users, setUsers] = useState<Users[] | null>(null);

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		id_user: "",
		id_doctor: "",
		id_service: "",
		booking_date: "",
		booking_hour: "",
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const { user } = useContext(AuthContext);
	const token = user?.token;

	const getUsers = async () => {
		if (!token) return;
		try {
			const response = await api("/admin/users", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUsers(response.data);
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

	const getDoctorsService = async () => {
		if (!token) return;
		try {
			const response = await api.get(
				`/doctors/${formData.id_doctor}/services`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			setServices(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getDoctorsService();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formData.id_doctor]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getDoctors();
		getDoctorsService();
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const createAppointment = async () => {
		if (!token) return;
		if (
			!formData.booking_date ||
			!formData.booking_hour ||
			!formData.id_doctor ||
			!formData.id_service ||
			!formData.id_user
		) {
			return toast.error("Preencha todos os dados", {
				autoClose: 1000,
			});
		}

		try {
			await api.post(
				"admin/appointments",
				{
					id_user: formData.id_user,
					id_doctor: formData.id_doctor,
					id_service: formData.id_service,
					booking_date: formData.booking_date,
					booking_hour: formData.booking_hour,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			toast.success("Consulta criada com sucesso", {
				autoClose: 1000,
			});

			// setTimeout(() => {
			// 	// navigate("/");
			// }, 2000);
		} catch (error) {
			toast.error(
				`erro ao tentar atualizar, tente novamente mais tarde ${error}`,
			);
		}
	};

	console.log(formData.id_user);

	return (
		<div className="">
			<Header />

			<div className="flex flex-col items-center justify-center w-full h-full max-w-xl py-20 mx-auto">
				<h2 className="text-3xl font-bold">Agendar Consulta</h2>

				<form className="w-full space-y-5">
					<div className="flex flex-col w-full gap-2">
						<label htmlFor="users" className="text-lg">
							Paciente
						</label>
						<select
							value={formData.id_user}
							name="id_user"
							onChange={handleChange}
							id="users"
							className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none"
						>
							<option value={0}>Todos os Médicos</option>
							{users?.map((user) => (
								<option key={user.name} value={user.id_user}>
									{user.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col w-full gap-2">
						<label htmlFor="selectDoctor">Médico</label>
						<select
							value={formData.id_doctor}
							name="id_doctor"
							onChange={handleChange}
							id="selectDoctor"
							className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none"
						>
							<option value={0}>Todos os Médicos</option>
							{doctors?.map((doctor) => (
								<option key={doctor.id_doctor} value={doctor.id_doctor}>
									{doctor.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="selectService">Serviço</label>
						<select
							name="id_service"
							onChange={handleChange}
							value={formData.id_service}
							id="selectService"
							className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none"
						>
							<option value="" disabled>
								Todos os serviços
							</option>
							{services?.map((service) => (
								<option key={service.id_service} value={service.id_service}>
									{service.description}
								</option>
							))}
						</select>
					</div>

					<div className="flex items-center gap-5 w">
						<div className="w-full">
							<label htmlFor="selectDate">Data</label>
							<input
								id="selectDate"
								name="booking_date"
								onChange={handleChange}
								value={formData.booking_date}
								type="date"
								className="w-full p-2 transition-all border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						<div className="w-full">
							<label htmlFor="selectDate">Horario</label>
							<select
								name="booking_hour"
								onChange={handleChange}
								id="selectDate"
								className="w-full p-2 transition-all border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="0">hora</option>

								{horarios.map((hour) => (
									<option key={hour} value={hour}>
										{hour}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex items-center justify-end w-full gap-2">
						<button
							onClick={() => navigate("/")}
							type="button"
							className="px-6 py-2 font-semibold rounded text-blueCustom outline outline-1 outline-blueCustom"
						>
							Cancelar
						</button>

						<button
							type="button"
							onClick={createAppointment}
							className="px-6 py-2 font-semibold text-white rounded bg-blueCustom "
						>
							Criar consulta
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
