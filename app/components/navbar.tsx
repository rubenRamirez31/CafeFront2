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


const NavBarComponent = () => {
  const { data: session, status } = useSession();
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    setIsLoginPage(window.location.pathname === '/Login');
  }, []);

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
                        <Nav.Link href="/">Mis Productos</Nav.Link>
                        <Nav.Link href="#">Mis Tiendas</Nav.Link>
                        <Nav.Link href="#">Ventas</Nav.Link>
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
                        <Nav.Link href="#">Carrito</Nav.Link>
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