const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <h2 className="text-2xl font-bold italic uppercase tracking-tighter mb-6">McLaren</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Pioneros en tecnología e innovación. Llevando el rendimiento de la pista a la carretera.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF8000] mb-6">Coches</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Artura</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">750S</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">GTS</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Ultimate Series</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF8000] mb-6">Propietarios</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Servicio</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Garantía</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Accesorios</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">App McLaren</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF8000] mb-6">Contacto</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>Encuentra un distribuidor</li>
                            <li>Carreras</li>
                            <li>Prensa</li>
                            <li>Inversores</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy;2026 Daniel Cazalilla Gonzalez Limited Editon.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
