export function getDayOfWeek(dateString: string) {
 const date = new Date(dateString);
 const today = new Date();
 const yesterday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 1
 );

 if (date.toDateString() === yesterday.toDateString()) {
  return "Ontem";
 }

 const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
 ];
 return daysOfWeek[date.getDay()];
}
