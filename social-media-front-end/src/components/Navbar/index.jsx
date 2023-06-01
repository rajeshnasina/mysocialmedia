import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
function PrimaryNavbar() {
    const selector = useSelector((state)=> state.Rajesh.feedsCount) ;
    const getTotalBookMarks = useSelector((state)=> state.Rajesh.bookMarkCount)
  return (
   
      <Navbar bg="dark" expand="lg" fixed='top' className='nav-margin-bottom'>
        <Container>
          <Navbar.Brand id="navBrand" href="/">Social Media App </Navbar.Brand>
          <Navbar.Toggle id="hambourger" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link id='navLink1' as={NavLink} to="/">Home <Badge bg='danger'>{selector}</Badge></Nav.Link>
              <Nav.Link id='navLink2' as={NavLink} to="feeds">Post Feed</Nav.Link>
              <Nav.Link id='navLink3' as={NavLink} to="bookmark">Bookmark <Badge bg='danger'>{getTotalBookMarks}</Badge></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   
  );
}

export default PrimaryNavbar;