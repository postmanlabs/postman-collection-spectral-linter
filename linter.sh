#!/bin/bash

# argument validation and usage help
usage()
{
cat << EOF
usage: $0 options

Lint a Postman collection using spectral rules:

OPTIONS:
    -c <collection ID> (see https://support.postman.com/hc/en-us/articles/5063785095319-How-to-find-the-ID-of-an-element-in-Postman)
    -k <Postman API key> (defaults to the environment variable POSTMAN_API_KEY)
    -r <path to rules file> (defaults to rules.yaml)

Requirements: curl, spectral, jq
More information can be found here: https://github.com/postmanlabs/postman-collection-spectral-linter
EOF
}

if [ $# -eq 0 ]
  then
    usage
    exit 1
fi

API_KEY=$POSTMAN_API_KEY
RULES_PATH=rules.yaml

OPTSTRING=":c:k:r:"

while getopts ${OPTSTRING} opt; do
  case ${opt} in
    c)
        COLLECTION_UID=${OPTARG}
        ;;
    k)
        API_KEY=${OPTARG}
        ;;
    r)
        RULES_PATH=${OPTARG}
        ;;
    :)
        echo "Option -${OPTARG} requires an argument."
        exit 1
      ;;
    ?)
        echo "Invalid option: -${OPTARG}."
        exit 1
        ;;
  esac
done

if [ ! $API_KEY ]
  then
    usage
    exit 1
fi

# Perform a curl request against the Postman API. Save the request body in a file called collection.json
curl -s -H "x-api-key: $API_KEY" https://api.postman.com/collections/$COLLECTION_UID | jq . > _collection.json

# Lint the collection using spectral. Save the result in a JSON file
spectral lint _collection.json --ruleset $RULES_PATH -f json --quiet > _result.json

# search for errors (severity=0) in the result file. If there are errors, exit with a non-zero status code
jq '.[] | select(.severity==0)' -e _result.json >/dev/null

if [ $? -eq 0 ]
  then
    exit 1
fi
