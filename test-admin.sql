-- ========================================
-- TEST DE CONNEXION ADMIN
-- ========================================

-- 1. Vérifier que l'utilisateur existe dans auth.users
DO $$
DECLARE
    user_count INTEGER;
    admin_count INTEGER;
    user_id UUID;
BEGIN
    -- Compter les utilisateurs avec cet email
    SELECT COUNT(*) INTO user_count
    FROM auth.users
    WHERE email = 'admin@anyigbanya.com';

    -- Compter les admins
    SELECT COUNT(*) INTO admin_count
    FROM profiles
    WHERE role = 'admin';

    -- Afficher les résultats
    RAISE NOTICE '=== DIAGNOSTIC ===';
    RAISE NOTICE 'Utilisateur dans auth.users: %', user_count;
    RAISE NOTICE 'Admins dans profiles: %', admin_count;

    -- Si pas d'utilisateur, message d'erreur
    IF user_count = 0 THEN
        RAISE NOTICE '❌ ERREUR: Utilisateur non trouvé dans auth.users';
        RAISE NOTICE '📝 SOLUTION: Créez l utilisateur dans Authentication → Users';
        RAISE NOTICE '   Email: admin@anyigbanya.com';
        RAISE NOTICE '   Password: Admin2024!';
        RAISE NOTICE '   Auto Confirm: OUI';
    ELSE
        RAISE NOTICE '✅ Utilisateur trouvé dans auth.users';

        -- Récupérer l'ID utilisateur
        SELECT id INTO user_id
        FROM auth.users
        WHERE email = 'admin@anyigbanya.com';

        RAISE NOTICE 'ID Utilisateur: %', user_id;
    END IF;

    -- Si pas d'admin, message d'erreur
    IF admin_count = 0 THEN
        RAISE NOTICE '❌ ERREUR: Aucun admin dans profiles';
        RAISE NOTICE '📝 SOLUTION: Exécutez UPDATE profiles SET role = admin WHERE email = admin@anyigbanya.com';
    ELSE
        RAISE NOTICE '✅ Admin trouvé dans profiles';
    END IF;

    -- Vérifier la correspondance
    IF user_count > 0 AND admin_count > 0 THEN
        RAISE NOTICE '🎉 CONFIGURATION CORRECTE !';
        RAISE NOTICE 'Vous pouvez vous connecter avec:';
        RAISE NOTICE 'Email: admin@anyigbanya.com';
        RAISE NOTICE 'Password: Admin2024!';
        RAISE NOTICE 'URL: http://localhost:3000/admin/login';
    END IF;

END $$;

-- 2. Afficher les détails complets
SELECT
    '=== AUTH USERS ===' as section,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
WHERE email = 'admin@anyigbanya.com'

UNION ALL

SELECT
    '=== PROFILES ===' as section,
    email,
    role,
    full_name,
    created_at
FROM profiles
WHERE email = 'admin@anyigbanya.com';

-- 3. Lister tous les admins
SELECT
    '=== TOUS LES ADMINS ===' as info,
    email,
    role,
    full_name
FROM profiles
WHERE role = 'admin';
