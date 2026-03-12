type AuthViewProps = {
  authMode: 'login' | 'register';
  email: string;
  password: string;
  name: string;
  authLoading: boolean;
  authError: string | null;
  onChangeMode: (mode: 'login' | 'register') => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBackHome: () => void;
};

const AuthView = ({
  authMode,
  email,
  password,
  name,
  authLoading,
  authError,
  onChangeMode,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onSubmit,
  onBackHome,
}: AuthViewProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,128,0,0.2),transparent_30%),radial-gradient(circle_at_85%_85%,rgba(255,255,255,0.08),transparent_28%)]" />

      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
          <div>
            <p className="text-[#FF8000] text-xs tracking-[0.25em] uppercase font-bold mb-4">WebMclaren Account</p>
            <h1 className="text-4xl md:text-5xl font-bold uppercase italic tracking-tight leading-tight">
              Accede a tu
              <br />
              garaje digital
            </h1>
            <p className="text-gray-300 mt-5 leading-relaxed max-w-md">
              Inicia sesion para guardar tus modelos favoritos y consultar rapidamente tu seleccion personal.
            </p>
          </div>

          <button
            onClick={onBackHome}
            className="mt-10 self-start text-xs uppercase tracking-widest border border-white/25 px-4 py-2 hover:border-[#FF8000] hover:text-[#FF8000] transition-colors"
          >
            Volver al inicio
          </button>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChangeMode('login')}
                className={`flex-1 py-2 text-sm uppercase tracking-wider border ${authMode === 'login' ? 'border-[#FF8000] text-[#FF8000]' : 'border-white/20 text-gray-300'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => onChangeMode('register')}
                className={`flex-1 py-2 text-sm uppercase tracking-wider border ${authMode === 'register' ? 'border-[#FF8000] text-[#FF8000]' : 'border-white/20 text-gray-300'}`}
              >
                Registro
              </button>
            </div>

            {authMode === 'register' ? (
              <input
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                type="text"
                placeholder="Nombre (opcional)"
                className="w-full bg-black border border-white/20 px-4 py-3 text-sm outline-none focus:border-[#FF8000]"
              />
            ) : null}

            <input
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full bg-black border border-white/20 px-4 py-3 text-sm outline-none focus:border-[#FF8000]"
            />

            <input
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
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
        </div>
      </div>
    </section>
  );
};

export default AuthView;
