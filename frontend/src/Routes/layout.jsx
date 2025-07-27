import Header from '@/components/header'
import { Footer7 } from '@/components/footer7'

const Layout = ({ children }) => {
    return (
        <div
            className="flex flex-col h-screen w-[1200px] m-auto"
        >
            <Header />
            <main>
                {children}
            </main>
            <Footer7 />
        </div>
    )
}

export default Layout;
