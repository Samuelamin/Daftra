import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const [cart, setCart] = useState({});
  const [hydrated, setHydrated] = useState(false);

  async function TokenSave(key, value) {
    console.log([key, value])
    localStorage.setItem(key, value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${value}`
  }

  const getUser = async () => {
    try {
      const { data } = await axios.get('/user')
      setUser(data.user)
    } catch (e) {
      setUser(0)
    }
  }

  //logout
  const logout = () => {
    axios.get(`/sign-out`).then((response) => {
      localStorage.removeItem('access_token')
      setUser(0)
      navigate('/login')
      setCart({})
    })
  }

  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [])



  // 1) On mount, load from localStorage and mark hydrated
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(stored);
    setHydrated(true);
  }, []);

  // 2) After hydration, write back whenever cart changes
  useEffect(() => {
    if (!hydrated) return;            // skip until we’ve loaded
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, hydrated]);

  // Add 1 (or increment) for a product
  const addItem = useCallback(product => {
    setCart(prev => {
      const prevCount = prev[product.id]?.count || 0;
      return {
        ...prev,
        [product.id]: { product, count: prevCount + 1 }
      };
    });
  }, []);

  // Set a specific count (or remove if <=0)
  const updateItem = useCallback((productId, count) => {
    setCart(prev => {
      const next = { ...prev };
      if (count <= 0) {
        delete next[productId];
      } else {
        next[productId] = { product: prev[productId].product, count };
      }
      return next;
    });
  }, []);

  // Remove completely
  const removeItem = useCallback(productId => {
    setCart(prev => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);
  // Compute totals
  const itemsArray = Object.values(cart);
  const subtotal = itemsArray.reduce((sum, { product, count }) => sum + product.price * count, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.075;
  const total = subtotal + shipping + tax;


  return (
    <AuthContext.Provider
      value={{
        TokenSave,
        user,
        getUser,
        logout,
        cart,
        addItem,
        updateItem,
        removeItem,
        itemsArray,
        subtotal,
        shipping,
        tax,
        clearCart,
        total

      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext() {
  return useContext(AuthContext)
}
