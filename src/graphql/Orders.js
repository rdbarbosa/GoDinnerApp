import gql from 'graphql-tag'

export const GET_ORDERS = gql`
query {
  client(id: 0) {
    id
    orders {
      id
      status
      created_at
      star
      restaurant {
        id
        name
      }
      restaurant_tables {
        id
        table_number
      }
      menu_options {
        id
        price
      }
    }
  }
}

`