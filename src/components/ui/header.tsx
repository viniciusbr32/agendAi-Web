import { useContext, useState } from "react";
import { AgendeiLogoWhite } from "../agendei-logo-white";
import { DropMenu } from "../drop-menu";
import { AuthContext } from "@/contexts/users/auth";
import { useNavigate } from "react-router-dom";

export function Header() {
	const [open, setOpen] = useState<boolean>(false);

	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
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
			<DropMenu
				open={open}
				handleOpen={handleOpen}
				handleLogout={handleLogout}
			/>
		</header>
	);
}
