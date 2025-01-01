export default function designation(input) {
  const regex = /([A-Za-z]{3,4})\s*-?\s*(\d{7,8})/i;
  const match = input.match(regex);

  if (match) 
    return `${match[1]} ${match[2]}`;
  
  return null;
}