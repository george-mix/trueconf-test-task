export const sortDescendingTwoNumbers = (
  firstNumber: number,
  secondNumber: number
) => {
  return [firstNumber, secondNumber].sort((a, b) => b - a);
};
