import gql from 'graphql-tag'

export const register = gql`
mutation($name: String!, $lastname: String!, $phone_number: String!, $email: String!, $password: String!) {
    clientCreate(name: $name, lastname: $lastname, phone_number: $phone_number, email: $email, password: $password) {
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

`