export const formatarData = (data: string, hora: string) => {
	const formato = new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	return `${formato.format(new Date(data))} ${hora}h`;
};
