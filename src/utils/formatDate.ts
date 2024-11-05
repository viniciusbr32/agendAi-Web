export const formatarData = (data: string, hora: string) => {
	if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(data)) {
		throw new Error("Data inválida");
	}

	const [ano, mes, dia] = data.split("-").map(Number);

	const diaFormatado = String(dia).padStart(2, "0");
	const mesFormatado = String(mes).padStart(2, "0");

	const dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}T${hora}`;

	const formato = new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
	});

	return formato.format(new Date(dataFormatada));
};
