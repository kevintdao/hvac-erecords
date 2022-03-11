import React from 'react'
import { Menu } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NavBar(props) {
  const role = props.role;
  const isLoggedIn = props.loggedIn;

  const router = useRouter();

  function createNavLinks(links){
    return (
      <div className='flex space-x-4 items-center'>
        {links.map((item) => (
          <Link key={item.name} href={item.href}>
            <a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>{item.name}</a>
          </Link>
        
        ))}
      </div>
    )
  }

  function MaintenanceCompanyLinks(){
    const mcLinks = [
      { name: "Manage", href: "/manage" },
      { name: "Units", href: "/units" },
      { name: "Users", href: "/users"}
    ];

    return createNavLinks(mcLinks);
  }

  function BuildingOwnerLinks(){
    const boLinks = [
      { name: "Data", href: "/" }
    ];

    return createNavLinks(boLinks);
  }
  
  function InspectorLinks(){
    const iLinks = [
      { name: "Data", href: "/" }
    ];

    return createNavLinks(iLinks);
  }

  function TechnicianLinks(){
    const tLinks = [
      { name: "Data", href: "/" },
      { name: "Report", href: "/" }
    ];

    return createNavLinks(tLinks);
  }

  function NotSignedInOptions(){
    const notSignedInLinks = [
      { name: "Login", href: "/login" },
      { name: "Sign Up", href: "/register" }
    ];

    return createNavLinks(notSignedInLinks);
  }

  function MenuDropdown(){
    const menuItems = [
      { name: "Profile", href: "/" },
      { name: "Sign Out", href: "/"}
    ]

    return (
      <Menu data-testid="menu-button" as="div" className="ml-3 relative pt-1">
        <Menu.Button className="">
          <MenuIcon className='block h-6 w-6 text-gray-300 hover:text-white'/>
        </Menu.Button>

        <Menu.Items data-testid="menu-items" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white">
          {menuItems.map((item, index) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link href={item.href}>
                  <a 
                    className={`${active && 'bg-gray-100'} block px-4 py-2 text-sm text-gray-700`}
                  >
                    {item.name}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
          
        </Menu.Items>
      </Menu>
    )
  }

  return (
    <nav className='bg-gray-800 py-2'>
      <div className='max-w-5xl mx-auto px-2'>
        <div className='flex items-center justify-between'>
          {/* left */}
          <div className='flex space-x-4'>
            {/* logo */}
            <Link href="/">
              <a className='text-gray-300 px-1 py-2 text-sm font-medium rounded'>Logo</a>
            </Link>

            {/* nav links */}
            { role == 'Maintenance Company' && <MaintenanceCompanyLinks /> }
            { role == 'Building Owner' && <BuildingOwnerLinks /> }
            { role == 'Inspector' && <InspectorLinks /> }
            { role == 'Technician' && <TechnicianLinks /> }
          </div>

          {/* right */}
          <div className='flex space-x-4 items-center'>

            {/* display buttons based on log in status */}
            { isLoggedIn ? <MenuDropdown /> : <NotSignedInOptions />}
          </div>
        </div>
      </div>
    </nav>
  )
}
