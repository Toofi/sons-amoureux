# Sons amoureux

Petite PWA Angular pour s'entraîner à lire les **sons amoureux** (ou, on, an, ch, ill…) avec des cartes façon Anki.

- Les cartes sont mélangées. **Je sais !** retire la carte du paquet. **À revoir** la remet plus loin dans le paquet (au moins 2 cartes avant de la revoir).
- Le haut-parleur 🔊 fait dire le son par la synthèse vocale du navigateur. Toucher un mot exemple le fait lire.
- Le paquet se filtre par famille (voyelles, consonnes, sons mouillés, bonus) ou son par son. Les réglages sont gardés sur l'appareil.
- Deux modes : **Entraînement** (on lit, puis on retourne la carte) et **Découverte** (tout est visible).
- À la fin, l'écran récapitule les sons qui ont demandé plus d'essais et propose de rejouer seulement ceux-là.

## Développement

```bash
npm ci
npm start          # http://localhost:4200
npm test -- --watch=false
npm run build
```

Il faut Node ≥ 24.15 (voir `.nvmrc`).

## Ajouter ou corriger un son

Tout se trouve dans [`src/app/data/sons.ts`](src/app/data/sons.ts) :

| Champ | Rôle |
|---|---|
| `graphemes` | Les écritures du son (`['on', 'om']`) |
| `sound` | Comment ça se dit, affiché sur la carte |
| `say` | Texte lu par la synthèse vocale. C'est une orthographe adaptée, parce que les voix lisent mal certains sons isolés (« ch » épelé, « eu » lu [u]). Corrigez ce champ si une voix prononce mal un son. |
| `examples` | Les mots exemples, avec le son entre crochets : `l[ou]p` |

## Voix

L'app choisit d'abord une voix `fr-BE`, puis `fr-FR`, en privilégiant les voix « naturelles ». La voix et la vitesse se changent dans les réglages. Sur Windows, Edge propose les meilleures voix françaises (« Microsoft … Online (Natural) »). Sur iPad, Réglages → Accessibilité → Contenu énoncé → Voix permet de télécharger une voix « améliorée ».

## Déploiement

GitHub Actions (`.github/workflows/ci-cd.yml`) lance les tests et le build sur chaque PR. Sur `main`, il déploie aussi sur GitHub Pages. Le `--base-href` est calculé à partir du nom du repo.

Une seule fois : Settings → Pages → Source : **GitHub Actions**.
