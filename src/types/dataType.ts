export type Doctor = {
	id_doctor: number;
	name: string;
	specialty: string;
	icon: "M" | "F";
};

export type Appointment = {
	id_appointment: number;
	service: string;
	doctor: string;
	specialty?: string;
	id_user?: number;
	booking_date: string;
	booking_hour: string;
	user: string;
	price: number;
	id_doctor?: number;
};

export type DoctorService = {
	id_service: number;
	description: string;
	price: number;
};

export type Users = {
	email: string;
	id_user: number;
	name: string;
};
