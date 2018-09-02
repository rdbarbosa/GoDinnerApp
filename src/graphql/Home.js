import gql from "graphql-tag";

export const fetchRestaurants = gql`
  query {
    restaurant {
      id
      name
      subname
      location
      number
      phone_number
      cellphone_number
      cpnj
      avatar_url
      description
      user {
        id
        name
        email
      }
      orders {
        id
        menu_options {
          id
          name
        }
        client {
          name
          avatar_url
        }
        star
      }
      bookings {
        id
        client {
          id
          name
        }
      }
      posts {
        id
        likes {
          user {
            id
            name
          }
          liked
        }
        comments {
          user {
            id
            name
          }
          comment
        }
      }
      menus {
        id
        type
        menu_options {
          price
          id
          name
          ingredients
        }
      }
      tables {
        id
        state
      }
    }
  }
`;
