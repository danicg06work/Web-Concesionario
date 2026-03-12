import type { CarModel } from '../types';

type CarDetailViewProps = {
  model: CarModel;
  isAuthenticated: boolean;
  isFavorite: boolean;
  actionLoadingId: number | null;
  onToggleFavorite: (carModelId: number) => void;
  onBackToModels: () => void;
};

const CarDetailView = ({
  model,
  isAuthenticated,
  isFavorite,
  actionLoadingId,
  onToggleFavorite,
  onBackToModels,
}: CarDetailViewProps) => {
  const power = model.powerLabel ?? (typeof model.powerHp === 'number' ? `${model.powerHp}hp` : 'N/D');

  return (
    <section className="min-h-screen bg-[#090909] pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-10">
        <button
          onClick={onBackToModels}
          className="mb-8 border border-white/20 px-4 py-2 text-xs uppercase tracking-widest hover:border-[#FF8000] hover:text-[#FF8000] transition-colors"
        >
          Volver a modelos
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-8 items-start">
          <div className="border border-white/10 bg-black/50 overflow-hidden">
            <img
              src={model.imageUrl}
              alt={model.name}
              className="w-full h-[34rem] md:h-[44rem] object-cover"
            />
          </div>

          <aside className="border border-white/10 bg-black/50 p-6 md:p-8 space-y-6 sticky top-24">
            <div>
              <p className="text-[#FF8000] text-xs uppercase tracking-[0.2em] font-bold">{model.category}</p>
              <h1 className="text-4xl md:text-5xl font-bold uppercase italic tracking-tight mt-2">{model.name}</h1>
              <p className="text-gray-300 mt-4 leading-relaxed">{model.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-white/10 p-4">
                <p className="text-xs uppercase tracking-widest text-gray-400">Potencia</p>
                <p className="text-2xl font-bold mt-2">{power}</p>
              </div>

              <div className="border border-white/10 p-4">
                <p className="text-xs uppercase tracking-widest text-gray-400">Categoria</p>
                <p className="text-2xl font-bold mt-2">{model.category}</p>
              </div>
            </div>

            <div className="border border-white/10 p-4 space-y-2">
              <p className="text-xs uppercase tracking-widest text-gray-400">Caracteristicas destacadas</p>
              <p className="text-sm text-gray-200">Ingenieria orientada a rendimiento y dinamica de precision.</p>
              <p className="text-sm text-gray-200">Aerodinamica optimizada para uso carretera y circuito.</p>
              <p className="text-sm text-gray-200">Plataforma digital preparada para configuraciones futuras.</p>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => onToggleFavorite(model.id)}
                disabled={actionLoadingId === model.id}
                className={`w-full py-3 text-sm uppercase tracking-wider font-bold border transition-colors disabled:opacity-60 ${
                  isFavorite
                    ? 'border-[#FF8000] text-[#FF8000]'
                    : 'border-white/20 text-white hover:border-[#FF8000] hover:text-[#FF8000]'
                }`}
              >
                {actionLoadingId === model.id ? 'Guardando...' : isFavorite ? 'Quitar de favoritos' : 'Anadir a favoritos'}
              </button>
            ) : (
              <p className="text-sm text-gray-400">Inicia sesion para guardar este modelo en favoritos.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CarDetailView;
