import { NavLink } from 'react-router-dom';


export function Logo(){
  return(
    <div className="component-logo">
      <span>V</span>
      <span>S</span>
    </div>
  );
}


export function PrimaryLinks(){
  return(
    <ul className="component-primary-links">
      <li><NavLink exact to='/' >HOME</NavLink></li>
      <li><NavLink to='/sobre' >SOBRE</NavLink></li>
      <li><NavLink to='/portfolio' >PORTFÓLIO</NavLink></li>
      <li><NavLink to='/contato' >CONTATO</NavLink></li>
      <li><NavLink to='/blog' >BLOG</NavLink></li>     
    </ul>
  ); 
}


export function SocialLinks(){
  return(
    <ul className="component-social-links">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}