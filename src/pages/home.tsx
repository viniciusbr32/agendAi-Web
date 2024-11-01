import { Header } from "../components/ui/header";
import { TableData } from "@/components/table-data";
import api from "@/services/api";
import { useContext, useEffect, useState } from "react";
import type { Doctor } from "@/types/dataType";
import { AuthContext } from "@/contexts/users/auth";

export function Home() {
	const [doctors, setDoctors] = useState<Doctor[] | null>(null);
	const [selectValue, setSelectValue] = useState("");
	const [tempSelectValue, setTempSelectValue] = useState("");

	const { user } = useContext(AuthContext);
	const token = user?.token;

	useEffect(() => {
		const getDoctors = async () => {
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
		getDoctors();
	}, [token]);

	const handleFilterButtonClick = () => {
		setSelectValue(tempSelectValue); // Atualiza o valor final apenas quando o botão é clicado
	};

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
								type="date"
								className="p-4 transition-all border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							<span>Até</span>
							<input
								type="date"
								className="p-4 transition-all border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						<div className="flex items-center gap-5">
							<select
								value={tempSelectValue}
								onChange={(e) => setTempSelectValue(e.target.value)}
								className="p-4 bg-white border border-gray-300 rounded focus:outline-none"
							>
								<option value="">Filtre por todos ou selecione</option>
								{doctors?.map((doctor) => (
									<option key={doctor.id_doctor}>{doctor.name}</option>
								))}
							</select>
							<button
								type="button"
								onClick={handleFilterButtonClick}
								className="px-6 py-4 font-semibold text-white rounded bg-blueCustom"
							>
								Filtrar
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full px-9">
				<TableData selectValue={selectValue} />
			</div>
		</div>
	);
}
