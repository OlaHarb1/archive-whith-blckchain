import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem,
    NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
import {Link } from "react-router-dom";
import {HashLink } from "react-router-hash-link";




const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
       "About",
        "Contact",
        "Collages"
    ];
    return (
        <Navbar className=' absolute top-0 left-0 bg-opacity-25 bg-transparent' isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="start">
                <NavbarBrand>
                    <img src="/images/logo.png" alt="logo"/>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                <NavbarBrand>
                    {/*<img className='w-[250px] h-[150px]' src="/images/logo.png" alt="logo"/>*/}
                </NavbarBrand>
                <NavbarItem>
                    <Link className='hover:text-blue-800 focus:text-blue-800 font-bold text-xl'  to="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <HashLink className='hover:text-blue-800 focus:text-blue-800 font-bold text-xl'  to="#aboutus">
                        About
                    </HashLink>
                </NavbarItem>
                <NavbarItem >
                    <HashLink to="#collages" className='hover:text-blue-800 focus:text-blue-800 font-bold text-xl'  >
                        Collages
                    </HashLink>
                </NavbarItem>
                <NavbarItem>
                    <HashLink className='hover:text-blue-800 focus:text-blue-800 font-bold text-xl'  to="#contact">
                        Contacts
                    </HashLink>
                </NavbarItem>
            </NavbarContent>



            <NavbarMenu className='h-40'>
                {
                    menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className='w-full hover:text-blue-500 focus:text-blue-500'

                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            size="lg"
                         to='item'>
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );


};

export default NavBar;