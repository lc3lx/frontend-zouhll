import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Form,
  InputGroup,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import NavbarSearchHook from "./../../hook/search/navbar-search-hook";
import GetAllUserCartHook from "./../../hook/cart/get-all-user-cart-hook";
import CategoriesNavBar from "../Navigation/CategoriesNavBar";
const NavBarLogin = () => {
  const location = useLocation();
  //const dispatch = useDispatch()

  const [OnChangeSearch] = NavbarSearchHook();
  let word = "";
  if (localStorage.getItem("searchWord") !== null)
    word = localStorage.getItem("searchWord");

  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user") !== null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
  };

  const [itemsNum] = GetAllUserCartHook();

  return (
    <>
      {/* Top Header */}

      {/* Main Navbar */}
      <Navbar
        expand="lg"
        style={{
          background: "#232f3e",
          padding: "10px 0",
          borderBottom: "1px solid #3a4553",
        }}
        variant="dark"
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "white",
              textDecoration: "none",
              marginLeft: "20px",
            }}
          >
            <span style={{ color: "#ff9900" }}>زحل</span>
          </Navbar.Brand>

          {/* Search Bar */}
          <div className="flex-grow-1 mx-3" style={{ maxWidth: "600px" }}>
            <Form>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="ابحث في زحل..."
                  value={word}
                  onChange={OnChangeSearch}
                  style={{
                    border: "none",
                    fontSize: "0.95rem",
                    textAlign: "right",
                  }}
                />
                <InputGroup.Text
                  style={{
                    background: "#febd69",
                    border: "none",
                    borderRadius: "0 4px 4px 0",
                    cursor: "pointer",
                    padding: "8px 12px",
                  }}
                >
                  🔍
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Account */}
            {user !== "" ? (
              <NavDropdown
                title={
                  <span style={{ color: "white", fontSize: "0.9rem" }}>
                    <div style={{ fontSize: "0.8rem" }}>
                      مرحباً، {user.name}
                    </div>
                    <div style={{ fontWeight: "bold" }}>الحساب والقوائم</div>
                  </span>
                }
                id="user-dropdown"
              >
                {user.role === "admin" ? (
                  <NavDropdown.Item href="/admin/allproducts">
                    لوحة التحكم
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/user/profile">
                    الصفحة الشخصية
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item href="/user/allorders">
                  طلباتي
                </NavDropdown.Item>
                <NavDropdown.Item href="/user/favoriteproducts">
                  المفضلة
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>
                  تسجيل الخروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.8rem" }}>مرحباً</div>
                <div style={{ fontWeight: "bold" }}>تسجيل الدخول</div>
              </Link>
            )}

            {/* Orders */}
            <Link
              to="/user/allorders"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.8rem" }}>الإرجاع</div>
              <div style={{ fontWeight: "bold" }}>والطلبات</div>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              style={{
                color: "white",
                textDecoration: "none",
                position: "relative",
                fontSize: "1.5rem",
              }}
            >
              🛒
              {itemsNum > 0 && (
                <Badge
                  bg="warning"
                  text="dark"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    fontSize: "0.7rem",
                  }}
                >
                  {itemsNum}
                </Badge>
              )}
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginTop: "2px",
                }}
              >
                العربة
              </div>
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* Categories Navigation + شريط التصنيفات في الهوم فقط */}
      {location.pathname === "/" && (
        <>
          {/* شريط التصنيفات */}
          <CategoriesNavBar />
        </>
      )}
    </>
  );
};

export default NavBarLogin;
