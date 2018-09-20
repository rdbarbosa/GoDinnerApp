import gql from 'graphql-tag'

export const READ_QR = gql`
query($qr_code: String!) {
	restaurant(qr_code: $qr_code) {
        id
        name
		qr_code_table {
			id
			state
			table_number
		}
	}
}
`