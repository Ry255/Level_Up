import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { categorias } from '../../data/productos';
import { useCarrito } from '../../context/carritoContext';

function App_navbar() {
    const navigate = useNavigate();
    const { carrito } = useCarrito();

    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    function filtrarCategoria(categoria) {
        navigate("/", { state: { categoria } });
    }

    return (
        <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="text-success">Level UP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>

                        <NavDropdown title="Categoria" id="categorias-nav-dropdown">
                            {categorias.map((cat) => (
                                <NavDropdown.Item
                                    key={cat.clave}
                                    onClick={() => filtrarCategoria(cat.clave)}
                                >
                                    {cat.etiqueta}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>

                        <Nav.Link as={Link} to="/carrito">Carrito ({totalItems})</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default App_navbar;
