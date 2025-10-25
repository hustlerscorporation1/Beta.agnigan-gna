-- ========================================
-- TABLES POUR LE DASHBOARD ADMINISTRATIF
-- ========================================

-- Table pour les logs système
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('error', 'warning', 'info', 'success')),
  action TEXT NOT NULL,
  user_email TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address TEXT,
  details TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_system_logs_type ON system_logs(type);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_logs_user_id ON system_logs(user_id);

-- Table pour la configuration système
CREATE TABLE IF NOT EXISTS system_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT DEFAULT 'Agnigban Gna',
  site_email TEXT,
  site_phone TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  smtp_host TEXT,
  smtp_port TEXT,
  smtp_user TEXT,
  smtp_password TEXT,
  db_backup_enabled BOOLEAN DEFAULT true,
  db_backup_frequency TEXT DEFAULT 'daily',
  db_max_connections TEXT DEFAULT '100',
  password_min_length TEXT DEFAULT '8',
  session_timeout TEXT DEFAULT '30',
  max_login_attempts TEXT DEFAULT '5',
  two_factor_enabled BOOLEAN DEFAULT false,
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,
  push_notifications BOOLEAN DEFAULT true,
  api_rate_limit TEXT DEFAULT '1000',
  api_key_rotation_days TEXT DEFAULT '90',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_by UUID REFERENCES auth.users(id)
);

-- Insérer une configuration par défaut
INSERT INTO system_config (site_name, site_email, site_phone)
VALUES ('Agnigban Gna', 'contact@agnigbangna.com', '+228 XX XX XX XX')
ON CONFLICT DO NOTHING;

-- Table pour les activités (si elle n'existe pas déjà)
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('user', 'property', 'message', 'system')),
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index pour les activités
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);

-- Table pour les exports de données
CREATE TABLE IF NOT EXISTS data_exports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  export_type TEXT NOT NULL,
  format TEXT NOT NULL,
  file_path TEXT,
  file_size BIGINT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  exported_by UUID REFERENCES auth.users(id),
  exported_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

-- Ajouter la colonne views aux propriétés si elle n'existe pas
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'properties' AND column_name = 'views'
  ) THEN
    ALTER TABLE properties ADD COLUMN views INTEGER DEFAULT 0;
  END IF;
END $$;

-- Fonction pour logger les actions
CREATE OR REPLACE FUNCTION log_action(
  p_type TEXT,
  p_action TEXT,
  p_user_email TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_details TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO system_logs (type, action, user_email, user_id, details)
  VALUES (p_type, p_action, p_user_email, p_user_id, p_details)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour enregistrer les activités
CREATE OR REPLACE FUNCTION record_activity(
  p_type TEXT,
  p_title TEXT,
  p_description TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO activities (type, title, description, user_id)
  VALUES (p_type, p_title, p_description, p_user_id)
  RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour logger la création de propriétés
CREATE OR REPLACE FUNCTION log_property_creation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM record_activity(
    'property',
    'Nouvelle propriété ajoutée',
    NEW.title || ' à ' || COALESCE(NEW.location, 'localisation inconnue'),
    NEW.user_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_log_property_creation ON properties;
CREATE TRIGGER trigger_log_property_creation
  AFTER INSERT ON properties
  FOR EACH ROW
  EXECUTE FUNCTION log_property_creation();

-- Trigger pour logger la création d'utilisateurs
CREATE OR REPLACE FUNCTION log_user_creation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM record_activity(
    'user',
    'Nouvel utilisateur inscrit',
    COALESCE(NEW.full_name, NEW.email) || ' s''est inscrit',
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_log_user_creation ON profiles;
CREATE TRIGGER trigger_log_user_creation
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION log_user_creation();

-- Trigger pour logger les nouveaux messages
CREATE OR REPLACE FUNCTION log_contact_creation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM record_activity(
    'message',
    'Nouveau message reçu',
    'Message de ' || NEW.name || ' (' || NEW.email || ')',
    NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_log_contact_creation ON contacts;
CREATE TRIGGER trigger_log_contact_creation
  AFTER INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION log_contact_creation();

-- Fonction pour nettoyer les vieux logs (garder 90 jours)
CREATE OR REPLACE FUNCTION cleanup_old_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM system_logs
  WHERE created_at < NOW() - INTERVAL '90 days';
  
  DELETE FROM activities
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Permissions RLS (Row Level Security)
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_exports ENABLE ROW LEVEL SECURITY;

-- Politiques pour les admins uniquement
CREATE POLICY "Admins can view logs" ON system_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage config" ON system_config
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can view activities" ON activities
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage exports" ON data_exports
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Créer quelques logs de démonstration
INSERT INTO system_logs (type, action, user_email, details)
VALUES 
  ('info', 'Démarrage du système', 'system@agnigbangna.com', 'Le système a démarré avec succès'),
  ('success', 'Configuration mise à jour', 'admin@anyigbanya.com', 'Configuration SMTP mise à jour'),
  ('warning', 'Tentative de connexion échouée', 'user@example.com', 'Mot de passe incorrect'),
  ('info', 'Backup automatique', 'system@agnigbangna.com', 'Backup de la base de données effectué')
ON CONFLICT DO NOTHING;

-- Afficher un résumé
SELECT 
  '✅ Tables créées avec succès' as status,
  (SELECT COUNT(*) FROM system_logs) as logs_count,
  (SELECT COUNT(*) FROM activities) as activities_count,
  (SELECT COUNT(*) FROM system_config) as config_count;
