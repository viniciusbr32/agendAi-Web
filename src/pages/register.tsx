import { useState } from "react";
import { AgendeiLogo } from "../components/agendei-logo";
import type { Field, FormData } from "../types/form";
import { Input } from "../components/ui/input";

export function Register() {
	const [formData, setFormData] = useState<FormData>({
		password: "",
		confirmPassword: "",
		passwordVisible: false,
		confirmPasswordVisible: false,
	});

	const toggleVisibility = (field: Field) => {
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

	return (
		<div className="grid w-full grid-cols-12 px-3 lg:px-0">
			<div className="flex flex-col items-center justify-center h-screen col-span-12 lg:h-auto lg:col-span-5">
				<div className="flex flex-col items-center max-w-sm">
					<div className="mb-11">
						<AgendeiLogo />
					</div>
					<p className="text-2xl font-semibold text-center">
						Crie sua conta agora mesmo.
					</p>

					<form className="flex flex-col items-center w-full mt-32">
						<h4 className="mb-6 text-2xl font-semibold text-center">
							Preencha os campos abaixo
						</h4>
						<div className="w-full">
							<input
								type="nome"
								placeholder="Nome"
								name="nome"
								className="w-full py-3 pl-3 mb-3 rounded border border-[#DFDFDF]"
							/>
							<input
								type="email"
								name="email"
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

							<Input
								type="password"
								onChange={handleChange}
								name="password"
								value={formData.confirmPassword}
								placeholder="Senha"
								showToggleIcon={true}
								isVisible={formData.confirmPasswordVisible}
								toggleVisibility={() =>
									toggleVisibility({ field: "confirmPasswordVisible" })
								}
							/>
						</div>
						<button
							type="submit"
							className="w-full py-3 text-white rounded bg-blueCustom"
						>
							Acessar
						</button>
					</form>

					<div className="w-full mt-40">
						<p className="text-center">
							Não tenho conta.{" "}
							<span className="cursor-pointer text-blueCustom">
								Criar conta agora.
							</span>
						</p>
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
