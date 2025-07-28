import React, { useState } from 'react';
import { registerCompany } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, UserPlus, Phone } from 'lucide-react';

// Máscara simples de telefone BR
function formatPhone(phone) {
  return phone
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

const companyTypes = [
  "Tecnologia", "Comércio", "Engenharia", "Consultoria", "Saúde", "Educação", "Logística",
  "Marketing", "Imobiliária", "Jurídico", "Finanças", "Contabilidade", "Alimentício",
  "Construção", "Varejo", "Atacado", "Indústria", "Transportes", "TI/Software",
  "Arquitetura", "Agropecuária", "Serviços", "Hotelaria", "Moda", "Energia", "Automotivo",
  "Publicidade", "Artes", "Eventos", "Outro"
];

// Componente customizado de checkbox com fundo verde e animação
function CustomCheckbox({ checked, onChange, id, children, required }) {
  return (
    <label className="flex items-center cursor-pointer select-none gap-2 group relative">
      {/* Checkbox real mas visualmente escondido */}
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="peer absolute opacity-0 w-5 h-5 z-10 cursor-pointer"
        style={{ marginLeft: 0 }}
        tabIndex={0}
      />
      <span
        className={`
          flex items-center justify-center
          w-5 h-5 rounded-md border-2 transition-colors duration-150
          ${checked ? 'bg-green-600 border-green-600' : 'bg-white border-gray-300'}
          group-hover:border-green-700
        `}
        style={{ minWidth: 20, minHeight: 20, pointerEvents: 'none' }}
      >
        {checked && (
          <svg className="w-3.5 h-3.5 text-white pointer-events-none" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7.5L6 10.5L11 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-sm group-hover:text-green-800 transition">{children}</span>
    </label>
  );
}

export function SubscribeCompanyPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company_name: '',
    company_type: '',
    admin_email: '',
    admin_phone: '',
    password: '',
    confirm_password: '',
    accept_terms: false,
    accept_promo: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === 'admin_phone') {
      setForm((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.accept_terms) {
      setError('Você deve aceitar os Termos de Uso e Privacidade.');
      return;
    }
    if (form.password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (form.password !== form.confirm_password) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await registerCompany({
        company_name: form.company_name,
        company_type: form.company_type,
        admin_email: form.admin_email,
        admin_phone: form.admin_phone,
        password: form.password,
        accept_promo: form.accept_promo,
      });
      setSuccess('Cadastro realizado! Agora é só fazer login.');
      setTimeout(() => navigate('/login'), 1800);
    } catch {
      setError('Não foi possível criar sua empresa. Tente novamente.');
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
          <Building2 className="h-10 w-10 text-green-600 mb-2" />
          <h2 className="text-3xl font-extrabold text-green-700 mb-1 text-center">
            Criar sua Conta
          </h2>
          <span className="text-gray-600 text-sm text-center">
            Cadastre sua empresa e admin principal para começar a usar o Sparta Sync.
          </span>
        </div>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 w-full text-center rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 w-full text-center rounded-lg">
            {success}
          </div>
        )}
        <div className="mb-4 w-full">
          <label className="block font-semibold mb-1 text-gray-800">Nome da empresa</label>
          <input
            name="company_name"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            value={form.company_name}
            onChange={handleChange}
            required
            placeholder="Ex: Sparta Tecnologia"
            autoFocus
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block font-semibold mb-1 text-gray-800">Tipo de empresa</label>
          <select
            name="company_type"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition bg-white"
            value={form.company_type}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            {companyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block font-semibold mb-1 text-gray-800">E-mail do administrador</label>
          <input
            name="admin_email"
            type="email"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            value={form.admin_email}
            onChange={handleChange}
            required
            placeholder="admin@email.com"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block font-semibold mb-1 text-gray-800">Telefone do administrador</label>
          <div className="relative">
            <input
              name="admin_phone"
              type="tel"
              className="w-full border rounded-lg p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              value={form.admin_phone}
              onChange={handleChange}
              required
              maxLength={15}
              placeholder="(99) 99999-9999"
            />
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 w-5 h-5 pointer-events-none" />
          </div>
        </div>
        <div className="mb-4 w-full relative">
          <label className="block font-semibold mb-1 text-gray-800">Senha</label>
          <div className="relative">
            <input
              name="password"
              type={showPass ? 'text' : 'password'}
              className="w-full border rounded-lg p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Mínimo 8 caracteres"
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
        <div className="mb-4 w-full relative">
          <label className="block font-semibold mb-1 text-gray-800">Confirmar senha</label>
          <div className="relative">
            <input
              name="confirm_password"
              type={showPass2 ? 'text' : 'password'}
              className="w-full border rounded-lg p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              value={form.confirm_password}
              onChange={handleChange}
              required
              placeholder="Repita a senha"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 cursor-pointer"
              tabIndex={-1}
              onClick={() => setShowPass2((v) => !v)}
            >
              {showPass2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full mb-4">
          <CustomCheckbox
            checked={form.accept_promo}
            onChange={handleChange}
            id="accept_promo"
          >
            Desejo receber promoções e atualizações por e-mail
          </CustomCheckbox>
          <CustomCheckbox
            checked={form.accept_terms}
            onChange={handleChange}
            id="accept_terms"
            required
          >
            Li e aceito os{' '}
            <a
              href="#"
              className="text-green-700 underline mx-1 cursor-pointer hover:text-green-900 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Termos de Uso
            </a>
            {' e '}
            <a
              href="#"
              className="text-green-700 underline mx-1 cursor-pointer hover:text-green-900 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </a>
          </CustomCheckbox>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 text-lg hover:bg-green-700 transition"
        >
          <UserPlus className="h-5 w-5" />
          {loading ? 'Criando...' : 'Cadastrar empresa'}
        </button>
        <p className="text-center mt-6 text-sm text-gray-600">
          Já tem uma conta?{' '}
          <button
            type="button"
            className="text-green-700 underline font-semibold cursor-pointer hover:text-green-900 transition"
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>
        </p>
        <p className="text-center mt-3 text-xs text-gray-500">
          Está com problemas?{' '}
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
