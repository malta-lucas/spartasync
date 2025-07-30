import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, UserCheck, EyeOff } from "lucide-react";
import RightBar from "../components/layout/RightBar";
import * as usuariosService from "../services/usuariosService";
import { useBanner } from "../components/layout/BannerContext";

const papelLabel = papel =>
  papel ? papel.name : <span className="text-muted-foreground italic">Sem papel</span>;

function maskPhone(value) {
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 11);
  if (v.length <= 2) return v;
  if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return `(${v.slice(0, 2)}) ${v[2]}${v.slice(3, 7)}-${v.slice(7, 11)}`;
}
function validatePhone(phone) {
  return /^\(\d{2}\)\s?9\d{4}-\d{4}$/.test(phone);
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState("");
  const [rightbarOpen, setRightbarOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "123456",
    role: null,
    is_active: true,
  });
  const [roles, setRoles] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [editUserIsStaff, setEditUserIsStaff] = useState(false);
  const { showBanner } = useBanner();

  useEffect(() => {
    loadUsuarios();
    loadRoles();
  }, []);

  async function loadUsuarios() {
    const data = await usuariosService.listUsers();
    setUsuarios(data);
  }
  async function loadRoles() {
    const data = await usuariosService.listRoles?.() ?? [];
    setRoles(data);
  }

  function openCreateModal() {
    setModalMode("create");
    setEditId(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "123456",
      role: roles.length > 0 ? roles[0].id : null,
      is_active: true,
    });
    setRightbarOpen(true);
    setPhoneError("");
    setEditUserIsStaff(false);
  }

  function openEditModal(idx) {
    const u = usuarios[idx];
    setModalMode("edit");
    setEditId(u.id);
    setForm({
      name: u.name || "",
      email: u.email || "",
      phone: maskPhone(u.phone || ""),
      password: "", // Não exibe senha na edição
      role: u.role?.id || null,
      is_active: !!u.is_active,
    });
    setRightbarOpen(true);
    setPhoneError("");
    setEditUserIsStaff(!!u.is_staff);
  }

  async function handleSaveUsuario() {
    if (!form.name.trim()) {
      showBanner("error", "Nome do usuário é obrigatório!");
      return;
    }
    if (!validatePhone(form.phone)) {
      setPhoneError("Telefone deve ser no formato (00) 98765-4321");
      return;
    }
    setPhoneError("");
    const payload = {
      name: form.name,
      email: form.email,
      username: form.email,
      phone: form.phone.replace(/\D/g, ""),
      role: form.role,
      is_active: form.is_active,
    };
    // Só manda senha se estiver criando
    if (modalMode === "create") payload.password = form.password;

    try {
      if (modalMode === "create") {
        await usuariosService.createUser(payload);
        showBanner("success", "Usuário criado com sucesso!");
      } else if (modalMode === "edit" && editId) {
        await usuariosService.updateUser(editId, payload);
        showBanner("success", "Usuário atualizado!");
      }
      closeRightbar();
      await loadUsuarios();
    } catch (err) {
      let msg = "Erro ao salvar usuário.";
      if (err?.response?.data?.name?.length)
        msg = err.response.data.name.join(" ");
      showBanner("error", msg);
    }
  }

  async function handleDeleteUsuario() {
    if (editUserIsStaff) {
      showBanner("error", "Usuário administrador não pode ser excluído!");
      setShowDelete(false);
      return;
    }
    if (editId) {
      await usuariosService.deleteUser(editId);
      setShowDelete(false);
      closeRightbar();
      await loadUsuarios();
      showBanner("success", "Usuário excluído!");
    }
  }

  function closeRightbar() {
    setRightbarOpen(false);
    setEditId(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "123456",
      role: roles.length > 0 ? roles[0].id : null,
      is_active: true,
    });
    setPhoneError("");
    setEditUserIsStaff(false);
  }

  const filteredUsuarios = usuarios.filter(u =>
    (u.name?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
    (u.email?.toLowerCase() ?? "").includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Usuários</h1>
          <p className="text-muted-foreground mt-1">
            Cadastre e gerencie usuários da sua empresa.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Usuário</span>
        </button>
      </div>

      {/* Busca/filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Tabela visual */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">E-mail</th>
              <th className="px-4 py-2 text-left">Telefone</th>
              <th className="px-4 py-2 text-left">Papel</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted-foreground py-8">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
            {filteredUsuarios.map((u, idx) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2 font-medium">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{maskPhone(u.phone ?? "")}</td>
                <td className="px-4 py-2">{papelLabel(u.role)}</td>
                <td className="px-4 py-2 text-center">
                  {u.is_active ? (
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Ativo</span>
                  ) : (
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">Inativo</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-1 justify-center">
                  <button
                    className="p-2 rounded hover:bg-accent"
                    onClick={() => openEditModal(idx)}
                    title="Editar"
                  >
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </button>
                  {!u.is_staff && (
                    <button
                      className="p-2 rounded hover:bg-accent"
                      onClick={() => {
                        setEditId(u.id);
                        setShowDelete(true);
                        setEditUserIsStaff(false);
                      }}
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RightBar Drawer */}
      <RightBar
        open={rightbarOpen}
        onClose={closeRightbar}
        title={modalMode === "edit" ? "Editar Usuário" : "Novo Usuário"}
        footer={
          <div className="flex space-x-3">
            {modalMode === "edit" && !editUserIsStaff && (
              <button
                onClick={() => setShowDelete(true)}
                className="flex-1 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
              >
                Excluir
              </button>
            )}
            <button
              onClick={closeRightbar}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveUsuario}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              disabled={!form.name.trim() || !form.email.trim() || !!phoneError}
            >
              {modalMode === "edit" ? "Salvar" : "Criar"}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nome</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
            <input
              type="text"
              value={form.phone}
              onChange={e => {
                const masked = maskPhone(e.target.value);
                setForm(f => ({ ...f, phone: masked }));
                if (masked.length >= 15 && !validatePhone(masked)) setPhoneError("Telefone inválido!");
                else setPhoneError("");
              }}
              placeholder="(00) 98765-4321"
              maxLength={15}
              className={`w-full px-3 py-2 bg-background border ${phoneError ? "border-red-500" : "border-border"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {phoneError && <div className="text-xs text-red-500 mt-1">{phoneError}</div>}
          </div>

          {modalMode === "create" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Senha padrão
                <span className="ml-1 text-muted-foreground">(o usuário pode trocar ao logar)</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={form.password}
                  disabled
                  readOnly
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none text-gray-300"
                  style={{ background: "#f7f7fa" }}
                />
                <EyeOff className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 w-5 h-5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Papel (hierarquia)</label>
            <select
              value={form.role || ""}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={form.is_active ? "1" : "0"}
              onChange={e => setForm(f => ({ ...f, is_active: e.target.value === "1" }))}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
            </select>
          </div>
        </div>
      </RightBar>

      {/* Modal Confirmar Exclusão */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Excluir Usuário</h3>
            {editUserIsStaff ? (
              <p className="text-red-500 mb-6">Usuário administrador não pode ser excluído!</p>
            ) : (
              <p className="text-muted-foreground mb-6">
                Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
              </p>
            )}
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent"
              >
                Cancelar
              </button>
              {!editUserIsStaff && (
                <button
                  onClick={handleDeleteUsuario}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Excluir
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
