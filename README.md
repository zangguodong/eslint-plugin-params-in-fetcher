# eslint-plugin-params-in-fetcher

Use all params to avoid missing injection param,e.g,continueToken,limit

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-params-in-fetcher`:

```sh
npm install eslint-plugin-params-in-fetcher --save-dev
```

## Usage

Add `params-in-fetcher` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "params-in-fetcher"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "params-in-fetcher/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


