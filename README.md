# IntellectInk

## Opis
### Jest to twórcze narzędzie dla nauczycieli, które pomaga segregować, organizować i dzielić się materiałami edukacyjnymi w sposób inspirujący i klarowny. Zamień chaotyczną wiedzę w harmonijną kompozycję, umożliwiającą niezapomniane podróże poznawcze w krainie edukacji. Jest to aplikacja webowa składająca się z trzech głównych komponentów: bazy danych PostgreSQL, backendu w Python Django oraz frontendu w React. Wszystkie te elementy są skonfigurowane do działania w środowisku Docker, co ułatwia ich wdrożenie i skalowanie.

## Wymagania
### - Docker
### - Docker Compose

## Uruchomienie aplikacji
### 1. Klonowanie repozytorium

#### Rozpocznij od sklonowania repozytorium projektu Intellect Ink na swój lokalny komputer.

#### git clone https://github.com/ace-pajace/IntellectInk.git

### 2. Uruchomienie usług

#### Przejdź do katalogu głównego projektu, gdzie znajduje się plik docker-compose.yml, i uruchom wszystkie usługi za pomocą Docker Compose:

#### cd IntellectInk 
#### docker-compose up --build

#### Proces ten może zająć kilka minut. Po zakończeniu usługi backendu będą dostępne pod adresem http://localhost:8000, a usługi frontendu pod adresem http://localhost:3000.

## Praca z projektem
### Zatrzymywanie usług

#### Aby zatrzymać uruchomione usługi, użyj Ctrl+C w terminalu, a następnie wydaj polecenie:

#### docker-compose down

### Zarządzanie bazą danych

#### Do zarządzania bazą danych możesz używać dowolnego klienta PostgreSQL, łącząc się z bazą na porcie 5432 z użyciem danych uwierzytelniających podanych w konfiguracji docker-compose.yml.

## Uwagi
### Upewnij się, że porty 5432, 8000 i 3000 nie są używane przez inne usługi na Twoim komputerze.
### Regularne tworzenie kopii zapasowych bazy danych jest zalecane, aby zapewnić bezpieczeństwo danych.
