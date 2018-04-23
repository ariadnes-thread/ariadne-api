# Ariadne's Thread web API

User-facing HTTP API for Ariadne's Thread project.

Table of contents:

- [Building & running](#building---running)
- [Contributing (must read)](#contributing--must-read-)
- [Database notes](#database-notes)
- [Rebuilding gRPC code](#rebuilding-grpc-code)

# Building & running

You'll need to create a `config.json` to build/run the app. An example config has been provided for you at `config.example.json`. Use `npm start` to run the app.

Use `npm run apidoc` to rebuild API documentation and `npm run lint` to check the source code for code style issues.

> **Important:** For remote route generation to work correctly gRPC Route Planner Service must be launched first. That is, [Ariadne Router Planner](https://github.com/ariadnes-thread/ariadne-route-planner) server must be running on the relevant port (`config.json # routePlannerPort`).

# Contributing (must read)

This project was built specifically for Node v8.11.1, but should work with other versions as well. That said, you are encouraged to use v8.11.1 as this is what Ariadne server runs.

This project relies heavily on type hinting and proper [JSDoc](http://usejsdoc.org/) type definitions. If you update any of the data structures or database schemas, make sure to edit `lib/typedef.js` file to keep it up to date. Additionally, make sure to update docblocks of any affected methods - failing to do this will cause a lot of confusion for other developers.

[ESLint](https://eslint.org/) is used to keep the coding style of this project consistent. You can run it explicitly using `npm run lint`. To make things easier for yourself, you might wanna use a smart IDE with an ESLint plugin (an IntelliSense that picks up type hints mentioned above), e.g. [PhpStorm](https://www.jetbrains.com/phpstorm/).   

# Database notes

All of the database manipulations (in Node.js code) are done through `lib/db/ApiDB.js` and `lib/db/GisDB.js` classes. As the name implies, the first database stores data relevant to this API (user accounts, their settings, preferences, etc.) and the latter contains spatial GIS data. Note that the GIS database should only be accessed in rare cases like fetching points of interests - all of the complex requests (e.g. route building) should be delegated to the Python gRPC server (via `lib/RoutePlannerClient.js`).

The `db-setup/` directory contains an SQL schema that can be used for initial setup of the API. The system depends on PostgreSQL as the database software, with `uuid-ossp` extension installed (used to automatically generate UUID v4).

**Important:** Column names returned from the database are automatically converted into `camelCase` before they are exposed to JavaScript. For example, the results of query `SELECT date_created, first_post_id FROM table` will be available through properties `row.dateCreated` and `data.firstPostId`.

# Rebuilding gRPC code

After editing `lib/grpc/planner.proto` you can rebuild relevant Node.js code using:

```bash
npm run rebuild-grpc
```


