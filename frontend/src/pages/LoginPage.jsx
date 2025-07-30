import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/authService";
import { ShieldCheck, LogIn, Eye, EyeOff, Building2, Loader2 } from "lucide-react";
import { useAuth } from "../App";
import { useBanner } from "../components/layout/BannerContext";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { doLogin, user } = useAuth();
  const { showBanner } = useBanner();

  const [form, setForm] = useState({ company: "", identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Se já autenticado, redireciona
  useEffect(() => {
    console.log("LoginPage useEffect: user", user); // ADICIONE ESSE LOG!
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login({
        company: form.company,
        username: form.identifier,
        password: form.password,
      });
      doLogin({ user: response.user, token: response.token });
      showBanner("success", "Login realizado com sucesso!");
      // useEffect irá redirecionar
    } catch (err) {
      showBanner("error", "Dados inválidos. Verifique a empresa, e-mail/telefone e senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-300/40 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-border flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-6 w-full">
          <ShieldCheck className="h-10 w-10 text-green-600 mb-2" />
          <h2 className="text-3xl font-extrabold text-green-700 mb-1 text-center">
            Acesse sua Conta
          </h2>
          <span className="text-gray-600 text-sm text-center">
            Digite sua empresa, e-mail ou telefone e senha para acessar seu painel.
          </span>
        </div>
        <div className="mb-4 w-full">
          <label className="block font-semibold mb-1 text-gray-800 flex items-center gap-1">
            <Building2 className="w-4 h-4 text-green-600" />
            Empresa
          </label>
          <input
            type="text"
            name="company"
            placeholder="Nome da empresa"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            value={form.company}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block font-semibold mb-1 text-gray-800">
            E-mail ou Telefone
          </label>
          <input
            type="text"
            name="identifier"
            placeholder="E-mail ou telefone"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            value={form.identifier}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-6 w-full relative">
          <label className="block font-semibold mb-1 text-gray-800">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Sua senha"
              className="w-full border rounded-lg p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 cursor-pointer"
              tabIndex={-1}
              onClick={() => setShowPass((v) => !v)}
            >
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 text-lg hover:bg-green-700 transition"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogIn className="h-5 w-5" />
          )}
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <p className="text-center mt-6 text-sm text-gray-600">
          Não tem conta?{" "}
          <button
            type="button"
            className="text-green-700 underline font-semibold cursor-pointer hover:text-green-900 transition"
            onClick={() => navigate("/subscribe-company")}
          >
            Crie sua empresa gratuitamente
          </button>
        </p>
        <p className="text-center mt-3 text-xs text-gray-500">
          Problemas para entrar?{" "}
          <a
            className="underline cursor-pointer hover:text-green-700 transition"
            href="#"
          >
            Fale com o suporte
          </a>
        </p>
      </form>
    </div>
  );
}
