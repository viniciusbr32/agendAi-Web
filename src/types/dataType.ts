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
	booking_date: string;
	booking_hour: string;
	user: string;
	price: number;
};

export type DoctorService = {
	id_service: number;
	description: string;
	price: number;
};
