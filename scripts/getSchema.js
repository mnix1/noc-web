var fetch = require('node-fetch');
var fs = require('fs');
var base64 = require('base-64');

const {
    buildClientSchema,
    introspectionQuery,
    printSchema,
} = require('graphql/utilities');

console.log(introspectionQuery);

var username = 'dev';
var password = '1';

fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(username + ":" + password)
    },
    body: JSON.stringify({ 'query': introspectionQuery }),
})
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const schemaString = printSchema(buildClientSchema(res.data));
        fs.writeFileSync('schema.graphql', schemaString);
    });
