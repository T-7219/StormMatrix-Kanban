# StormMatrix Kanban

<div align="center">
  <img src="img/logo/dementor-kanban-logo.png" alt="Dementor Kanban Logo" width="200">
  <h3>Professionelles Kanban-Board-System</h3>
  <p>Eine moderne, vollständige Kanban-Board-Anwendung, die mit Microservices-Architektur entwickelt wurde, um Skalierbarkeit, Widerstandsfähigkeit und Flexibilität zu bieten.</p>

  <a href="https://github.com/T-7219/StormMatrix-Kanban/releases/latest"><img src="https://img.shields.io/github/v/release/T-7219/StormMatrix-Kanban?include_prereleases&style=flat-square" alt="Neueste Version"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/blob/main/LICENSE"><img src="https://img.shields.io/github/license/T-7219/StormMatrix-Kanban?style=flat-square" alt="Lizenz"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/stargazers"><img src="https://img.shields.io/github/stars/T-7219/StormMatrix-Kanban?style=flat-square" alt="Sterne"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/issues"><img src="https://img.shields.io/github/issues/T-7219/StormMatrix-Kanban?style=flat-square" alt="Probleme"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/T-7219/StormMatrix-Kanban/ci.yml?branch=main&label=tests&style=flat-square" alt="Tests"></a>
  <p><strong>Aktuelle Version: 0.8.0</strong></p>

  [English](README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)
</div>

## ✨ Funktionen

- **📋 Intuitive Kanban-Board-Oberfläche**: Drag-and-Drop-Karten, anpassbare Spalten und Echtzeit-Updates
- **🌐 Mehrsprachige Unterstützung**: Verfügbar in Englisch, Deutsch und Russisch
- **🔒 Benutzerauthentifizierung**: Sichere Anmeldung mit optionaler Zwei-Faktor-Authentifizierung
- **👥 Teamzusammenarbeit**: Boards teilen, Aufgaben zuweisen und Karten kommentieren
- **🔄 Anpassbare Arbeitsabläufe**: Definieren Sie Ihre eigenen Spalten und Workflow-Schritte
- **📎 Dateianhänge**: Hochladen und Anhängen von Dateien an Karten
- **📊 Aktivitätsverfolgung**: Verfolgen Sie alle Änderungen und Updates
- **🔔 Benachrichtigungen**: Erhalten Sie Benachrichtigungen über Zuweisungen und nahende Fristen
- **🔍 Filtern und Suchen**: Finden Sie Aufgaben schnell mit leistungsstarken Filteroptionen
- **👤 Persönliche und Team-Boards**: Trennen Sie persönliche Aufgaben von Teamprojekten
- **📱 Responsives Design**: Funktioniert auf Desktop, Tablet und Mobilgeräten
- **🌙 Dunkelmodus**: Reduzieren Sie die Augenbelastung mit dem Dunkelmodus

## 🏗️ Architektur

StormMatrix Kanban wurde mit einer Microservices-Architektur mit den folgenden Komponenten entwickelt:

- **Frontend**: React.js mit TypeScript und Material-UI
- **API Gateway**: Nginx für Routing und Lastausgleich
- **Microservices**:
  - **Auth Service**: Benutzerauthentifizierung und -autorisierung
  - **User Service**: Benutzerprofilverwaltung
  - **Board Service**: Board- und Kartenverwaltung
  - **Notification Service**: In-App- und E-Mail-Benachrichtigungen
  - **File Service**: Datei-Upload und -Speicherung
- **Datenbanken**:
  - PostgreSQL für persistente Daten
  - Redis für Caching und Sitzungsverwaltung
- **Message Queue**: RabbitMQ für asynchrone Kommunikation zwischen Diensten
- **Überwachung**: Prometheus und Grafana für Metriken und Überwachung
- **Protokollierung**: ELK Stack (Elasticsearch, Logstash, Kibana) für zentralisierte Protokollierung

## 🚀 Erste Schritte

### Voraussetzungen

- Docker und Docker Compose
- Node.js 18+ (für lokale Entwicklung)
- Git

### Installation

1. Klonen Sie das Repository:
```bash
git clone https://github.com/T-7219/StormMatrix-Kanban.git
cd stormmatrix-kanban
```

2. Umgebungsvariablen einrichten:
```bash
cp .env.example .env
```
Bearbeiten Sie die `.env`-Datei, um Ihre Einstellungen anzupassen.

3. Starten Sie die Anwendung mit Docker Compose:
```bash
docker-compose up -d
```

4. Zugriff auf die Anwendung:
- Frontend: http://localhost:3000
- API: http://localhost:80/api
- API-Dokumentation: http://localhost:80/api/docs

### Ersteinrichtung

Beim ersten Start der Anwendung wird automatisch ein Administrator-Benutzer mit den in Ihrer `.env`-Datei angegebenen Anmeldedaten erstellt. Die Standardanmeldedaten sind:

- E-Mail: admin@example.com
- Passwort: admin

Ändern Sie diese Anmeldedaten unbedingt sofort nach Ihrer ersten Anmeldung.

## 💻 Entwicklung

### Dienste einzeln ausführen

Für die Entwicklung können Sie Dienste einzeln ausführen:

```bash
# Frontend
cd frontend
npm install
npm start

# Auth Service
cd backend/auth-service
npm install
npm run start:dev

# Board Service
cd backend/board-service
npm install
npm run start:dev

# Und so weiter für andere Dienste...
```

### Tests ausführen

```bash
# Tests für alle Dienste ausführen
npm test

# Tests für einen bestimmten Dienst ausführen
cd backend/auth-service
npm test
```

## 📚 Dokumentation

Umfassende Dokumentation ist im `docs`-Ordner verfügbar:

- [Benutzerhandbuch](docs/user-guide.md): Anweisungen für Endbenutzer
- [Administrator-Handbuch](docs/admin-guide.md): Anweisungen für Administratoren
- [API-Dokumentation](docs/api.md): API-Referenz
- [Entwicklerhandbuch](docs/development.md): Leitfaden für Entwickler
- [Architektur](docs/architecture.md): Detaillierte Systemarchitektur

## 🤝 Mitwirken

Wir freuen uns über Beiträge zu StormMatrix Kanban! Bitte sehen Sie sich unseren [Leitfaden für Mitwirkende](CONTRIBUTING.md) für Details an.

## 📦 Bereitstellung

Für die Produktionsbereitstellung empfehlen wir die Verwendung von Kubernetes. Konfigurationsdateien für die Kubernetes-Bereitstellung sind im Verzeichnis `k8s` verfügbar.

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE)-Datei für Details.

## 👏 Danksagungen

- Danke an alle Mitwirkenden, die beim Aufbau dieses Projekts geholfen haben
- Besonderer Dank an die Open-Source-Gemeinschaft für die erstaunlichen Tools, die dies möglich gemacht haben

## 📞 Kontakt & Support

- Erstellen Sie ein [Issue](https://github.com/T-7219/StormMatrix-Kanban/issues) für Fehlerberichte oder Funktionsanfragen
- Kontaktieren Sie das Team unter support@stormmatrix.pro
- Treten Sie unserer [Telegram-Gruppe](https://t.me/+Ck61P7EPXgY5ZGVi) für Diskussionen bei: @stormmatrix_pro

---

<div align="center">
  Mit ❤️ erstellt vom StormMatrix-Team
</div>