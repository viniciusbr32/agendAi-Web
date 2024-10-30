import { useState } from "react";
import { AgendeiLogoWhite } from "../agendei-logo-white";
import { DropMenu } from "../drop-menu";

export function Header() {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<header className="flex items-center justify-between w-full h-16 px-5 bg-blueCustom">
			<div className="flex items-center gap-16 ">
				<div>
					<AgendeiLogoWhite />
				</div>
				<ul className="flex items-center gap-5 text-white">
					<li className="font-bold">Agendamentos</li>
					<li>Médicos</li>
				</ul>
			</div>
			<DropMenu open={open} handleOpen={handleOpen} />
		</header>
	);
}
