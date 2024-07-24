import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
// import {  useShoppingCartContext } from "@/context/ShoppingCartContext"

const Navbar = ({}) =>{
    return (
      <NavbarBs sticky="top" className="navbar">
        <Container>
          <Nav className="navlinks">
            <div>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/single">Single</Nav.Link>
              <Nav.Link href="/favorite">Favorite</Nav.Link>
            </div>
            <div>
              <Button>log in</Button>
            </div>
          </Nav>
        </Container>
      </NavbarBs>
    );
}

export default Navbar
