const { RuleTester } = require('eslint')
const rule = require('../../../lib/rules/params-in-fetcher')
const ruleTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
    parserOptions: { ecmaVersion: 2015 },
})
const codeCorrectWithNonObjectParams = `this.list = new K8SResourceList({
      fetcher: queryParams =>
        this.k8sApi.getResourceList({
          type: RESOURCE_TYPES.APPLICATION,
          cluster: this.ws.baseParamsSnapshot.cluster,
          namespace: this.ws.baseParamsSnapshot.namespace,
          queryParams: {
            ...queryParams,
          },
        }),
      activatedRoute: this.activatedRoute,
      watcher: seed =>
        this.k8sApi.watchResourceChange(seed, {
          type: RESOURCE_TYPES.APPLICATION,
          cluster: this.ws.baseParamsSnapshot.cluster,
          namespace: this.ws.baseParamsSnapshot.namespace,
        }),
    });`

const codeCorrectWithNotArrowFunction = `
    this.fetcher= ()=>{};
    this.list = new K8SResourceList({
      fetcher: this.fetcher.bind(this),
      activatedRoute: this.activatedRoute,
    });`


const codeErrorWithNoParams = `this.list = new K8SResourceList({
      fetcher: () =>
        this.k8sApi.getResourceList({
          type: RESOURCE_TYPES.APPLICATION,
          cluster: this.ws.baseParamsSnapshot.cluster,
          namespace: this.ws.baseParamsSnapshot.namespace,
        }),
      activatedRoute: this.activatedRoute,
    });`
const codeErrorWithSomeParam = `this.list = new K8SResourceList({
      fetcher: ({a}) =>
        this.k8sApi.getResourceList({
          type: RESOURCE_TYPES.APPLICATION,
          cluster: this.ws.baseParamsSnapshot.cluster,
          namespace: this.ws.baseParamsSnapshot.namespace,
          queryParams: {
            a
          },
        }),
      activatedRoute: this.activatedRoute,
    });`


ruleTester.run('params-in-fetcher-stories', rule, {
    valid: [
        {
            code: codeCorrectWithNonObjectParams,
        },
        {
            code: codeCorrectWithNotArrowFunction,
        },
    ],
    invalid: [
        {
            code: codeErrorWithNoParams,
            errors: [
                {
                    message: 'Enforce all params in fetcher to carry injection ones!',
                },
            ],
        },
        {
            code: codeErrorWithSomeParam,
            errors: [
                {
                    message: 'Enforce all params in fetcher to carry injection ones!',
                },
            ],
        },
    ],
})