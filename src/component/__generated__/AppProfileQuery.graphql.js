/**
 * @flow
 * @relayHash 96b132137479e5745965da571a00bf69
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Profile_profile$ref = any;
export type AppProfileQueryVariables = {|
  profileId: any,
|};
export type AppProfileQueryResponse = {|
  +profile: {|
    +$fragmentRefs: Profile_profile$ref,
  |},
|};
*/


/*
query AppProfileQuery(
  $profileId: Long!
) {
  profile(id: $profileId) {
    ...Profile_profile
    id
  }
}

fragment Profile_profile on Profile {
  id
  tag
  name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "profileId",
    "type": "Long!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "profileId",
    "type": "Long!"
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AppProfileQuery",
  "id": null,
  "text": "query AppProfileQuery(\n  $profileId: Long!\n) {\n  profile(id: $profileId) {\n    ...Profile_profile\n    id\n  }\n}\n\nfragment Profile_profile on Profile {\n  id\n  tag\n  name\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AppProfileQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "profile",
        "storageKey": null,
        "args": v1,
        "concreteType": "Profile",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Profile_profile",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppProfileQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "profile",
        "storageKey": null,
        "args": v1,
        "concreteType": "Profile",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "tag",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'ebe31dd92a1760302d243bec447865be';
module.exports = node;
