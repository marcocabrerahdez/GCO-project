import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu } from 'semantic-ui-react'

const Navbar = () => {
  const { pathname } = useRouter()
  return (
    <Menu fluid widths={3}>
      <Link href="/">
        <Menu.Item header active={pathname === '/'}>
          Inicio
        </Menu.Item>
      </Link>
    </Menu>
  )
}

export default Navbar