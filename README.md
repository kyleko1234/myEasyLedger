# myEasyLedger

myEasyLedger is a webapp that provides an allows users to keep track of their bookkeeping. It offers a simple-to-use single-entry interface for personal users, and a double-entry interface for enterprise users that automatically generates financial statements.

## Contents
- [Tech stack](#tech-stack)
- [Dev setup](#dev-setup)

## Tech Stack
- Front end
    - Color Admin 4.6
    - Bootstrap 4
    - React.js
- Back end
    - Spring
        - Spring Boot 2.2.6
        - Spring Security
        - Spring Mail
        - Thymeleaf
    - PostgreSQL 13

## Dev Setup
These instructions assume you are using a recent version of MacOS (10.13 or newer) and that you have cloned this repository to your device.
- [Local DB](#local-db-setup)
- [Backend Development Environment](backend-development-environment-setup)
- [Frontend Development Environment](frontend-development-environment-setup)

### Local DB Setup
#### Install a local PostgreSQL Database
myEasyLedger uses PostgreSQL 13. It is recommended to use the (EnterpriseDB installer)[https://www.enterprisedb.com/downloads/postgres-postgresql-downloads].
1. Go to https://www.postgresql.org/download/macosx/ and click on 'download the installer'.
2. Download version 13.x for MacOS
3. Double-click on the downloaded postgresql-13-osx.dmg then click on postgresql-13-osx to start installing.

During the installation process, use the default installation settings: 
```
Default Locale
Installation Directory: /Library/PostgreSQL/13
Server Installation Directory: /Library/PostgreSQL/13
Data Directory: /Library/PostgreSQL/13/data
Database Port: 5432
Database Superuser: postgres
Operating System Account: postgres
Database Service: postgresql-13
Command Line Tools Installation Directory: /Library/PostgreSQL/13
pgAdmin4 Installation Directory: /Library/PostgreSQL/13/pgAdmin 4
Stack Builder Installation Directory: /Library/PostgreSQL/13
```

Now use pgAdmin4 (or some other method) to...

##### Create a database in pgAdmin named 'easyledger'
1. Right-click Servers/PostgreSQL 13/Databases
2. Create -> Database
3. Name your database 'easyledger' and leave other settings at default

##### Create a schema in your 'easyledger' database named 'public'
1. Right click Servers/PostgreSQL 13/Databases/easyledger/Schemas
2. Create -> Schemas...
3. name your schema 'public' and leave other settings at default

##### Import the myEasyLedger database
1. If you are not beginning from an empty schema, drop-cascade your 'public' schema and create a new one.
2. Right click on the 'public' schema and click "Restore..."
3. Change "Format" to "All Files", and restore from the Easy_Ledger/db/db_schema_and_metadata file for an clean db, or Easy_Ledger/db/db_full for sample data.

##### ER diagram for DB
An ER diagram for this db can be found in Easy_Ledger/db and will be named "ER vX.X.xml". This file can be opened at https://online.visual-paradigm.com/ - requires a free account.

### Backend Development Environment Setup
The recommended IDE for this project is Spring Tool Suite 4 for Eclipse. STS can be downloaded at https://spring.io/tools and includes a full Eclipse-based IDE.

Alternatively, install Spring Tool Suite 4 on an existing installation of Eclipse by clicking Help > Eclipse Marketplace... and searching for STS. Select the version that matches your Eclipse version and hit Install. All features are selected by default. After installing STS4 with all features, you will need to restart Eclipse.

#### Open the project in STS4:
1. File > Open Projects from File System
2. Click the “Directory…” button
3. Select /Easy_Ledger/rest_api, then click open
4. Click Finish
5. STS may take a few moments to update dependencies for the project build.

#### Run the project from STS4:
1. Make sure to click EasyLedgerApplication.java from the Package Explorer sidebar to select it. If this file is not selected, occasionally STS will fail to run the project.
2. Hit the play button in the top toolbar.
3. If prompted, choose "Run as Spring Boot App".

### Frontend Development Environment Setup
The recommended text editor is [Visual Studio Code](https://code.visualstudio.com/).

You will need to have NodeJS 14 installed, which can be found [here](https://nodejs.org/en/
).

When running for the first time, initialize the frontend in the terminal by issuing the following commands: 
```
$ cd {filepath}/Easy_Ledger/front_end
$ npm install
$ 
```

To start the front end, run the following commands: 
```
$ cd {filepath}/Easy_Ledger/front_end
$ npm start 
```

Please make sure that the backend server is running before starting the frontend.