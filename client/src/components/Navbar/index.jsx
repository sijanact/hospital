import './navbar.css';

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src="/logo1.jpg" />
        </div>
        <div className="home">
          <p>HOME</p>
          <p>ABOUT</p>
          <p>DOCTORS</p>
          <p>DEPARTMENTS</p>
          <>LOGOUT</>
        </div>
      </div>
    </>
  );
};

export default Navbar;
