import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

type modalProps = {
	open: boolean;
	onOpenChange: () => void;
	onDelete: () => void;
};

export function ModalDelete({ open, onOpenChange, onDelete }: modalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirmar Exclusão </DialogTitle>
					<DialogDescription>
						Tem certeza que deseja excluir este item? Esta ação não pode ser
						desfeita.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center justify-end gap-3">
					<Button type="button" variant="outline" onClick={onOpenChange}>
						Cancelar
					</Button>
					<Button type="button" variant="destructive" onClick={onDelete}>
						Deletar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
