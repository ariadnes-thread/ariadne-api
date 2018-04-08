define({ "api": [
  {
    "type": "get",
    "url": "/api",
    "title": "Available API versions",
    "version": "1.0.0",
    "name": "GetApiVersions",
    "description": "<p><strong>No authorisation required.</strong> This endpoint returns the list of available API versions.</p>",
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
  }
] });
