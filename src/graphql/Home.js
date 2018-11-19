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
      latitude
      longitude
      status
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
        title
        content
        image_url
        created_at
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
        table_number
        state
      }
    }

    client(id: 1) {
      id
      name
      avatar_url
    }
  }
`;
