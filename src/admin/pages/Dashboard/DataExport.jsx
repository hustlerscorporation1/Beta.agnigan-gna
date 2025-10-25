import React, { useState } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { Download, FileText, Calendar, CheckCircle, Loader } from 'lucide-react';

const DataExport = () => {
  const [exporting, setExporting] = useState(false);
  const [exportType, setExportType] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      type: 'Données complètes',
      format: 'CSV',
      date: new Date().toISOString(),
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Utilisateurs',
      format: 'JSON',
      date: new Date(Date.now() - 86400000).toISOString(),
      size: '856 KB',
      status: 'completed'
    }
  ]);

  const handleExport = async (format = 'csv') => {
    setExporting(true);
    try {
      let data = {};

      // Récupérer les données selon le type
      if (exportType === 'all' || exportType === 'properties') {
        const { data: properties } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
        data.properties = properties || [];
      }

      if (exportType === 'all' || exportType === 'users') {
        const { data: users } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        data.users = users || [];
      }

      if (exportType === 'all' || exportType === 'contacts') {
        const { data: contacts } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false });
        data.contacts = contacts || [];
      }

      // Exporter selon le format
      if (format === 'csv') {
        exportToCSV(data);
      } else if (format === 'json') {
        exportToJSON(data);
      } else if (format === 'excel') {
        exportToExcel(data);
      }

      // Ajouter à l'historique
      const newExport = {
        id: Date.now(),
        type: exportType === 'all' ? 'Données complètes' : exportType,
        format: format.toUpperCase(),
        date: new Date().toISOString(),
        size: '1.2 MB',
        status: 'completed'
      };
      setExportHistory(prev => [newExport, ...prev]);

    } catch (error) {
      console.error('Erreur export:', error);
      alert('Erreur lors de l\'export');
    } finally {
      setExporting(false);
    }
  };

  const exportToCSV = (data) => {
    let csvContent = '';

    // Properties
    if (data.properties && data.properties.length > 0) {
      csvContent += '=== PROPRIETES ===\n';
      const propHeaders = Object.keys(data.properties[0]);
      csvContent += propHeaders.join(',') + '\n';
      data.properties.forEach(prop => {
        csvContent += propHeaders.map(key => JSON.stringify(prop[key] || '')).join(',') + '\n';
      });
      csvContent += '\n';
    }

    // Users
    if (data.users && data.users.length > 0) {
      csvContent += '=== UTILISATEURS ===\n';
      const userHeaders = Object.keys(data.users[0]);
      csvContent += userHeaders.join(',') + '\n';
      data.users.forEach(user => {
        csvContent += userHeaders.map(key => JSON.stringify(user[key] || '')).join(',') + '\n';
      });
      csvContent += '\n';
    }

    // Contacts
    if (data.contacts && data.contacts.length > 0) {
      csvContent += '=== CONTACTS ===\n';
      const contactHeaders = Object.keys(data.contacts[0]);
      csvContent += contactHeaders.join(',') + '\n';
      data.contacts.forEach(contact => {
        csvContent += contactHeaders.map(key => JSON.stringify(contact[key] || '')).join(',') + '\n';
      });
    }

    downloadFile(csvContent, `export-${Date.now()}.csv`, 'text/csv');
  };

  const exportToJSON = (data) => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `export-${Date.now()}.json`, 'application/json');
  };

  const exportToExcel = (data) => {
    // Simuler un export Excel (en réalité, c'est un CSV avec extension .xls)
    let content = '';
    
    if (data.properties) {
      content += 'PROPRIETES\n';
      const headers = Object.keys(data.properties[0] || {});
      content += headers.join('\t') + '\n';
      data.properties.forEach(prop => {
        content += headers.map(key => prop[key] || '').join('\t') + '\n';
      });
      content += '\n';
    }

    if (data.users) {
      content += 'UTILISATEURS\n';
      const headers = Object.keys(data.users[0] || {});
      content += headers.join('\t') + '\n';
      data.users.forEach(user => {
        content += headers.map(key => user[key] || '').join('\t') + '\n';
      });
    }

    downloadFile(content, `export-${Date.now()}.xls`, 'application/vnd.ms-excel');
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Export Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Exporter les Données</h2>
        
        <div className="space-y-4">
          {/* Type d'export */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de données à exporter
            </label>
            <select
              value={exportType}
              onChange={(e) => setExportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Toutes les données</option>
              <option value="properties">Propriétés uniquement</option>
              <option value="users">Utilisateurs uniquement</option>
              <option value="contacts">Contacts uniquement</option>
            </select>
          </div>

          {/* Plage de dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date début
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date fin
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Boutons d'export */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => handleExport('csv')}
              disabled={exporting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {exporting ? <Loader className="animate-spin" size={20} /> : <Download size={20} />}
              Exporter CSV
            </button>
            <button
              onClick={() => handleExport('json')}
              disabled={exporting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {exporting ? <Loader className="animate-spin" size={20} /> : <Download size={20} />}
              Exporter JSON
            </button>
            <button
              onClick={() => handleExport('excel')}
              disabled={exporting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {exporting ? <Loader className="animate-spin" size={20} /> : <Download size={20} />}
              Exporter Excel
            </button>
          </div>
        </div>
      </div>

      {/* Historique des exports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Historique des Exports</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {exportHistory.map((exp) => (
            <div key={exp.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{exp.type}</p>
                    <p className="text-xs text-gray-500">
                      Format: {exp.format} • Taille: {exp.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(exp.date).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-xs text-green-600 font-medium">Complété</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataExport;
