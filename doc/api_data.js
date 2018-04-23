define({ "api": [
  {
    "type": "get",
    "url": "/api",
    "title": "Get available API versions",
    "version": "1.0.0",
    "name": "api_versions",
    "description": "<p><strong>No authorisation required.</strong> This endpoint returns the list of available API versions. Each API version is accessed through</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"currentVersion\": 1,\n  \"availableVersions\": [1]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "currentVersion",
            "description": "<p>The most recent version of the API.</p>"
          },
          {
            "group": "Success 200",
            "type": "number[]",
            "optional": false,
            "field": "availableVersions",
            "description": "<p>All available API versions.</p>"
          }
        ]
      }
    },
    "group": "API_Info",
    "filename": "lib/BaseRouter.js",
    "groupTitle": "API_Info"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/staff-login",
    "title": "Generate staff access token",
    "version": "1.0.0",
    "group": "v1_Auth",
    "name": "auth_staff_token",
    "sampleRequest": [
      {
        "url": "/api/v1/auth/staff-login"
      }
    ],
    "description": "<p><strong>No authorization required.</strong> Authorize a staff user using a email and a password.</p>",
    "parameter": {
      "fields": {
        "POST parameters": [
          {
            "group": "POST parameters",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "POST parameters",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"accessToken\": \"eyJhbGciOiJIUzI1NiIsICJ9.eyJzdWIiOiIxMjM0NTY3OSI6IkpvE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922o\",\n  \"userData\": {\n    \"userId\": \"abcdefgh-1234-5678-9101-qwert12345xy\",\n    \"firstName\": \"John\",\n    \"lastName\": \"Smith\"\n    \"email\": \"john@example.com\"\n  }\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Fizzyo API access token needed for subsequent requests.</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "userData",
            "description": "<p>Basic user data</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "userData.userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "userData.firstName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "userData.lastName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "userData.email",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": {\n    \"status\": 400,\n    \"name\": \"BadRequestError\",\n    \"message\": \"Parameter validation error: \\\"email\\\" is required.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/v1/routers/AuthRouter.js",
    "groupTitle": "v1_Auth"
  },
  {
    "group": "v1_Planning",
    "name": "planning_points_of_interest",
    "type": "get",
    "url": "/api/v1/planning/points-of-interest",
    "title": "Get list of points of interest",
    "permission": [
      {
        "name": "All authorized users"
      }
    ],
    "version": "1.0.0",
    "description": "<p><strong>Authorization required.</strong> Get an array with all points of interest. These points can be used as origin/destination suggestions.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"pointsOfInterest\": [\n      {\n         \"name\":\"Pasadena 10\",\n         \"latitude\":34.140975,\n         \"longitude\":-118.1243505\n      },\n      {\n         \"name\":\"Metro\",\n         \"latitude\":34.138,\n         \"longitude\":-118.1211784\n      },\n      {\n         \"name\":\"Olive Tree Condo\",\n         \"latitude\":34.1399729,\n         \"longitude\":-118.1297093\n      },\n      {\n         \"name\":\"Bechtel Mall\",\n         \"latitude\":34.1368473,\n         \"longitude\":-118.127086\n      }\n   ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "pointsOfInterest",
            "description": "<p>Array of objects representing points of interest</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "pointsOfInterest.name",
            "description": "<p>Human-readable name of the point of interest</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "pointsOfInterest.latitude",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "pointsOfInterest.longitude",
            "description": ""
          }
        ]
      }
    },
    "filename": "lib/v1/routers/PlanningRouter.js",
    "groupTitle": "v1_Planning",
    "header": {
      "fields": {
        "Required headers": [
          {
            "group": "Required headers",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization header of form <code>Bearer &lt;accessToken&gt;</code>.</p>"
          }
        ]
      }
    }
  },
  {
    "group": "v1_Planning",
    "name": "planning_route",
    "type": "post",
    "url": "/api/v1/planning/route",
    "title": "Generate route subject to constraints",
    "permission": [
      {
        "name": "All authorized users"
      }
    ],
    "version": "1.0.0",
    "description": "<p><strong>Authorization required.</strong> Generate a route subject to specified constraints.</p>",
    "parameter": {
      "fields": {
        "POST parameters": [
          {
            "group": "POST parameters",
            "type": "object",
            "optional": false,
            "field": "constraints",
            "description": "<p>An object (collection of key-value pairs) that represent constraints that route planner should take into account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n {\n    \"constraints\": {\n        \"origin\": {\n            \"longitude\": -118.12780,\n            \"latitude\": 34.14175\n        },\n        \"destination\": {\n            \"longitude\": -118.12139,\n            \"latitude\": 34.13612\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"route\": {\n       \"type\": \"LineString\",\n       \"coordinates\": [\n           [\n               -118.1280149,\n               34.141899\n           ],\n           [\n               -118.1259376,\n               34.1419191\n           ],\n           [\n               -118.1259364,\n               34.1409536\n           ]\n       ]\n   },\n   \"length\": 1261.67188402488\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "route",
            "description": "<p>A GeoJSON object</p>"
          },
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "route.coordinates",
            "description": "<p>An array of coordinate objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "route.coordinates.latitude",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "route.coordinates.longitude",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>Length of route in meters</p>"
          }
        ]
      }
    },
    "filename": "lib/v1/routers/PlanningRouter.js",
    "groupTitle": "v1_Planning",
    "header": {
      "fields": {
        "Required headers": [
          {
            "group": "Required headers",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization header of form <code>Bearer &lt;accessToken&gt;</code>.</p>"
          }
        ]
      }
    }
  },
  {
    "group": "v1_Users",
    "name": "users_profile",
    "type": "get",
    "url": "/api/v1/users/<userId>/profile",
    "title": "Get user profile",
    "permission": [
      {
        "name": "Owner of the profile"
      }
    ],
    "version": "1.0.0",
    "description": "<p><strong>Authorization required.</strong> Get basic information about the user. You can only fetch your own profile.</p>",
    "parameter": {
      "fields": {
        "GET parameters": [
          {
            "group": "GET parameters",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the user whose profile you want to fetch.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"userData\": {\n    \"userId\": \"abcdefgh-1234-5678-9101-qwert12345xy\",\n    \"firstName\": \"John\",\n    \"lastName\": \"Smith\"\n    \"email\": \"john@example.com\"\n  }\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "userData",
            "description": "<p>Basic user data</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "userData.userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "userData.firstName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "userData.lastName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "userData.email",
            "description": ""
          }
        ]
      }
    },
    "filename": "lib/v1/routers/UserRouter.js",
    "groupTitle": "v1_Users",
    "header": {
      "fields": {
        "Required headers": [
          {
            "group": "Required headers",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization header of form <code>Bearer &lt;accessToken&gt;</code>.</p>"
          }
        ]
      }
    }
  }
] });
