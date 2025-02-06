import dateFormat, { masks, i18n } from "dateformat";

i18n.dayNames = [
  "Dom",
  "Lun",
  "Mar",
  "Mie",
  "Jue",
  "Vie",
  "Sab",
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Juves",
  "Viernes",
  "Sábado",
];

i18n.monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Dicembre",
];

i18n.timeNames = ["a", "p", "am", "pm", "A", "P", "AM", "PM"];

export function stringToDate(date: string): string {
  return dateFormat(date, masks.longDate);
}
