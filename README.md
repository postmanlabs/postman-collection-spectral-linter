# postman-collection-spectral-linter

> This code is part of a blog post and is **not** actively maintained by Postman.

Command line utility (bash script) to validate the quality of a collection.

## Purpose

This code demonstrates how to use the [Postman API](https://www.postman.com/postman/workspace/postman-public-workspace/collection/12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a) and the [Spectral CLI](https://docs.stoplight.io/docs/spectral/9ffa04e052cc1-spectral-cli) to validate automatically the quality of a Postman collection.

The script receives the Postman collection ID, downloads the collection using the Postman API, and validates the next rules:

### Errors

- The collection has a description
- All the requests have a description
- The request URL can’t be empty
- All the requests have an 2XX or 3XX example at least
- If the request contains path variables, it requires a 404 example
- All the examples have status code
- Delete examples status code must be 200 or 204
- If a request is authenticated, it should have a 401 example
- Requests query parameters require a description
- Requests path parameters require a description

### Warnings

- All the folders have a description
- The examples body format should be JSON
- HTTP is not allowed
- PATCH operations should have body
- No requests ending in “ Copy”

The file [rules.yaml](rules.yaml) contains all the previous rules. Some of them require custom Javascript functions, which are also included in the repository.

If any of the error rules doesn't pass for the collection being linted, the script returns an error status (1), which can be used in CI/CD processes to avoid further workflow steps.

> NOTE: You need a valid [Postman API key](https://learning.postman.com/docs/developer/postman-api/authentication/) to execute the command. You can save the API key in an environment variable called `POSTMAN_API_KEY`, and the script will read it from there.

```shell
export POSTMAN_API_KEY=PMAK_your_key
```

## Usage

The [linter.sh](linter.sh) command receives the following arguments:

```shell
./linter.sh -c <collectionId> -k [APIKey] -r [rulesFilePath]
```

| Argument      | Description                                                           |
| ------------- | --------------------------------------------------------------------- |
| collectionId  | The id of the collection to save the new request to. Mandatory.       |
| APIKey        | Postman API key. Defaults to the environment variable POSTMAN_API_KEY |
| rulesFilePath | Path to rules file. Defaults to [rules.yaml](rules.yaml)              |

> NOTE: The script saves the results of the linting operation (detailed errors and warnings) in a file called `_result.json`. You can use that file to build and send notifications. The script initially only uses it to calculate the error status and return it.
