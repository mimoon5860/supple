export default function useCart() {
  const getCartItem = () => {
    const items = JSON.parse(localStorage.getItem("cart"));

    if (items?.length) {
      return items;
    } else {
      return [];
    }
  };

  const setCartItem = (newItem, quantity = 1) => {
    const items = getCartItem();
    const newItems = [];
    items.forEach((element) => {
      if (element._id === newItem._id) {
        newItems.push({ ...element, quantity: element.quantity + quantity });
      } else {
        newItems.push(element);
      }
    });

    const checkNewItem = newItems.find(
      (element) => element._id === newItem._id
    );

    if (!checkNewItem) {
      newItems.push({ ...newItem, quantity: quantity });
    }
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const removeItem = (id) => {
    const items = getCartItem();
    const newItems = items.filter((element) => element._id !== id);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
  };

  return { getCartItem, setCartItem, removeItem, clearCart };
}
