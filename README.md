# postman-collection-spectral-linter

A command line utility (Bash script) to validate the quality of a [Postman Collection](https://learning.postman.com/docs/collections/collections-overview/).

> **Important:**
>
> This code is part of a blog post and is **not** actively maintained by Postman.

## Purpose

This code demonstrates how to use the [Postman API](https://www.postman.com/postman/workspace/postman-public-workspace/collection/12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a) and the [Spectral CLI](https://docs.stoplight.io/docs/spectral/9ffa04e052cc1-spectral-cli) to automatically validate the quality of a Postman Collection.

The script gets the Postman Collection by its ID, downloads the collection using the Postman API, and validates it against the [rules.yaml](rules.yaml) file's ruleset:

### Errors

- Collection must have a description.
- All requests must have a description.
- Requests must have a URL.
- All requests have at least a 2XX or 3XX example.
- All responses must have a status code.
- DELETE responses must have a 200 or 204 status code.
- Requests with path variables require a 404 response.
- All request query parameters must have a description.
- All request path parameters must have a description.
- All PATCH requests require a request body.
- All responses must have a status code.
- All authenticated requests require a 401 response.

### Warnings

- HTTP should not be used.
- Response bodies should be in JSON.
- All folders should have a description.
- Request names should not end in "Copy".

> If any **Error** rules do not pass for the linted collection, then the script returns a `1` error status. You can use this status in CI/CD processes to avoid further workflow steps.

## Usage

The [linter.sh](linter.sh) command receives the following arguments:

```shell
./linter.sh -c <collectionId> -k [APIKey] -r [rulesFilePath]
```

| Argument | Description |
| --- | --- |
| `collectionId`  | **Required**. The Postman Collection ID to lint. |
| `APIKey`        | A valid [Postman API key](https://learning.postman.com/docs/developer/postman-api/authentication/). This defaults to the `POSTMAN_API_KEY` environment variable. |
| `rulesFilePath` | The path to rules file. This defaults to the [`rules.yaml`](rules.yaml) file. |

> You can save your API key in a `POSTMAN_API_KEY` environment variable and the script will read it from there.
> 
> ```shell
> export POSTMAN_API_KEY=PMAK_your_key
> ```

## Reports

The script saves the results of the lint operation (detailed errors and warnings) in the `_result.json` file. You can use this file to build and send notifications. The script initially only uses it to calculate the error status and return it.
