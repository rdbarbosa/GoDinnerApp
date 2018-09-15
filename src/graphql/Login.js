import gql from 'graphql-tag'

export const login = gql`
    query($email: String!, $password: String!) {
        login(email: $email password: $password) {
            is
            token
            restaurant {
                name
            }
            client {
                id
                name
                lastname
                phone_number
                avatar_url
                description
                user {
                    email
                }
            }
        }
    }
`