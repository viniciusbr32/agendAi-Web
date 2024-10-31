import { ArrowBigDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/contexts/users/auth";

type DropMenuProps = {
	open: boolean;
	handleOpen: () => void;
	handleLogout: () => void;
};

export function DropMenu({ open, handleOpen, handleLogout }: DropMenuProps) {
	const { user } = useContext(AuthContext);

	return (
		<DropdownMenu open={open} onOpenChange={handleOpen}>
			<DropdownMenuTrigger className="flex items-center gap-2 text-white outline-none">
				{user?.name}
				<ArrowBigDown />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
