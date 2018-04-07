import {graphql, commitMutation} from 'react-relay/compat';

const mutation = graphql`
    mutation CreateTeamMutation($name: String!) {
        createTeam(name: $name) {
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