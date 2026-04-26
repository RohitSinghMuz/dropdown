export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const showToast = (message: string) => {
  // Toast implementation can be added with react-native-toast-message
  console.log('Toast:', message);
};
