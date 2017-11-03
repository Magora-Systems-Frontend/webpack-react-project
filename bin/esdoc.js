import ESDoc from 'esdoc/out/src/ESDoc.js';
import publisher from 'esdoc/out/src/Publisher/publish.js';

const config = {
  "source": "./src",
  "destination": "./doc/generated",
  //"excludes": ["/\\.test\\./"],
  "plugins": [
    {
      "name": "esdoc-standard-plugin",
      "option": {
        "manual": {
          "index": "./README.md",
          "asset": "./static",
          "files": [
            "./doc/deployment.md",
            "./doc/theme.md"
          ]
        }
      }
    }
  ]
};

ESDoc.generate(config, publisher);


/*
{
  "source": "./src",
  "destination": "./docs",
  "includes": ["\\.js$"],
  "excludes": ["\\.config\\.js$"],
  "plugins": [
  {
    "name": "esdoc-standard-plugin",
    "option": {
      "lint": {"enable": true},
      "coverage": {"enable": true},
      "accessor": {"access": ["public", "protected", "private"], "autoPrivate": true},
      "undocumentIdentifier": {"enable": true},
      "unexportedIdentifier": {"enable": false},
      "typeInference": {"enable": true},
      "brand": {
        "logo": "./logo.png",
        "title": "My Library",
        "description": "this is awesome library",
        "repository": "https://github.com/foo/bar",
        "site": "http://my-library.org",
        "author": "https://twitter.com/foo",
        "image": "http://my-library.org/logo.png"
      },
      "manual": {
        "index": "./manual/index.md",
        "globalIndex": true,
        "asset": "./manual/asset",
        "files": [
          "./manual/overview.md"
        ]
      },
      "test": {
        "source": "./test/",
        "interfaces": ["describe", "it", "context", "suite", "test"],
        "includes": ["(spec|Spec|test|Test)\\.js$"],
        "excludes": ["\\.config\\.js$"]
      }
    }
  }]
}

 */
