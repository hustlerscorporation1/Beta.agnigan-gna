import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { 
  Search, Mail, Phone, Calendar, Eye, Trash2, CheckCircle,
  Send, Download, RefreshCw, X, MessageSquare, User,
  Clock, Filter, Star, Archive, Reply, TrendingUp
} from 'lucide-react';

const ContactsListAdvanced = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    replied: 0,
    archived: 0
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const contactsData = data || [];
      setContacts(contactsData);

      // Calculer les statistiques
      const unread = contactsData.filter(c => c.status === 'unread').length;
      const replied = contactsData.filter(c => c.status === 'replied').length;
      const archived = contactsData.filter(c => c.status === 'archived').length;

      setStats({
        total: contactsData.length,
        unread,
        replied,
        archived
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      fetchContacts();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleMarkAsReplied = async (id) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: 'replied' })
        .eq('id', id);

      if (error) throw error;
      setShowReplyModal(false);
      setReplyMessage('');
      fetchContacts();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: 'archived' })
        .eq('id', id);

      if (error) throw error;
      fetchContacts();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        const { error } = await supabase
          .from('contacts')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setSelectedContact(null);
        fetchContacts();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const exportData = () => {
    const csv = [
      ['Nom', 'Email', 'Téléphone', 'Message', 'Statut', 'Date'],
      ...filteredContacts.map(c => [
        c.name,
        c.email,
        c.phone || 'N/A',
        c.message?.substring(0, 100),
        c.status,
        new Date(c.created_at).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${Date.now()}.csv`;
    a.click();
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || contact.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
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

  const getStatusBadge = (status) => {
    const styles = {
      unread: 'bg-blue-100 text-blue-800',
      read: 'bg-gray-100 text-gray-800',
      replied: 'bg-green-100 text-green-800',
      archived: 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
      unread: 'Non lu',
      read: 'Lu',
      replied: 'Répondu',
      archived: 'Archivé'
    };
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status] || styles.read}`}>
        {labels[status] || status}
      </span>
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
          <h1 className="text-2xl font-bold text-gray-900">Messages de Contact</h1>
          <p className="text-gray-600 mt-1">{filteredContacts.length} sur {contacts.length} messages</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchContacts}
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
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={MessageSquare}
          title="Total Messages"
          value={stats.total}
          color="bg-blue-500"
          trend="+23% ce mois"
        />
        <StatCard
          icon={Mail}
          title="Non lus"
          value={stats.unread}
          color="bg-red-500"
        />
        <StatCard
          icon={CheckCircle}
          title="Répondus"
          value={stats.replied}
          color="bg-green-500"
          trend="+15% ce mois"
        />
        <StatCard
          icon={Archive}
          title="Archivés"
          value={stats.archived}
          color="bg-yellow-500"
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
              placeholder="Rechercher un message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="unread">Non lu</option>
            <option value="read">Lu</option>
            <option value="replied">Répondu</option>
            <option value="archived">Archivé</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Toutes priorités</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-h-[700px] overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact);
                    if (contact.status === 'unread') {
                      handleMarkAsRead(contact.id);
                    }
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-green-50' : ''
                  } ${contact.status === 'unread' ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {contact.name}
                        </p>
                        {contact.status === 'unread' && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {contact.email}
                      </p>
                    </div>
                    {getStatusBadge(contact.status)}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {contact.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                    </p>
                    {contact.priority && (
                      <Star size={14} className={`${
                        contact.priority === 'high' ? 'text-red-500 fill-red-500' :
                        contact.priority === 'medium' ? 'text-yellow-500 fill-yellow-500' :
                        'text-gray-400'
                      }`} />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aucun message trouvé</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <User size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedContact.name}
                      </h2>
                      <p className="text-sm text-gray-600">{selectedContact.email}</p>
                    </div>
                  </div>
                  {getStatusBadge(selectedContact.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} />
                    {selectedContact.email}
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      {selectedContact.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    {new Date(selectedContact.created_at).toLocaleString('fr-FR')}
                  </div>
                  {selectedContact.property_id && (
                    <div className="text-sm text-gray-600">
                      🏠 Propriété: {selectedContact.property_id.substring(0, 8)}...
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                {selectedContact.subject && (
                  <div className="mb-4 pb-4 border-b">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Sujet</h3>
                    <p className="text-gray-900">{selectedContact.subject}</p>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {selectedContact.status !== 'replied' && (
                    <button
                      onClick={() => setShowReplyModal(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Reply size={20} />
                      Répondre
                    </button>
                  )}
                  {selectedContact.status !== 'archived' && (
                    <button
                      onClick={() => handleArchive(selectedContact.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Archive size={20} />
                      Archiver
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex items-center justify-center p-12">
              <div className="text-center text-gray-500">
                <MessageSquare size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Sélectionnez un message pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Répondre à {selectedContact.name}</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinataire
                </label>
                <input
                  type="email"
                  value={selectedContact.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre réponse
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows="8"
                  placeholder="Écrivez votre réponse ici..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleMarkAsReplied(selectedContact.id)}
                  disabled={!replyMessage.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                  Envoyer la réponse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsListAdvanced;
