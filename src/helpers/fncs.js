export function maxTextLenght(text, maxChars) {
  let smalledText = text;
  if (text.length > maxChars) {
    smalledText = text.substring(0, maxChars) + "...";
  }
  return smalledText;
}
export function inputLengthValidation(value, min) {
  const isValid = value.trim().length >= min;
  return isValid;
}
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const urlRegex = /^(http?|https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
