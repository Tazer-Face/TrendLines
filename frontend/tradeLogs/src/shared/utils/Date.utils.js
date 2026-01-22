export default function convertToDate(date){
if (!date.includes("/")) return null;
const [month,day,year] = date.split("/");
return new Date(year,month -1,day)
}