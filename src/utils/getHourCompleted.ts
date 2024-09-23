export function getHourAndMinutes(dateString: string) {
 const date = new Date(dateString);
 const hours = date.getHours();
 const minutes = date.getMinutes();
 return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

export function getDayOfTheMonth(dateString: string) {
 const date = new Date(dateString);
 const day = date.getDate().toString().padStart(2, "0");
 const month = date.toLocaleString("pt-BR", { month: "long" });
 return `${day} de ${month}`;
}
