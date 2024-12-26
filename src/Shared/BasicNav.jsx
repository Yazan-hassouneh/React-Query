import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../styles/App.css'

function BasicNav() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to={"/"} className='mx-3 text-decoration-none text-dark'>Home</NavLink> 
                    <NavLink to={"/users"} className='mx-3 text-decoration-none text-dark'>Users</NavLink>
                    <NavLink to={"/rqusers"} className='mx-3 text-decoration-none text-dark'>RqUsers</NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicNav;