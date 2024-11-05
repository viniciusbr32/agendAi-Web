import { useContext, useState } from "react";
import { AgendeiLogo } from "../components/agendei-logo";
import type { FieldLogin, FormDataLogin } from "../types/form";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { AuthContext } from "@/contexts/users/auth";
import { AxiosError } from "axios";

interface ApiError {
	error: string;
}

export function Login() {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState<FormDataLogin>({
		email: "",
		password: "",
		passwordVisible: false,
	});

	const [error, setError] = useState<string | undefined>(undefined);

	const toggleVisibility = (field: FieldLogin) => {
		setFormData((prev) => ({
			...prev,
			[field.field]: !prev[field.field],
		}));
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!formData.email || !formData.password) {
			return null;
		}

		try {
			const response = await api.post("/admin/login", {
				email: formData.email,
				password: formData.password,
			});

			login(response.data);

			navigate("/");
		} catch (error) {
			// Verifica se o erro é um AxiosError e se contém a resposta esperada
			if (error instanceof AxiosError && error.response) {
				const axiosError = error as AxiosError<ApiError>;
				setError(axiosError.response?.data.error);
			}
		}
	};

	return (
		<div className="grid w-full grid-cols-12 px-3 lg:px-0">
			<div className="flex flex-col items-center justify-center h-screen col-span-12 lg:h-auto lg:col-span-5">
				<div className="flex flex-col items-center max-w-sm">
					<div className="mb-11">
						<AgendeiLogo />
					</div>
					<p className="text-2xl font-semibold text-center">
						Gerencie seus agendamentos de forma descomplicada.
					</p>

					<form
						onSubmit={handleSubmit}
						className="flex flex-col items-center w-full mt-32"
					>
						<h4 className="mb-6 text-2xl font-semibold text-center">
							Acesse Sua conta
						</h4>
						<div className="w-full">
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="E-mail"
								className="w-full py-3 pl-3 mb-3 rounded border border-[#DFDFDF]"
							/>
							<Input
								type="password"
								onChange={handleChange}
								name="password"
								value={formData.password}
								placeholder="Senha"
								showToggleIcon={true}
								isVisible={formData.passwordVisible}
								toggleVisibility={() =>
									toggleVisibility({ field: "passwordVisible" })
								}
							/>
						</div>
						{error !== "" && error !== undefined && (
							<p className="text-red-500">{error}</p>
						)}
						<button
							type="submit"
							className="w-full py-3 text-white rounded bg-blueCustom"
						>
							Acessar
						</button>
					</form>

					<div className="w-full mt-40">
						<Link to="/register">
							<p className="text-center">
								Não tenho conta.{" "}
								<span className="cursor-pointer text-blueCustom">
									Criar conta agora.
								</span>
							</p>
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden col-span-7 lg:block">
				<img
					src="src/assets/fundo.png"
					alt="imagem de fundo homem segurando celular"
					className="object-cover object-left w-full h-screen"
				/>
			</div>
		</div>
	);
}
