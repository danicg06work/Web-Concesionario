import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModelShowcase from './components/ModelShowcase';
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
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState<User | null>(() => readStoredUser());

  const [models, setModels] = useState<CarModel[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const [modelsLoading, setModelsLoading] = useState(true);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
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
      setFavoritesLoading(true);

      try {
        const favorites = await getFavorites(currentToken);
        setFavoriteIds(favorites.map((model) => model.id));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'No se pudieron cargar los favoritos';
        setDataError(message);
      } finally {
        setFavoritesLoading(false);
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
    const element = document.getElementById('auth-panel');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      />
      <Hero />

      <section id="auth-panel" className="bg-[#0f0f0f] border-y border-white/10 px-6 py-10">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase italic tracking-tight">Cuenta WebMclaren</h2>
            <p className="text-gray-300 mt-3">
              Inicia sesion o registrate para gestionar tus favoritos en tiempo real.
            </p>
            {token && userLabel ? (
              <p className="text-[#FF8000] mt-4 text-sm uppercase tracking-wider">Sesion activa: {userLabel}</p>
            ) : null}
            {dataError ? (
              <p className="mt-4 text-sm text-red-400">{dataError}</p>
            ) : null}
          </div>

          {!token ? (
            <form onSubmit={onAuthSubmit} className="bg-black/40 border border-white/10 p-6 space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 text-sm uppercase tracking-wider border ${authMode === 'login' ? 'border-[#FF8000] text-[#FF8000]' : 'border-white/20 text-gray-300'}`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 text-sm uppercase tracking-wider border ${authMode === 'register' ? 'border-[#FF8000] text-[#FF8000]' : 'border-white/20 text-gray-300'}`}
                >
                  Registro
                </button>
              </div>

              {authMode === 'register' ? (
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  placeholder="Nombre (opcional)"
                  className="w-full bg-black border border-white/20 px-4 py-3 text-sm outline-none focus:border-[#FF8000]"
                />
              ) : null}

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                required
                className="w-full bg-black border border-white/20 px-4 py-3 text-sm outline-none focus:border-[#FF8000]"
              />

              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                required
                className="w-full bg-black border border-white/20 px-4 py-3 text-sm outline-none focus:border-[#FF8000]"
              />

              {authError ? <p className="text-red-400 text-sm">{authError}</p> : null}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#FF8000] text-black font-bold uppercase tracking-wider py-3 disabled:opacity-60"
              >
                {authLoading ? 'Procesando...' : authMode === 'register' ? 'Crear cuenta' : 'Entrar'}
              </button>
            </form>
          ) : (
            <div className="bg-black/40 border border-white/10 p-6">
              <p className="text-gray-300 text-sm">
                Ya puedes agregar o quitar favoritos desde la seccion de modelos.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Favoritos cargando: {favoritesLoading ? 'si' : 'no'}
              </p>
            </div>
          )}
        </div>
      </section>

      <ModelShowcase
        models={models}
        favoriteIds={favoriteIds}
        isAuthenticated={Boolean(token)}
        isLoading={modelsLoading}
        actionLoadingId={favoriteActionLoadingId}
        onToggleFavorite={onToggleFavorite}
      />
      <Footer />
    </div>
  );
}

export default App;
