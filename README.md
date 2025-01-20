# FilmCritix

FilmCritix to aplikacja internetowa dla entuzjastów filmów, umożliwiająca przeglądanie, ocenianie i zarządzanie recenzjami filmów. Projekt zawiera panel administracyjny oraz funkcje autoryzacji użytkowników.

---

## Uruchamianie projektu

### Frontend
1. Przejdź do folderu głównego projektu.
2. W terminalu wpisz:
   ```bash
   npm run dev
   ```

### Backend
1. Przejdź do folderu `server`:
   ```bash
   cd server
   ```
2. W terminalu wpisz:
   ```bash
   npm run dev:server
   ```

Plik `.env` zawiera już skonfigurowane zmienne środowiskowe, w tym URL bazy danych oraz sekrety JWT. Dzięki temu aplikacja po uruchomieniu będzie działać od razu z gotowymi ustawieniami.

---

## Gotowi użytkownicy
- **Użytkownik**
  - Email: `user@wp.pl`
  - Hasło: `user123`
- **Administrator**
  - Email: `admin@admin.pl`
  - Hasło: `admin123`

---

## Technologie
- **Frontend:** React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Autoryzacja:** JWT (JSON Web Token), ciasteczka HTTP
- **Upload plików:** Multer
- **Logowanie zdarzeń:** Winston (logi zapisywane są w folderze `logs`)
- **Testowanie i debugowanie:** Postman

---

## Dokumentacja API

### Autoryzacja
#### Rejestracja użytkownika
**Endpoint:** `POST /api/register`

**Nagłówki:**
- `Content-Type: application/json`

**Body:**
```json
{
  "email": "user@example.com",
  "login": "username",
  "password": "password123",
  "name": "John",
  "surname": "Doe",
  "phone": "123456789",
  "czyAdmin": false
}
```
**Odpowiedź:**
- Status 201: `{"message": "Użytkownik został pomyślnie zarejestrowany"}`
- Status 400: `{"error": "Użytkownik o tym emailu już istnieje"}`

#### Logowanie
**Endpoint:** `POST /api/login`

**Nagłówki:**
- `Content-Type: application/json`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Odpowiedź:**
- Status 200: `{"message": "Pomyślnie zalogowano użytkownika", "user": {...}}`
- Status 401: `{"error": "Nie znaleziono użytkownika o podanym mailu"}`

#### Wylogowanie
**Endpoint:** `POST /api/logout`

**Nagłówki:**
- `Cookie: token=<JWT>`

**Odpowiedź:**
- Status 200: `{"message": "Użytkownik został wylogowany."}`

### Użytkownicy
#### Pobieranie użytkowników
**Endpoint:** `GET /api/getUsers`

**Odpowiedź:**
- Status 200: `[ {"_id": "...", "email": "..."}, ... ]`

#### Usuwanie użytkownika
**Endpoint:** `DELETE /api/deleteUser/:id`

**Odpowiedź:**
- Status 200: `{"message": "Użytkownik został usunięty z bazy."}`
- Status 403: `{"error": "Nie możesz usunąć swojego konta."}`

### Recenzje
#### Dodawanie recenzji
**Endpoint:** `POST /api/addReview`

**Nagłówki:**
- `Content-Type: multipart/form-data`

**Body:**
- `filmName`: Tytuł filmu
- `description`: Krótki opis
- `genre`: Gatunek
- `review`: Treść recenzji
- `file`: Plik z okładką

**Odpowiedź:**
- Status 201: `{"message": "Recenzja została dodana."}`

#### Edycja recenzji
**Endpoint:** `PUT /api/editReview/:id`

**Nagłówki:**
- `Content-Type: multipart/form-data`

**Body:**
- Jak w przypadku dodawania recenzji

**Odpowiedź:**
- Status 200: `{"message": "Recenzja została zaktualizowana"}`

#### Usuwanie recenzji
**Endpoint:** `DELETE /api/deleteReview/:id`

**Odpowiedź:**
- Status 200: `{"message": "Pomyślnie usunięto recenzję"}`

#### Pobieranie recenzji
**Endpoint:** `GET /api/showReviews`

**Odpowiedź:**
- Status 200: `[ {"_id": "...", "filmName": "..."}, ... ]`


