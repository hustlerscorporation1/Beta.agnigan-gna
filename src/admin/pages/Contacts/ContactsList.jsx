import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { Search, Mail, Phone, Calendar, Eye, Trash2, CheckCircle } from 'lucide-react';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);

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
      setContacts(data || []);
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

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        const { error } = await supabase
          .from('contacts')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchContacts();
        setSelectedContact(null);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du message');
      }
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages de Contact</h1>
          <p className="text-gray-600 mt-1">{contacts.length} messages au total</p>
        </div>
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
          </select>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-h-[600px] overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-green-50' : ''
                  } ${contact.status === 'unread' ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {contact.email}
                      </p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {contact.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    {contact.status === 'unread' && (
                      <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                Aucun message trouvé
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedContact.name}
                  </h2>
                  <div className="flex flex-col gap-2 mt-2">
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
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      {new Date(selectedContact.created_at).toLocaleString('fr-FR')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedContact.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(selectedContact.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Marquer comme lu"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Supprimer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Message</h3>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>

              {selectedContact.subject && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Sujet</h3>
                  <p className="text-gray-800">{selectedContact.subject}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Mail size={48} className="mx-auto mb-4 opacity-50" />
                <p>Sélectionnez un message pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
