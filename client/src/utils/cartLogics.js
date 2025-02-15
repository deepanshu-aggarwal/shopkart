// import { useCart } from "../context/CartProvider";

// const [cart] = useCart();

// export const findTotal = () => {
//   if (!cart) return 0;
//   const total = cart?.reduce((acc, item) => {
//     return acc + item.price * item.qty;
//   }, 0);
//   return total?.toLocaleString("en-IN", {
//     style: "currency",
//     currency: "INR",
//   });
// };
