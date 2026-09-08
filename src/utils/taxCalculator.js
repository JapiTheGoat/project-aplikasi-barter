export const calculateTax = (price) => {
  const taxRate = 0.05; // 5%
  const adminFee = 2000; // biaya admin tetap
  const tax = price * taxRate + adminFee;
  return {
    tax,
    taxRate: taxRate * 100,
    adminFee,
    total: price + tax,
  };
};