import gql from 'graphql-tag'

export const login = gql`
    query($email: String!, $password: String!) {
        login(email: $email password: $password) {
            is
            token
            restaurant {
                name
            }
        }
    }
`