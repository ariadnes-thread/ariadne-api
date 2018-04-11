# Ariadne's Thread web API

User-facing HTTP API for Ariadne's Thread project.

# Building & running

You'll need to create a `config.json` to build/run the app. An example config has been provided for you at `config.example.json`. Use `npm start` to run the app.

Use `npm run apidoc` to rebuild API documentation and `npm run lint` to check the source code for code style issues.

> **Important:** For remote route generation to work correctly gRPC Route Planner Service must be launched first. That is, [Ariadne Router Planner](https://github.com/ariadnes-thread/ariadne-route-planner) server must be running on the relevant port (`config.json # routePlannerPort`).

# Rebuilding gRPC code

After editing `lib/grpc/planner.proto` you can rebuild relevant Node.js code using:

```bash
npm run rebuild-grpc
```