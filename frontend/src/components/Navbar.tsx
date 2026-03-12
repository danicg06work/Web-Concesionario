import { useState, useEffect } from 'react';

type NavbarProps = {
    isAuthenticated: boolean;
    userLabel: string | null;
    onAuthClick: () => void;
    onLogout: () => void;
    onModelsClick: () => void;
    onHomeClick: () => void;
};

const Navbar = ({ isAuthenticated, userLabel, onAuthClick, onLogout, onModelsClick, onHomeClick }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <button onClick={onHomeClick} className="text-2xl font-bold tracking-tighter uppercase italic cursor-pointer">
                    McLaren <span className="text-[#FF8000]">.</span>
                </button>

                <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
                    <button onClick={onModelsClick} className="hover:text-[#FF8000] transition-colors">Modelos</button>
                    <a href="#" className="hover:text-[#FF8000] transition-colors">Racing</a>
                    <a href="#" className="hover:text-[#FF8000] transition-colors">Experiencias</a>
                    <a href="#" className="hover:text-[#FF8000] transition-colors">Concesionarios</a>
                </div>

                <div className="flex items-center gap-3">
                    {isAuthenticated && userLabel ? (
                        <span className="hidden lg:inline text-xs uppercase tracking-wider text-gray-300">
                            {userLabel}
                        </span>
                    ) : null}

                    {isAuthenticated ? (
                        <button
                            onClick={onLogout}
                            className="border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-wider"
                        >
                            Cerrar sesion
                        </button>
                    ) : (
                        <button
                            onClick={onAuthClick}
                            className="border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-wider"
                        >
                            Iniciar sesion
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
