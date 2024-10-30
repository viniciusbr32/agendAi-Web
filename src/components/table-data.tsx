import { Edit, Trash2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

export function TableData() {
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
				<TableRow>
					<TableCell className="text-lg text-center ">INV001</TableCell>
					<TableCell className="text-lg text-center ">Paid</TableCell>
					<TableCell className="text-lg text-center ">Credit Card</TableCell>
					<TableCell className="text-lg text-center ">
						29/05/2024 / 08:00
					</TableCell>
					<TableCell className="text-lg text-center ">$250.00</TableCell>
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
			</TableBody>
		</Table>
	);
}
