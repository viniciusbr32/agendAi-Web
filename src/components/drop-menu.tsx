import { ArrowBigDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type DropMenuProps = {
	open: boolean;
	handleOpen: () => void;
};

export function DropMenu({ open, handleOpen }: DropMenuProps) {
	return (
		<DropdownMenu open={open} onOpenChange={handleOpen}>
			<DropdownMenuTrigger className="flex items-center gap-2 text-white outline-none">
				Luiz Vinicius
				<ArrowBigDown />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
