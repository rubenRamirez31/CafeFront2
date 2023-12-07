"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react";

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

const NavBarComponent = () => {
  const { data: session, status } = useSession();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [loadingCantidadCarrito, setLoadingCantidadCarrito] = useState(false);


  useEffect(() => {
    setIsLoginPage(window.location.pathname === '/Login');

    const fetchCantidadCarrito = async () => {
      try {
        setLoadingCantidadCarrito(true);
        const response = await fetch(`http://localhost:8080/carrito-productos/usuario/${session.user.idUsuario}/conteo`, {
          method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
        });

        if (response.ok) {
          const data = await response.json();
          setCantidadCarrito(data);
        } else {
          console.error('Error fetching carrito cantidad:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching carrito cantidad:', error);
      } finally {
        setLoadingCantidadCarrito(false);
      }
    };

    if (session?.user?.token) {
      fetchCantidadCarrito();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <>
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>

      </>
    )

  }

  if (status === 'authenticated') {

    switch (session?.user.rol.idRol) {
      case 1:
        return (
          <>
            {(
              <Navbar bg="dark" data-bs-theme="dark" sticky="top" key={'lg'} expand={'lg'} className="bg-body-tertiary mb-3">
                <Container fluid>
                  <Navbar.Brand href="/">Cafe Contigo</Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${'lg'}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
                        Menú
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-start flex-grow-1 pe-3">
                        <Nav.Link href="/">Usuarios</Nav.Link>
                        <Nav.Link href="/Admin/Admin/Solicitudes">Solicitudes</Nav.Link>
                      </Nav>
                      <Nav className="justify-content-end">
                        {session ? (
                          <>
                            <Nav.Link className="" onClick={() => signOut()} >Cerrar Sesión</Nav.Link>
                          </>
                        ) : (
                          <>
                            {/* Links para usuarios no autenticados */}
                            {!isLoginPage && <Nav.Link href="/Login">Iniciar Sesión</Nav.Link>}
                            {/* Muestra el enlace para iniciar sesión solo si no estamos en la página de Login */}
                          </>
                        )}
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            )}
          </>
        )
        break;
      case 2:
        return (
          <>
            {(
              <Navbar bg="dark" data-bs-theme="dark" sticky="top" key={'lg'} expand={'lg'} className="bg-body-tertiary mb-3">
                <Container fluid>
                  <Navbar.Brand href="/">Cafe Contigo</Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${'lg'}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
                        Menú
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-start flex-grow-1 pe-3">
                        <Nav.Link href="/Admin/Vendedor/Productos">Mis Productos</Nav.Link>
                        <Nav.Link href="/Admin/Vendedor/Tiendas">Mis Tiendas</Nav.Link>
                        <Nav.Link href="/Admin/Vendedor/Ventas">Ventas</Nav.Link>
                      </Nav>
                      <Nav className="justify-content-end">
                        {session ? (
                          <>
                            <Nav.Link className="" onClick={() => signOut()} >Cerrar Sesión</Nav.Link>
                          </>
                        ) : (
                          <>
                            {/* Links para usuarios no autenticados */}
                            {!isLoginPage && <Nav.Link href="/Login">Iniciar Sesión</Nav.Link>}
                            {/* Muestra el enlace para iniciar sesión solo si no estamos en la página de Login */}
                          </>
                        )}
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            )}
          </>
        )
        break;

      case 3:
        return (
          <>
            {(
              <Navbar bg="dark" data-bs-theme="dark" sticky="top" key={'lg'} expand={'lg'} className="bg-body-tertiary mb-3">
                <Container fluid>
                  <Navbar.Brand href="/">Cafe Contigo</Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${'lg'}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
                        Menú
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-start flex-grow-1 pe-3">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="#">Productos</Nav.Link>
                        <Nav.Link href="#">Tiendas</Nav.Link>
                        <Nav.Link href="#">Ordenes</Nav.Link>
                        <Navbar.Brand href="../MiCarrito">
                          <img
                            src="/carrito.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="C"
                          />
                          ({cantidadCarrito})
                        </Navbar.Brand>
                      </Nav>
                      <Nav className="justify-content-end">
                        {session ? (
                          <>
                            <Nav.Link className="" onClick={() => signOut()} >Cerrar Sesión</Nav.Link>
                          </>
                        ) : (
                          <>
                            {/* Links para usuarios no autenticados */}
                            {!isLoginPage && <Nav.Link href="/Login">Iniciar Sesión</Nav.Link>}
                            {/* Muestra el enlace para iniciar sesión solo si no estamos en la página de Login */}
                          </>
                        )}
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            )}
          </>
        )
        break;
      case 4:
        return (
          <>
            {(
              <Navbar bg="dark" data-bs-theme="dark" sticky="top" key={'lg'} expand={'lg'} className="bg-body-tertiary mb-3">
                <Container fluid>
                  <Navbar.Brand href="/">Cafe Contigo</Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${'lg'}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
                        Menú
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-start flex-grow-1 pe-3">
                        <Nav.Link href="/">Ordenes</Nav.Link>
                      </Nav>
                      <Nav className="justify-content-end">
                        {session ? (
                          <>
                            <Nav.Link className="" onClick={() => signOut()} >Cerrar Sesión</Nav.Link>
                          </>
                        ) : (
                          <>
                            {/* Links para usuarios no autenticados */}
                            {!isLoginPage && <Nav.Link href="/Login">Iniciar Sesión</Nav.Link>}
                            {/* Muestra el enlace para iniciar sesión solo si no estamos en la página de Login */}
                          </>
                        )}
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            )}
          </>
        )
        break;
      default:

        break;
    }


  } else {



    return (
      <>
        {(
          <Navbar bg="dark" data-bs-theme="dark" sticky="top" key={'lg'} expand={'lg'} className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand href="/">Cafe Contigo</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${'lg'}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
                    Menú
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-start flex-grow-1 pe-3">
                    {session ? (
                      <>
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="#">Ordenes</Nav.Link>
                        <Nav.Link href="#">Pedidos</Nav.Link>
                        <Nav.Link href="/Tiendas">Tiendas</Nav.Link>

                      </>
                    ) : (
                      <>
                        {/* Links para usuarios no autenticados */}
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/Tiendas">Tiendas</Nav.Link>
                      </>
                    )}
                  </Nav>
                  <Nav className="justify-content-end">
                    {session ? (
                      <>
                        <Nav.Link className="" onClick={() => signOut()} >Cerrar Sesión</Nav.Link>
                      </>
                    ) : (
                      <>
                        {/* Links para usuarios no autenticados */}
                        {!isLoginPage && <Nav.Link href="/Login">Iniciar Sesión</Nav.Link>}
                        {/* Muestra el enlace para iniciar sesión solo si no estamos en la página de Login */}
                      </>
                    )}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        )}
      </>
    )
  }
}

export default NavBarComponent