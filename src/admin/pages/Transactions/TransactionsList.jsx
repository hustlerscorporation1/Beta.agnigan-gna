import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { 
  Search, Filter, Download, RefreshCw, TrendingUp, 
  DollarSign, CreditCard, Calendar, User, Home,
  CheckCircle, XCircle, Clock, Eye, FileText
} from 'lucide-react';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    totalAmount: 0
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      
      // Récupérer les transactions (créer cette table si nécessaire)
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          profiles (full_name, email),
          properties (title, price)
        `)
        .order('created_at', { ascending: false });

      if (error && error.code !== 'PGRST116') {
        console.error('Erreur:', error);
        // Utiliser des données de démonstration
        setTransactions(generateMockTransactions());
        calculateStats(generateMockTransactions());
      } else {
        const txData = data || generateMockTransactions();
        setTransactions(txData);
        calculateStats(txData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      const mockData = generateMockTransactions();
      setTransactions(mockData);
      calculateStats(mockData);
    } finally {
      setLoading(false);
    }
  };

  const generateMockTransactions = () => {
    const statuses = ['completed', 'pending', 'failed'];
    const types = ['purchase', 'deposit', 'withdrawal', 'commission'];
    const names = ['Jean Kouassi', 'Marie Amouzou', 'Paul Agbeko', 'Sarah Togo', 'David Koffi'];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: `tx-${i + 1}`,
      transaction_id: `TXN${Date.now()}${i}`,
      user_id: `user-${i}`,
      property_id: i % 2 === 0 ? `prop-${i}` : null,
      amount: Math.floor(Math.random() * 50000000) + 1000000,
      type: types[Math.floor(Math.random() * types.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      payment_method: ['card', 'mobile_money', 'bank_transfer'][Math.floor(Math.random() * 3)],
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: names[Math.floor(Math.random() * names.length)],
        email: `user${i}@example.com`
      },
      properties: i % 2 === 0 ? {
        title: `Terrain ${i}`,
        price: '5000000 FCFA'
      } : null
    }));
  };

  const calculateStats = (data) => {
    const completed = data.filter(t => t.status === 'completed').length;
    const pending = data.filter(t => t.status === 'pending').length;
    const failed = data.filter(t => t.status === 'failed').length;
    const totalAmount = data
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    setStats({
      total: data.length,
      completed,
      pending,
      failed,
      totalAmount
    });
  };

  const exportData = () => {
    const csv = [
      ['ID Transaction', 'Utilisateur', 'Montant', 'Type', 'Statut', 'Méthode', 'Date'],
      ...filteredTransactions.map(t => [
        t.transaction_id,
        t.profiles?.full_name || 'N/A',
        `${t.amount} FCFA`,
        t.type,
        t.status,
        t.payment_method,
        new Date(t.created_at).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${Date.now()}.csv`;
    a.click();
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesType = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
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
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    const labels = {
      completed: 'Complétée',
      pending: 'En attente',
      failed: 'Échouée'
    };
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getTypeLabel = (type) => {
    const labels = {
      purchase: 'Achat',
      deposit: 'Dépôt',
      withdrawal: 'Retrait',
      commission: 'Commission'
    };
    return labels[type] || type;
  };

  const getPaymentMethodLabel = (method) => {
    const labels = {
      card: 'Carte bancaire',
      mobile_money: 'Mobile Money',
      bank_transfer: 'Virement bancaire'
    };
    return labels[method] || method;
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Transactions</h1>
          <p className="text-gray-600 mt-1">{filteredTransactions.length} sur {transactions.length} transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchTransactions}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} />
            Actualiser
          </button>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            Exporter
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={CreditCard}
          title="Total Transactions"
          value={stats.total}
          color="bg-blue-500"
          subtitle="Toutes périodes"
        />
        <StatCard
          icon={CheckCircle}
          title="Complétées"
          value={stats.completed}
          color="bg-green-500"
          subtitle={`${((stats.completed / stats.total) * 100).toFixed(0)}% du total`}
        />
        <StatCard
          icon={Clock}
          title="En attente"
          value={stats.pending}
          color="bg-yellow-500"
        />
        <StatCard
          icon={DollarSign}
          title="Montant Total"
          value={`${(stats.totalAmount / 1000000).toFixed(1)}M`}
          color="bg-purple-500"
          subtitle="FCFA"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par ID, utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="completed">Complétées</option>
            <option value="pending">En attente</option>
            <option value="failed">Échouées</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les types</option>
            <option value="purchase">Achat</option>
            <option value="deposit">Dépôt</option>
            <option value="withdrawal">Retrait</option>
            <option value="commission">Commission</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CreditCard size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.transaction_id}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getPaymentMethodLabel(transaction.payment_method)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.profiles?.full_name || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.profiles?.email || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">
                        {transaction.amount.toLocaleString()} FCFA
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getTypeLabel(transaction.type)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <CreditCard size={48} className="mx-auto mb-2 text-gray-400" />
                    <p>Aucune transaction trouvée</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Détails de la Transaction</h2>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">ID Transaction</p>
                  <p className="text-base font-medium text-gray-900">{selectedTransaction.transaction_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  {getStatusBadge(selectedTransaction.status)}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Utilisateur</p>
                  <p className="text-base text-gray-900">{selectedTransaction.profiles?.full_name}</p>
                  <p className="text-sm text-gray-500">{selectedTransaction.profiles?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Montant</p>
                  <p className="text-xl font-bold text-green-600">{selectedTransaction.amount.toLocaleString()} FCFA</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="text-base text-gray-900">{getTypeLabel(selectedTransaction.type)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Méthode de paiement</p>
                  <p className="text-base text-gray-900">{getPaymentMethodLabel(selectedTransaction.payment_method)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-base text-gray-900">{new Date(selectedTransaction.created_at).toLocaleString('fr-FR')}</p>
                </div>
                {selectedTransaction.properties && (
                  <div>
                    <p className="text-sm text-gray-600">Propriété</p>
                    <p className="text-base text-gray-900">{selectedTransaction.properties.title}</p>
                    <p className="text-sm text-gray-500">{selectedTransaction.properties.price}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
