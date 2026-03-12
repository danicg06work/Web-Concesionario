import { useState } from 'react';
import type { CarModel } from '../types';

type ModelShowcaseProps = {
    models: CarModel[];
    favoriteIds: number[];
    isAuthenticated: boolean;
    isLoading: boolean;
    actionLoadingId: number | null;
    onToggleFavorite: (carModelId: number) => void;
};

const ModelShowcase = ({
    models,
    favoriteIds,
    isAuthenticated,
    isLoading,
    actionLoadingId,
    onToggleFavorite,
}: ModelShowcaseProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const favoriteSet = new Set(favoriteIds);

    const getPowerLabel = (model: CarModel) => {
        if (model.powerLabel) {
            return model.powerLabel;
        }

        if (typeof model.powerHp === 'number') {
            return `${model.powerHp}hp`;
        }

        return 'N/D';
    };

    return (
        <section className="bg-[#111] py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8000]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h3 className="text-[#FF8000] font-bold tracking-[0.2em] uppercase mb-2">Descubre</h3>
                        <h2 className="text-4xl md:text-5xl text-white font-bold uppercase italic tracking-tighter">Nuestros Modelos</h2>
                    </div>
                    <button className="hidden md:block text-white hover:text-[#FF8000] border-b border-[#FF8000] pb-1 transition-colors uppercase tracking-widest text-sm">
                        Ver toda la gama
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center text-gray-300 py-12">Cargando modelos...</div>
                ) : null}

                {!isLoading && models.length === 0 ? (
                    <div className="text-center text-gray-300 py-12">No hay modelos disponibles.</div>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {models.map((model) => (
                        <div
                            key={model.id}
                            className="group relative h-[400px] bg-[#0a0a0a] border border-white/5 overflow-hidden cursor-pointer"
                            onMouseEnter={() => setHovered(model.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Image */}
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                <img
                                    src={model.imageUrl}
                                    alt={model.name}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500">
                                <p className="text-[#FF8000] text-xs font-bold uppercase tracking-widest mb-1">{model.category}</p>
                                <h3 className="text-3xl text-white font-bold italic uppercase tracking-tighter mb-2">{model.name}</h3>
                                <div className={`overflow-hidden transition-all duration-500 ${hovered === model.id ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-400 text-sm mb-4 border-l-2 border-[#FF8000] pl-3">{model.description}</p>
                                    <div className="flex justify-between items-center border-t border-white/20 pt-3">
                                        <span className="text-white text-sm font-mono">{getPowerLabel(model)}</span>
                                        {isAuthenticated ? (
                                            <button
                                                onClick={() => onToggleFavorite(model.id)}
                                                disabled={actionLoadingId === model.id}
                                                className="text-white text-xs uppercase tracking-wider hover:text-[#FF8000] transition-colors disabled:opacity-50"
                                            >
                                                {actionLoadingId === model.id
                                                    ? 'Guardando...'
                                                    : favoriteSet.has(model.id)
                                                        ? 'Quitar favorito'
                                                        : 'Anadir favorito'}
                                            </button>
                                        ) : (
                                            <span className="text-white text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">Inicia sesion</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button className="text-white hover:text-[#FF8000] border-b border-[#FF8000] pb-1 transition-colors uppercase tracking-widest text-sm">
                        Ver toda la gama
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ModelShowcase;
