'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/about' },
    { name: 'Productos', href: '/products' },
    { name: 'Contacto', href: '/contact' },
    { name: 'Pedidos', href: '/orders' },
]

interface HeaderProps {
    companyName: string
}

export const Header = ({ companyName }: HeaderProps) => {
    const pathname = usePathname()

    return (
        <header className='w-full flex items-center justify-between px-6 py-4 absolute top-0 left-0 z-50'>
            <Link href='/' className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center'>
                    <span className='text-white font-bold text-sm'>💦</span>
                </div>

                <span className='font-semibold text-lg'>{companyName}</span>
            </Link>

            <nav className='relative flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm backdrop-blur-md'>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className='relative px-4 py-1.5 text-sm font-medium'
                        >
                            {isActive && (
                                <motion.div
                                    layoutId='active-pill'
                                    className='absolute inset-0 rounded-full bg-blue-400'
                                    transition={{
                                        type: 'spring',
                                        stiffness: 350,
                                        damping: 28,
                                    }}
                                />
                            )}

                            <span
                                className={`relative z-10 transition-colors ${
                                    isActive
                                        ? 'text-black'
                                        : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                {link.name}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            <button className='rounded-full bg-blue-400 px-5 py-2 font-medium text-black shadow-sm transition hover:bg-blue-500'>
                Download App
            </button>
        </header>
    )
}
