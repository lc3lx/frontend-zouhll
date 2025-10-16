import React, { useEffect, useState } from 'react'
import { Navbar, Container, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import logo from '../../images/logo.png'
import login from '../../images/login.png'
import cart from '../../images/cart.png'
import NavbarSearchHook from './../../hook/search/navbar-search-hook';
import GetAllUserCartHook from './../../hook/cart/get-all-user-cart-hook';
const NavBarLogin = () => {
    //const dispatch = useDispatch()

    const [OnChangeSearch] = NavbarSearchHook()
    let word = "";
    if (localStorage.getItem("searchWord") !== null)
        word = localStorage.getItem("searchWord")

    const [user, setUser] = useState('');
    useEffect(() => {
        if (localStorage.getItem("user") !== null)
            setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    const logOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser('')
    }

    const [itemsNum] = GetAllUserCartHook()

    return (
        <Navbar className="sticky-top modern-navbar" bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand>
                    <a href='/'>
                        <img src={logo} className='logo' alt="زوحل" />
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <FormControl
                        value={word}
                        onChange={OnChangeSearch}
                        type="search"
                        placeholder="ابحث..."
                        className="me-2 w-100 text-center"
                        aria-label="Search"
                    />
                    <Nav className="me-auto">
                        <Nav.Link href="/categories" className="nav-text" style={{ color: "white" }}>
                            التصنيفات
                        </Nav.Link>
                        <Nav.Link href="/allbrand" className="nav-text" style={{ color: "white" }}>
                            الماركات
                        </Nav.Link>
                        <Nav.Link href="/products" className="nav-text" style={{ color: "white" }}>
                            المنتجات
                        </Nav.Link>
                        {
                            user !== '' ? (
                                <NavDropdown title={user.name} id="basic-nav-dropdown">


                                    {
                                        user.role === "admin" ? (<NavDropdown.Item href="/admin/allproducts">لوحة التحكم</NavDropdown.Item>) : (<NavDropdown.Item href="/user/profile">الصفحه الشخصية</NavDropdown.Item>)
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logOut} href="/">تسجيل خروج</NavDropdown.Item>

                                </NavDropdown>
                            ) :
                                (<Nav.Link href='/login'
                                    className="nav-text d-flex mt-3 justify-content-center">
                                    <img src={login} className="login-img" alt="sfvs" />
                                    <p style={{ color: "white" }}>دخول</p>
                                </Nav.Link>)
                        }

                        <Nav.Link href='/cart'
                            className="nav-text position-relative d-flex mt-3 justify-content-center"
                            style={{ color: "white" }}>
                            <div className="cart-badge">
                                <img src={cart} className="login-img" alt="سلة المشتريات" />
                                <p style={{ color: "white" }}>العربه</p>
                                <span className="badge">
                                    {itemsNum || 0}
                                </span>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarLogin
