# 🎨 Guide des Thèmes - Cosma Tattoo

## Système de Thèmes Implémenté

Le site dispose maintenant d'un système de thèmes de couleurs avec **6 thèmes différents** :

### 1. **Dark** (Par défaut)
- Primary: `#0a1128` - Navy foncé
- Secondary: `#1e3a5f` - Bleu accent
- Accent: `#d4af37` - Or
- Background: `#0f172a` - Fond sombre
- Foreground: `#f8fafc` - Texte clair

### 2. **Light**
- Primary: `#1e40af` - Bleu
- Secondary: `#3b82f6` - Bleu clair
- Accent: `#f59e0b` - Orange
- Background: `#ffffff` - Blanc
- Foreground: `#1f2937` - Texte foncé

### 3. **Ocean**
- Primary: `#0c4a6e` - Bleu océan foncé
- Secondary: `#0284c7` - Bleu océan
- Accent: `#06b6d4` - Cyan
- Background: `#082f49` - Fond bleu foncé
- Foreground: `#e0f2fe` - Texte bleu clair

### 4. **Purple**
- Primary: `#581c87` - Violet foncé
- Secondary: `#7e22ce` - Violet
- Accent: `#c084fc` - Violet clair
- Background: `#1e1b4b` - Fond violet foncé
- Foreground: `#f5f3ff` - Texte violet clair

### 5. **Forest**
- Primary: `#14532d` - Vert forêt foncé
- Secondary: `#166534` - Vert forêt
- Accent: `#84cc16` - Vert lime
- Background: `#052e16` - Fond vert foncé
- Foreground: `#f0fdf4` - Texte vert clair

### 6. **Sunset**
- Primary: `#7c2d12` - Rouge-orange foncé
- Secondary: `#dc2626` - Rouge
- Accent: `#fb923c` - Orange
- Background: `#450a0a` - Fond rouge foncé
- Foreground: `#fef2f2` - Texte rose clair

## 📁 Fichiers Créés

### 1. **ThemeContext.js** ([src/contexts/ThemeContext.js](src/contexts/ThemeContext.js))
Context React qui gère :
- Les 6 thèmes disponibles
- Le thème actuel
- La fonction pour changer de thème
- Sauvegarde dans localStorage
- Application des variables CSS

### 2. **ThemeSelector.js** ([src/components/ThemeSelector.js](src/components/ThemeSelector.js))
Composant UI pour :
- Afficher l'icône du thème actuel
- Ouvrir un menu déroulant avec tous les thèmes
- Prévisualiser les couleurs de chaque thème
- Sélectionner un nouveau thème

### 3. **globals.css** (Mis à jour)
Variables CSS dynamiques :
```css
:root {
  --color-primary
  --color-secondary
  --color-accent
  --color-background
  --color-foreground
}
```

### 4. **Providers.js** (Mis à jour)
Intégration du ThemeProvider avec SessionProvider

## 🚀 Utilisation

### Changer de thème
1. Cliquez sur l'icône de thème dans la navigation (en haut à droite)
2. Un menu s'ouvre avec les 6 thèmes disponibles
3. Chaque thème affiche un aperçu de ses 4 couleurs principales
4. Cliquez sur le thème désiré
5. Le thème est appliqué instantanément et sauvegardé

### Dans le code
```javascript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { currentTheme, changeTheme, themes } = useTheme();

  // Changer le thème
  changeTheme('ocean');

  // Obtenir le thème actuel
  console.log(currentTheme); // 'dark', 'light', 'ocean', etc.
}
```

## 🎯 Mise à jour des Pages

Pour ajouter le ThemeSelector sur une page :

1. **Importer le composant**
```javascript
import ThemeSelector from '@/components/ThemeSelector';
```

2. **Remplacer le toggle dark mode**
```javascript
// Avant
<button onClick={() => setDarkMode(!darkMode)}>...</button>

// Après
<ThemeSelector />
```

3. **Supprimer le state darkMode**
```javascript
// Supprimer
const [darkMode, setDarkMode] = useState(false);

// Supprimer aussi le useEffect
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
```

## 📍 Pages à mettre à jour

- ✅ [src/app/page.js](src/app/page.js) - Page principale
- ⏳ [src/app/portfolio/page.js](src/app/portfolio/page.js)
- ⏳ [src/app/dessins/page.js](src/app/dessins/page.js)
- ⏳ [src/app/admin/page.js](src/app/admin/page.js)
- ⏳ [src/app/admin/images/page.js](src/app/admin/images/page.js)
- ⏳ [src/app/admin/drawings/page.js](src/app/admin/drawings/page.js)

## 💡 Avantages

1. **Persistance** : Le thème choisi est sauvegardé dans localStorage
2. **Performance** : Variables CSS natives, pas de re-render complet
3. **Extensible** : Facile d'ajouter de nouveaux thèmes
4. **UX** : Prévisualisation des couleurs avant sélection
5. **Responsive** : Fonctionne sur desktop et mobile

## 🔧 Ajouter un nouveau thème

Dans [src/contexts/ThemeContext.js](src/contexts/ThemeContext.js) :

```javascript
export const themes = {
  // ... thèmes existants
  monTheme: {
    name: 'Mon Thème',
    colors: {
      primary: '#000000',
      secondary: '#111111',
      accent: '#222222',
      background: '#333333',
      foreground: '#ffffff',
    }
  }
};
```

Ajouter l'icône dans [src/components/ThemeSelector.js](src/components/ThemeSelector.js).
