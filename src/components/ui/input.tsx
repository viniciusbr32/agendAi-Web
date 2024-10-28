import { Eye, EyeOff } from "lucide-react";

type InputProps = {
	type: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	name: string;
	showToggleIcon?: boolean;
	isVisible?: boolean;
	toggleVisibility?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
	type,
	value,
	onChange,
	placeholder,
	name,
	showToggleIcon,
	isVisible,
	toggleVisibility,
	...rest
}: InputProps) {
	return (
		<div className="relative">
			<input
				type={isVisible ? "text" : type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				name={name}
				className="w-full py-3 pl-3 mb-3 rounded border border-[#DFDFDF]"
				{...rest}
			/>
			{showToggleIcon && value.length > 0 && (
				<button
					type="button"
					className="absolute transform -translate-y-1/2 cursor-pointer top-[40%] right-3"
					onClick={toggleVisibility}
				>
					{isVisible && <Eye />}
					{!isVisible && <EyeOff />}
				</button>
			)}
		</div>
	);
}
