# GK2-Oct.2025
Denne iteration bygger videre på GK1 og fokuserer på **nye knapper, nye screens, navigation, ny funktionalitet (mobil features) samt vedvarende data**.

---

## ✅ 1–2 nye knapper (brugerkontrol/handlinger)

**Nyt i GK2**
- **“Se kort”**-knap på hver venue-kort  
  - **Hvor**: `screens/SportFritid/FacilityDetailsScreen.js`  
  - **Gør**: Åbner **MapScreen** og centrerer på valgt venue  
    `navigation.navigate('Map', { focusVenueId })`
- **Filter-bar kontroller** (maks pris, afstand, by, sortering)  
  - **Hvor**: `components/FilterBar.js`  
  - **Gør**: Opdaterer filter-state i context (`store/filters.js`), så venuelisten ændres live

> Eksisterende knapper fra GK1 (fx **Bekræft booking**, **Slet booking**) er bevaret. De to ovenfor er **nye**.

---

## ✅ 2 nye screens (min. 5 i alt)

**Nye/udvidede i GK2**
1. **MapScreen (NY)**  
   - **Fil**: `screens/SportFritid/MapScreen.js`  
   - **Indhold**: `react-native-maps` med pins for alle venues; kan fokusere på et specifikt venue via “Se kort”
2. **ProfileScreen (udvidet til dashboard)**  
   - **Fil**: `screens/SportFritid/ProfileScreen.js`  
   - **Indhold**: små **statistikker** (antal bookinger, kommende, timer, est. forbrug) + **seneste 5 bookinger** (fra lokal lagring)

**Samlet antal skærme (eksempel)**
- `ExploreScreen` (sportvalg)  
- `FacilityDetailsScreen` (venueliste + filter + “Se kort”)  
- `BookingScreen` (dato/tid + bekræft)  
- `PreviousScreen` (Mine bookinger)  
- `ProfileScreen` (dashboard – udvidet)  
- `MapScreen` (**NY**)

---

## ✅ Navigation (stack + tabs)

- **Tab-bar (bund)**: *Søg*, *Bookinger*, *Profil*  – defineret i `App.js`
- **Stack**: *Explore → FacilityDetails → Booking* (+ *Map*) – defineret i `App.js`
- **Progress UI**: `components/ProgressSteps.js` (viser flowet Sport → Venue → Book)

---

## ✅ Ny funktionalitet (mobil features)

- **Geolokation** (Expo)  
  - **Hvor**: `FacilityDetailsScreen.js` (beder om tilladelse, henter position)  
  - **Brug**: sorterer venues efter **afstand** + viser distance (via `data/geo.js` / haversine)
- **Kort** (React Native Maps)  
  - **Hvor**: `MapScreen.js`  
  - **Brug**: viser **venues på kort** med rigtige koordinater; zoomer til valgt venue via “Se kort”
- **Filter/Sortering**  
  - **Hvor**: `components/FilterBar.js` + `store/filters.js`  
  - **Brug**: Brugeren kan filtrere på **pris**, **afstand**, **by** og **sortere** på pris/afstand (realtid)

---

## ✅ Vedvarende data (ikke kun hardcoded)

- **AsyncStorage** til **bookinger**  
  - **Hvor**: `store/bookings.js` (Context Provider)  
  - **Hvad**: Gemmer nye bookinger (fra `BookingScreen.js`) og læser dem ved app-start  
  - **Forbrug**:  
    - `PreviousScreen.js` (liste + slet/ryd)  
    - `ProfileScreen.js` (stats + seneste bookinger)
- **Dynamiske venues & billeder**  
  - **Hvor**: `data/venues.js` (venue-objekter m. koordinater, billeder, slots)  
  - **Billeder**: lokale assets via `data/sports.js` (hurtigt/offline-venligt)

---

## ▶️ Kørsel

```bash
npm install
npx expo start