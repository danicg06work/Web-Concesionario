import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModelShowcase from './components/ModelShowcase';
import ModelsView from './components/ModelsView';
import AuthView from './components/AuthView';
import CarDetailView from './components/CarDetailView';
import Footer from './components/Footer';
import { addFavorite, getCarModels, getFavorites, login, register, removeFavorite } from './api';
import type { CarModel, User } from './types';

const TOKEN_STORAGE_KEY = 'webmclaren_token';
const USER_STORAGE_KEY = 'webmclaren_user';

function readStoredUser(): User | null {
  const rawUser = localStorage.getItem(USER_STORAGE_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    return null;
  }
}

function App() {
  const [activeView, setActiveView] = useState<'home' | 'models' | 'auth' | 'car-detail'>('home');
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState<User | null>(() => readStoredUser());

  const [models, setModels] = useState<CarModel[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const selectedModel = useMemo(
    () => models.find((model) => model.id === selectedModelId) ?? null,
    [models, selectedModelId],
  );

  const [modelsLoading, setModelsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [favoriteActionLoadingId, setFavoriteActionLoadingId] = useState<number | null>(null);

  const [authError, setAuthError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadModels() {
      setModelsLoading(true);
      setDataError(null);

      try {
        const modelsResponse = await getCarModels();
        setModels(modelsResponse);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'No se pudieron cargar los modelos';
        setDataError(message);
      } finally {
        setModelsLoading(false);
      }
    }

    void loadModels();
  }, []);

  useEffect(() => {
    if (!token) {
      setFavoriteIds([]);
      return;
    }

    const currentToken = token;

    async function loadFavorites() {
      try {
        const favorites = await getFavorites(currentToken);
        setFavoriteIds(favorites.map((model) => model.id));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'No se pudieron cargar los favoritos';
        setDataError(message);
      }
    }

    void loadFavorites();
  }, [token]);

  const userLabel = useMemo(() => {
    if (!user) {
      return null;
    }

    return user.name || user.email;
  }, [user]);

  const openAuthSection = () => {
    setActiveView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModelsView = () => {
    setActiveView('models');
    setTimeout(() => {
      const element = document.getElementById('models-catalog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const openHomeView = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCarDetail = (carModelId: number) => {
    setSelectedModelId(carModelId);
    setActiveView('car-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToModels = () => {
    setActiveView('models');
    setTimeout(() => {
      const element = document.getElementById('models-catalog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const saveSession = (nextToken: string, nextUser: User) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setFavoriteIds([]);
  };

  const onAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const response = authMode === 'register'
        ? await register({
          email,
          password,
          name: name.trim() || undefined,
        })
        : await login({ email, password });

      saveSession(response.accessToken, response.user);
      setPassword('');
      setName('');
      setActiveView('models');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error de autenticacion';
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const onToggleFavorite = async (carModelId: number) => {
    if (!token) {
      openAuthSection();
      return;
    }

    setFavoriteActionLoadingId(carModelId);
    setDataError(null);

    try {
      const alreadyFavorite = favoriteIds.includes(carModelId);
      const updatedFavorites = alreadyFavorite
        ? await removeFavorite(token, carModelId)
        : await addFavorite(token, carModelId);

      setFavoriteIds(updatedFavorites.map((model) => model.id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo actualizar favoritos';
      setDataError(message);
    } finally {
      setFavoriteActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FF8000] selection:text-black font-sans">
      <Navbar
        isAuthenticated={Boolean(token)}
        userLabel={userLabel}
        onAuthClick={openAuthSection}
        onLogout={clearSession}
        onModelsClick={openModelsView}
        onHomeClick={openHomeView}
      />

      {activeView === 'home' ? (
        <>
          <Hero />

          <section className="bg-[#0f0f0f] border-y border-white/10 px-6 py-12">
            <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold uppercase italic tracking-tight">Experiencia completa</h2>
                <p className="text-gray-300 mt-3">
                  Navega modelos, abre fichas de vehiculo a pantalla completa y guarda tus favoritos con tu cuenta.
                </p>
                {dataError ? <p className="mt-4 text-sm text-red-400">{dataError}</p> : null}
              </div>

              <div className="flex flex-wrap gap-3 justify-start md:justify-end">
                <button
                  onClick={openModelsView}
                  className="border border-[#FF8000] text-[#FF8000] px-5 py-3 text-xs uppercase tracking-wider hover:bg-[#FF8000] hover:text-black transition-colors"
                >
                  Ver modelos
                </button>
                {!token ? (
                  <button
                    onClick={openAuthSection}
                    className="border border-white/20 text-white px-5 py-3 text-xs uppercase tracking-wider hover:border-[#FF8000] hover:text-[#FF8000] transition-colors"
                  >
                    Iniciar sesion
                  </button>
                ) : null}
              </div>
            </div>
          </section>

          <ModelShowcase
            models={models}
            favoriteIds={favoriteIds}
            isAuthenticated={Boolean(token)}
            isLoading={modelsLoading}
            actionLoadingId={favoriteActionLoadingId}
            onToggleFavorite={onToggleFavorite}
            onViewModel={openCarDetail}
          />
        </>
      ) : null}

      {activeView === 'auth' ? (
        <AuthView
          authMode={authMode}
          email={email}
          password={password}
          name={name}
          authLoading={authLoading}
          authError={authError}
          onChangeMode={setAuthMode}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onNameChange={setName}
          onSubmit={onAuthSubmit}
          onBackHome={openHomeView}
        />
      ) : null}

      {activeView === 'models' ? (
        <ModelsView
          models={models}
          favoriteIds={favoriteIds}
          isAuthenticated={Boolean(token)}
          isLoading={modelsLoading}
          actionLoadingId={favoriteActionLoadingId}
          onToggleFavorite={onToggleFavorite}
          onBackHome={openHomeView}
          onViewModel={openCarDetail}
        />
      ) : null}

      {activeView === 'car-detail' && selectedModel ? (
        <CarDetailView
          model={selectedModel}
          isAuthenticated={Boolean(token)}
          isFavorite={favoriteIds.includes(selectedModel.id)}
          actionLoadingId={favoriteActionLoadingId}
          onToggleFavorite={onToggleFavorite}
          onBackToModels={backToModels}
        />
      ) : null}

      {activeView === 'car-detail' && !selectedModel ? (
        <section className="min-h-screen flex items-center justify-center px-6 text-center">
          <div>
            <h2 className="text-3xl font-bold uppercase italic">Modelo no encontrado</h2>
            <button
              onClick={openModelsView}
              className="mt-6 border border-[#FF8000] text-[#FF8000] px-5 py-2 text-xs uppercase tracking-wider hover:bg-[#FF8000] hover:text-black transition-colors"
            >
              Volver a modelos
            </button>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  );
}

export default App;
