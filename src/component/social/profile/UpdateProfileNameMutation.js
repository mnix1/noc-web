import {graphql, commitMutation} from 'react-relay/compat';

const mutation = graphql`
    mutation UpdateProfileNameMutation($name: String!) {
        updateProfileName(name: $name) {
            id
            tag
            name
        }
    }
`;

export function commit(environment, name) {
    commitMutation(
        environment,
        {
            mutation,
            variables: {name}
        }
    );
}