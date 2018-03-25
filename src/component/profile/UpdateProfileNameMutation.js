import {graphql, commitMutation} from 'react-relay/compat';

const mutation = graphql`
    mutation UpdateProfileNameMutation($id: Long!, $name: String!) {
        updateProfileName(id: $id, name: $name) {
                id
                tag
                name
        }
    }
`;

export function commit(environment, id, name) {
    commitMutation(
        environment,
        {
            mutation,
            variables: {id, name}
        }
    );
}