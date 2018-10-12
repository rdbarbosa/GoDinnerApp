import gql from 'graphql-tag'

export const ADD_ORDER = gql`
mutation($client_id: ID!, $restaurant_id: ID!, $restaurant_tables_id: ID!, $menu_options: [ID]!) {
  orderCreate(
    client_id: $client_id
    restaurant_id: $restaurant_id
    restaurant_tables_id: $restaurant_tables_id
    menu_options: $menu_options
  ) {
    id
  }
  tableUpdate(
    id: $restaurant_tables_id
    state: "Ocupada"
    client_id: $client_id
  ) {
    id
  }
}
`