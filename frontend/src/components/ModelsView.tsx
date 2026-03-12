import type { CarModel } from '../types';

type ModelsViewProps = {
  models: CarModel[];
  favoriteIds: number[];
  isAuthenticated: boolean;
  isLoading: boolean;
  actionLoadingId: number | null;
  onToggleFavorite: (carModelId: number) => void;
  onBackHome: () => void;
};

const ModelsView = ({
  models,
  favoriteIds,
  isAuthenticated,
  isLoading,
  actionLoadingId,
  onToggleFavorite,
  onBackHome,
}: ModelsViewProps) => {
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
    <section id="models-catalog" className="relative bg-[#0d0d0d] py-28 px-6 md:px-12">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,128,0,0.15),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_30%)]" />

      <div className="relative container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[#FF8000] uppercase tracking-[0.2em] text-xs font-bold mb-2">Catalogo completo</p>
            <h1 className="text-4xl md:text-6xl font-bold uppercase italic tracking-tight">Modelos McLaren</h1>
            <p className="text-gray-300 mt-3 max-w-2xl">
              Explora todos los modelos disponibles y guarda tus favoritos para tenerlos siempre a mano.
            </p>
          </div>

          <button
            onClick={onBackHome}
            className="self-start md:self-auto border border-white/20 px-5 py-2 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            Volver al inicio
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-300 py-16">Cargando modelos...</div>
        ) : null}

        {!isLoading && models.length === 0 ? (
          <div className="text-center text-gray-300 py-16">No hay modelos disponibles por el momento.</div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {models.map((model) => (
            <article
              key={model.id}
              className="bg-black/50 border border-white/10 overflow-hidden hover:border-[#FF8000]/50 transition-colors"
            >
              <div className="h-56 bg-black">
                <img
                  src={model.imageUrl}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[#FF8000] text-xs uppercase tracking-[0.2em] font-bold">{model.category}</p>
                  <h2 className="text-2xl font-bold uppercase italic tracking-tight mt-1">{model.name}</h2>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed min-h-12">{model.description}</p>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm text-white font-mono">{getPowerLabel(model)}</span>

                  {isAuthenticated ? (
                    <button
                      onClick={() => onToggleFavorite(model.id)}
                      disabled={actionLoadingId === model.id}
                      className={`text-xs uppercase tracking-wider px-3 py-2 border transition-colors disabled:opacity-60 ${
                        favoriteSet.has(model.id)
                          ? 'border-[#FF8000] text-[#FF8000]'
                          : 'border-white/25 text-white hover:border-[#FF8000] hover:text-[#FF8000]'
                      }`}
                    >
                      {actionLoadingId === model.id
                        ? 'Guardando...'
                        : favoriteSet.has(model.id)
                          ? 'En favoritos'
                          : 'Anadir favorito'}
                    </button>
                  ) : (
                    <span className="text-xs uppercase tracking-wider text-gray-400">Inicia sesion para favoritos</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsView;
