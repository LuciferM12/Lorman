import { Header } from '@/components/main/Header'
import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-full h-full'>
            <Header companyName='Lorman' />
            {children}
        </div>
    )
}

export default layout
