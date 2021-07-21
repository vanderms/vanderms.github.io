import { PrimaryLinks, SocialLinks } from "./utilities";
import '../sass/navbar.scss';


export default function Navbar(){
  return(
    <nav className='component-navbar'>
      <div className="container">
        <PrimaryLinks/>
        <SocialLinks/>
      </div>
    </nav>
  );
}