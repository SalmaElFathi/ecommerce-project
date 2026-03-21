
export function formatMoney(amountCents){
   return `$${(Math.abs(amountCents)/100).toFixed(2)}`;
}