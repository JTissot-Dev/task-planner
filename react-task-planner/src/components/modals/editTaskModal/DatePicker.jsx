import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { NextIcon } from "../../icons";
import { PreviousIcon } from "../../icons";

const options = {
	title: "",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	clearBtnText: "Effacer",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-slate-800",
		todayBtn: "",
		clearBtn: "focus:ring-purple-300 bg-slate-800 border-zinc-50 border-opacity-20 text-zinc-50 text-opacity-90 hover:bg-slate-700 hover:bg-opacity-30",
		icons: "bg-slate-800 hover:bg-slate-700 hover:bg-opacity-30 border text-zinc-50 text-opacity-90 border-zinc-100 border-opacity-20 py-2",
		text: "text-zinc-50 text-opacity-90 hover:bg-opacity-40",
		disabledText: "hover:bg-slate-700",
		input: "bg-slate-800 text-zinc-50 text-opacity-90 border-zinc-100 border-opacity-20 rounded-md px-10 focus:ring-purple-800 focus:border-purple-800",
		inputIcon: "text-zinc-50 text-opacity-90",
		selected: "bg-purple-800 hover:bg-purple-700",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <PreviousIcon />,
		next: () => <NextIcon />,
	},
	datepickerClassNames: "top-86",
	defaultDate: new Date(),
	language: "fr",
	disabledDates: [],
	weekDays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Saisir une date...",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

const DatePicker = () => {
	const [show, setShow] = useState(false);
	const handleChange = selectedDate => {
		console.log(selectedDate);
	}
	const handleClose = () => {
		setShow(prev => !prev);
	}

	return (
		<div>
			<Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
		</div>
	)
}

export default DatePicker;