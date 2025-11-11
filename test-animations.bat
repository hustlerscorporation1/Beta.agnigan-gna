@echo off
echo ========================================
echo Test des Animations - Page Terrain
echo ========================================
echo.
echo 1. Nettoyage du cache...
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache"
    echo Cache nettoye!
) else (
    echo Pas de cache a nettoyer.
)
echo.
echo 2. Build de production...
call npm run build
echo.
if errorlevel 1 (
    echo ERREUR: Le build a echoue!
    pause
    exit /b 1
)
echo.
echo ========================================
echo Build reussi!
echo ========================================
echo.
echo Pour tester localement:
echo 1. Installez 'serve' si ce n'est pas deja fait:
echo    npm install -g serve
echo.
echo 2. Lancez le serveur:
echo    npx serve -s build
echo.
echo 3. Ouvrez http://localhost:3000 dans votre navigateur
echo.
echo 4. Allez sur une page terrain (ex: /property/1)
echo.
echo 5. Verifiez que les animations fonctionnent:
echo    - Header anime
echo    - Galerie avec transitions
echo    - Cartes qui s'animent au scroll
echo    - Boutons avec effets hover
echo.
pause
