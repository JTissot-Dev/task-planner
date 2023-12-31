import { useState, useEffect } from "react";
import Datepicker from "tailwind-datepicker-react";
import { NextIcon } from "../../icons";
import { PreviousIcon } from "../../icons";


const DatePicker = ({handleDeadline, deadline, handleClear}) => {
  
  const options = {
    title: "",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Effacer",
    maxDate: new Date("2040-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-slate-800",
      todayBtn: "",
      clearBtn: "focus:ring-purple-400 bg-slate-800 border-zinc-50 border-opacity-20 text-zinc-50 text-opacity-90 hover:bg-slate-700 hover:bg-opacity-30",
      icons: "bg-slate-800 hover:bg-slate-700 hover:bg-opacity-30 border text-zinc-50 text-opacity-90 border-zinc-100 border-opacity-20 py-2",
      text: "text-zinc-50 text-opacity-90 hover:bg-opacity-40",
      disabledText: "hover:bg-slate-700",
      input: "bg-slate-800 text-zinc-50 text-opacity-90 border-zinc-100 border-opacity-20 rounded-md py-2 px-10 focus:ring-purple-800 focus:border-purple-800",
      inputIcon: "text-zinc-50 text-opacity-90",
      selected: "bg-purple-800 hover:bg-purple-700",
    },
    icons: {
      prev: () => <PreviousIcon />,
      next: () => <NextIcon />,
    },
    datepickerClassNames: "top-86",
    defaultDate: deadline && new Date(deadline),
    language: "fr",
    disabledDates: [],
    weekDays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    inputNameProp: "deadline",
    inputIdProp: "deadline",
    inputPlaceholderProp: "Saisir une date...",
    inputDateFormatProp: {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  }

	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(prev => !prev);
	}

  useEffect(() => {
    var xpathExpression = "//*[text()='Effacer']";
    var result = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var selectedElement = result.singleNodeValue;
  
    if (selectedElement) {
      selectedElement.addEventListener('click', handleClear, true);

      return () => {
        selectedElement.removeEventListener('click', handleClear, true);
      };
    }
  }, [show])

	return (
		<div>
			<Datepicker 
        options={ options } 
        onChange={ handleDeadline }
        show={ show } 
        setShow={ handleClose } 
      />
		</div>
	)
}

export default DatePicker;