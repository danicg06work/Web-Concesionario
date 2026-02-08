const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-[url('https://website-images.mclaren.com/1396/mclaren-w1-orange-side-profile.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/30"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
                <h2 className="text-[#FF8000] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
                    EL SUPERDEPORTIVO EN ESTADO PURO
                </h2>
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold uppercase italic tracking-tighter mb-8 text-white drop-shadow-lg">
                    McLaren W1
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                    La próxima generación de superhíbridos de alto rendimiento.
                    Nacida de la ingeniería implacable.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button className="group relative px-8 py-3 bg-[#FF8000] text-black font-bold uppercase tracking-wider overflow-hidden">
                        <span className="relative z-10">Descubrir Artura</span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </button>
                    <button className="px-8 py-3 border border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                        Ver Especificaciones
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
