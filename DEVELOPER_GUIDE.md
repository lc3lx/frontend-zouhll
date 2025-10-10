# دليل المطورين - Developer Guide

## 🏗️ بنية المشروع

```
frontendweb/
├── public/
│   ├── index.html
│   └── manifest.json          # PWA configuration
├── src/
│   ├── Api/
│   │   └── baseURL.js         # Axios base configuration
│   ├── Components/
│   │   ├── Admin/             # لوحة تحكم المدير
│   │   ├── Brand/             # مكونات الماركات
│   │   ├── Cart/              # سلة التسوق
│   │   ├── Category/          # التصنيفات
│   │   ├── Checkout/          # الدفع
│   │   ├── Home/              # الصفحة الرئيسية
│   │   ├── Products/          # المنتجات
│   │   ├── Rate/              # التقييمات
│   │   ├── Uitily/            # مكونات مساعدة
│   │   └── User/              # صفحات المستخدم
│   ├── hook/                  # Custom React Hooks
│   ├── hooks/                 # API Hooks
│   ├── redux/                 # State Management
│   ├── utils/                 # Utility Functions
│   ├── App.js
│   └── index.js
└── package.json
```

## 🎨 نظام التصميم

### الألوان الرئيسية

```css
/* Primary Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-success: linear-gradient(135deg, #d4fc79, #96e6a1);
--gradient-warning: linear-gradient(135deg, #ffeaa7, #fdcb6e);
--gradient-info: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);

/* Backgrounds */
--bg-main: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
--bg-card: rgba(255, 255, 255, 0.95);
```

### مكونات التصميم الأساسية

#### 1. Modern Card

```jsx
<div
  style={{
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "25px",
    padding: "30px",
    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
    border: "2px solid rgba(102, 126, 234, 0.1)",
  }}
>
  {/* Content */}
</div>
```

#### 2. Gradient Title

```jsx
<div
  style={{
    fontSize: "24px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  عنوان
</div>
```

#### 3. Badge Component

```jsx
<span
  style={{
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "8px 20px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "700",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  }}
>
  Badge Text
</span>
```

## 🔧 Custom Hooks

### 1. Data Fetching Hooks

```javascript
// useGetData.js - GET requests
import useGetData from "./hooks/useGetData";
const { data, loading, error } = useGetData(url);

// useInsertData.js - POST requests
import useInsertData from "./hooks/useInsertData";
const response = await useInsertData(url, data);

// useUpdateData.js - PUT/PATCH requests
import useUpdateData from "./hooks/useUpdateData";
const response = await useUpdateData(url, data);

// useDeleteData.js - DELETE requests
import useDeleteData from "./hooks/useDeleteData";
const response = await useDeleteData(url);
```

### 2. Business Logic Hooks

```javascript
// hook/products/view-products-detalis-hook.js
const [item, images, cat, brand, prod] = ViewProductsDetalisHook(prodID);

// hook/cart/get-all-user-cart-hook.js
const [
  itemsNum,
  cartItems,
  totalCartPrice,
  couponNameRes,
  totalCartPriceAfterDiscount,
  cartID,
] = GetAllUserCartHook();

// hook/user/user-get-all-order-hook.js
const [userName, results, paginate, orderData, onPress] = UserGetAllOrderHook();
```

## 📝 معالجة الأخطاء

### استخدام apiErrorHandler

```javascript
import {
  handleApiError,
  ensureArray,
  retryWithBackoff,
} from "./utils/apiErrorHandler";

// معالجة بسيطة
const data = handleApiError(error, []); // يرجع [] في حالة الخطأ

// التأكد من array
const safeArray = ensureArray(data);

// Retry مع backoff
const result = await retryWithBackoff(
  async () => {
    return await dispatch(getProducts());
  },
  3,
  1000
);
```

### فحص البيانات قبل map()

```javascript
// ✅ الطريقة الصحيحة
const items = Array.isArray(data) ? data : []
items.map(item => ...)

// ❌ تجنب
data.map(item => ...)  // قد يسبب error إذا data ليست array
```

### منع Memory Leaks

```javascript
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    const response = await api.getData();
    if (isMounted) {
      // فقط update state إذا component mounted
      setData(response);
    }
  };

  fetchData();

  return () => {
    isMounted = false; // cleanup
  };
}, []);
```

## 🎭 الأنيميشن

### CSS Animations

```css
/* Fade In */
.fade-in {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide In */
.slide-in {
  animation: slideInRight 0.8s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Bounce */
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

### React Transitions

```jsx
// Hover Effect
const [isHovered, setIsHovered] = useState(false)

<div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    transform: isHovered ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  }}
>
  {/* Content */}
</div>
```

## 🔐 Authentication

### تخزين البيانات

```javascript
// Login
localStorage.setItem("user", JSON.stringify(userData));
localStorage.setItem("token", token);

// Check Auth
const user = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = user !== null;

// Logout
localStorage.removeItem("user");
localStorage.removeItem("token");
```

### Protected Routes

```javascript
import ProtectedRoute from "./Components/Uitily/ProtectedRoute";

<Route
  path="/admin/*"
  element={
    <ProtectedRoute auth={isAdmin}>
      <AdminPage />
    </ProtectedRoute>
  }
/>;
```

## 📦 Redux State Management

### Structure

```javascript
// Store
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

// Actions
export const getProducts = () => async (dispatch) => {
  try {
    const response = await useGetData("/api/v1/products");
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error.message,
    });
  }
};

// Reducers
const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
```

## 🧪 Testing

### Component Testing

```javascript
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

test("renders product card", () => {
  render(<ProductCard item={mockProduct} />);
  expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
});
```

## 🚀 Deployment

### Build للإنتاج

```bash
npm run build
```

### Environment Variables

```javascript
// .env
REACT_APP_API_URL=https://backend-zouhal.onrender.com
```

## 📚 المراجع المفيدة

- [React Documentation](https://reactjs.org/)
- [Redux Documentation](https://redux.js.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

## 🆘 حل المشاكل الشائعة

### 1. `.map is not a function`

**الحل**: تأكد من أن البيانات array

```javascript
const items = Array.isArray(data) ? data : [];
```

### 2. `Can't perform React state update on unmounted component`

**الحل**: استخدم cleanup في useEffect

```javascript
useEffect(() => {
  let isMounted = true;
  // ... async operation
  if (isMounted) setState(data);
  return () => {
    isMounted = false;
  };
}, []);
```

### 3. `Invalid DOM property 'for'`

**الحل**: استخدم `htmlFor` بدلاً من `for`

```jsx
<label htmlFor="input-id">Label</label>
```

### 4. `429 Too Many Requests`

**الحل**: استخدم retry logic مع delay

```javascript
import { retryWithBackoff } from "./utils/apiErrorHandler";
await retryWithBackoff(apiCall, 3, 1000);
```
