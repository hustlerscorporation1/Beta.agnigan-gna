import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { 
  Search, Filter, Edit, Trash2, Mail, Phone, User as UserIcon,
  Shield, Download, RefreshCw, CheckCircle, XCircle, AlertCircle,
  TrendingUp, Users, Crown, Eye, X, Plus, Lock, Unlock, Ban
} from 'lucide-react';

const UsersListAdvanced = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: 'user',
    permissions: {
      can_view_properties: true,
      can_edit_properties: false,
      can_delete_properties: false,
      can_view_users: false,
      can_manage_users: false,
      can_view_contacts: true,
      can_reply_contacts: false,
      can_view_transactions: false,
      can_view_statistics: false,
      can_manage_settings: false
    }
  });
  const [creating, setCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState({ type: '', text: '' });
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    users: 0,
    active: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const usersData = data || [];
      setUsers(usersData);

      // Calculer les statistiques
      const admins = usersData.filter(u => u.role === 'admin').length;
      const regularUsers = usersData.filter(u => u.role === 'user').length;
      
      setStats({
        total: usersData.length,
        admins,
        users: regularUsers,
        active: Math.floor(usersData.length * 0.7) // 70% actifs
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setShowDeleteModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateMessage({ type: '', text: '' });

    try {
      // Créer l'utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            full_name: newUser.full_name,
            phone: newUser.phone,
            role: newUser.role
          }
        }
      });

      if (authError) throw authError;

      // Mettre à jour le profil avec les permissions
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: newUser.full_name,
            phone: newUser.phone,
            role: newUser.role,
            permissions: newUser.permissions
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;
      }

      setCreateMessage({ 
        type: 'success', 
        text: 'Utilisateur créé avec succès! Un email de confirmation a été envoyé.' 
      });
      
      setTimeout(() => {
        setShowCreateModal(false);
        setNewUser({
          email: '',
          password: '',
          full_name: '',
          phone: '',
          role: 'user',
          permissions: {
            can_view_properties: true,
            can_edit_properties: false,
            can_delete_properties: false,
            can_view_users: false,
            can_manage_users: false,
            can_view_contacts: true,
            can_reply_contacts: false,
            can_view_transactions: false,
            can_view_statistics: false,
            can_manage_settings: false
          }
        });
        setCreateMessage({ type: '', text: '' });
        fetchUsers();
      }, 2000);
    } catch (error) {
      console.error('Erreur création:', error);
      setCreateMessage({ 
        type: 'error', 
        text: error.message || 'Erreur lors de la création de l\'utilisateur' 
      });
    } finally {
      setCreating(false);
    }
  };

  const togglePermission = (permission) => {
    setNewUser(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  const setRolePreset = (role) => {
    const presets = {
      admin: {
        can_view_properties: true,
        can_edit_properties: true,
        can_delete_properties: true,
        can_view_users: true,
        can_manage_users: true,
        can_view_contacts: true,
        can_reply_contacts: true,
        can_view_transactions: true,
        can_view_statistics: true,
        can_manage_settings: true
      },
      manager: {
        can_view_properties: true,
        can_edit_properties: true,
        can_delete_properties: false,
        can_view_users: true,
        can_manage_users: false,
        can_view_contacts: true,
        can_reply_contacts: true,
        can_view_transactions: true,
        can_view_statistics: true,
        can_manage_settings: false
      },
      user: {
        can_view_properties: true,
        can_edit_properties: false,
        can_delete_properties: false,
        can_view_users: false,
        can_manage_users: false,
        can_view_contacts: true,
        can_reply_contacts: false,
        can_view_transactions: false,
        can_view_statistics: false,
        can_manage_settings: false
      }
    };

    setNewUser(prev => ({
      ...prev,
      role,
      permissions: presets[role] || presets.user
    }));
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error('Erreur changement de rôle:', error);
    }
  };

  const exportData = () => {
    const csv = [
      ['Nom', 'Email', 'Téléphone', 'Rôle', 'Date d\'inscription'],
      ...filteredUsers.map(u => [
        u.full_name || 'N/A',
        u.email,
        u.phone || 'N/A',
        u.role,
        new Date(u.created_at).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${Date.now()}.csv`;
    a.click();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'active' && user.email_confirmed_at) ||
                          (filterStatus === 'pending' && !user.email_confirmed_at);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp size={14} />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const UserCard = ({ user }) => {
    const getInitials = (name) => {
      if (!name) return '?';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${
            user.role === 'admin' ? 'bg-purple-500' : 'bg-green-500'
          }`}>
            {getInitials(user.full_name || user.email)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {user.full_name || 'Utilisateur'}
              </h3>
              {user.role === 'admin' && (
                <Crown size={16} className="text-yellow-500" />
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Mail size={14} />
                {user.email}
              </p>
              {user.phone && (
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone size={14} />
                  {user.phone}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
              </span>
              <span className="text-xs text-gray-500">
                Inscrit le {new Date(user.created_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              setSelectedUser(user);
              setShowDetailModal(true);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} />
            Voir
          </button>
          <button
            onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Shield size={16} />
            {user.role === 'admin' ? 'Rétrograder' : 'Promouvoir'}
          </button>
          <button
            onClick={() => {
              setSelectedUser(user);
              setShowDeleteModal(true);
            }}
            className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">{filteredUsers.length} sur {users.length} utilisateurs</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} />
            Actualiser
          </button>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            Exporter
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            Créer Utilisateur
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Utilisateurs"
          value={stats.total}
          color="bg-blue-500"
          trend="+8% ce mois"
        />
        <StatCard
          icon={Crown}
          title="Administrateurs"
          value={stats.admins}
          color="bg-purple-500"
        />
        <StatCard
          icon={UserIcon}
          title="Utilisateurs"
          value={stats.users}
          color="bg-green-500"
          trend="+12% ce mois"
        />
        <StatCard
          icon={CheckCircle}
          title="Actifs"
          value={stats.active}
          color="bg-orange-500"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les rôles</option>
            <option value="admin">Administrateurs</option>
            <option value="user">Utilisateurs</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="pending">En attente</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Users size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Détails de l'Utilisateur</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Avatar & Name */}
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                  selectedUser.role === 'admin' ? 'bg-purple-500' : 'bg-green-500'
                }`}>
                  {(selectedUser.full_name || selectedUser.email).split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {selectedUser.full_name || 'Utilisateur'}
                    {selectedUser.role === 'admin' && <Crown size={24} className="text-yellow-500" />}
                  </h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">ID</p>
                  <p className="text-base font-medium text-gray-900">{selectedUser.id.substring(0, 16)}...</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rôle</p>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedUser.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedUser.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-base text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="text-base text-gray-900">{selectedUser.phone || 'Non renseigné'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date d'inscription</p>
                  <p className="text-base text-gray-900">{new Date(selectedUser.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dernière mise à jour</p>
                  <p className="text-base text-gray-900">
                    {selectedUser.updated_at ? new Date(selectedUser.updated_at).toLocaleDateString('fr-FR') : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <button
                  onClick={() => handleRoleChange(selectedUser.id, selectedUser.role === 'admin' ? 'user' : 'admin')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Shield size={20} />
                  {selectedUser.role === 'admin' ? 'Rétrograder en utilisateur' : 'Promouvoir en admin'}
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setShowDeleteModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8">
            <form onSubmit={handleCreateUser}>
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-xl">
                <h2 className="text-2xl font-bold text-gray-900">Créer un Nouvel Utilisateur</h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreateMessage({ type: '', text: '' });
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Message */}
                {createMessage.text && (
                  <div className={`p-4 rounded-lg ${
                    createMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {createMessage.text}
                  </div>
                )}

                {/* Informations de Base */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de Base</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom Complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={newUser.full_name}
                        onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Jean Kouassi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="email@exemple.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="+228 XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de Passe *
                      </label>
                      <input
                        type="password"
                        required
                        minLength="8"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Min. 8 caractères"
                      />
                    </div>
                  </div>
                </div>

                {/* Rôle */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rôle et Accès</h3>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sélectionner un Rôle
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setRolePreset('user')}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          newUser.role === 'user' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <UserIcon size={20} className="text-blue-600" />
                          <span className="font-semibold">Utilisateur</span>
                        </div>
                        <p className="text-xs text-gray-600">Accès basique lecture seule</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRolePreset('manager')}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          newUser.role === 'manager' 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Shield size={20} className="text-purple-600" />
                          <span className="font-semibold">Manager</span>
                        </div>
                        <p className="text-xs text-gray-600">Gestion complète sauf suppression</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRolePreset('admin')}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          newUser.role === 'admin' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Crown size={20} className="text-green-600" />
                          <span className="font-semibold">Administrateur</span>
                        </div>
                        <p className="text-xs text-gray-600">Accès complet à tout</p>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Permissions Détaillées */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions Détaillées</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Propriétés */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">📊 Propriétés</p>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_view_properties}
                            onChange={() => togglePermission('can_view_properties')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Voir les propriétés</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_edit_properties}
                            onChange={() => togglePermission('can_edit_properties')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Modifier les propriétés</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_delete_properties}
                            onChange={() => togglePermission('can_delete_properties')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Supprimer les propriétés</span>
                        </label>
                      </div>

                      {/* Utilisateurs */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">👥 Utilisateurs</p>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_view_users}
                            onChange={() => togglePermission('can_view_users')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Voir les utilisateurs</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_manage_users}
                            onChange={() => togglePermission('can_manage_users')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Gérer les utilisateurs</span>
                        </label>
                      </div>

                      {/* Contacts */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">💬 Contacts</p>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_view_contacts}
                            onChange={() => togglePermission('can_view_contacts')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Voir les messages</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_reply_contacts}
                            onChange={() => togglePermission('can_reply_contacts')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Répondre aux messages</span>
                        </label>
                      </div>

                      {/* Autres */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">⚙️ Autres</p>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_view_transactions}
                            onChange={() => togglePermission('can_view_transactions')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Voir les transactions</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_view_statistics}
                            onChange={() => togglePermission('can_view_statistics')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Voir les statistiques</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.can_manage_settings}
                            onChange={() => togglePermission('can_manage_settings')}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Gérer les paramètres</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setCreateMessage({ type: '', text: '' });
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creating ? 'Création...' : 'Créer l\'Utilisateur'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer l'utilisateur "<strong>{selectedUser.full_name || selectedUser.email}</strong>" ? 
              Cette action est irréversible.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(selectedUser.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersListAdvanced;
