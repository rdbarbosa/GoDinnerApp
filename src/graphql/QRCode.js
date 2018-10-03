import gql from "graphql-tag";

export const READ_QR = gql`
  query($qr_code: String!) {
    restaurant(qr_code: $qr_code) {
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
      latitude
      longitude
      user {
        id
        name
        email
      }
      orders {
        id
        status
        menu_options {
          id
          name
          price
        }
        restaurant_tables {
          id
          table_number
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
        image_url
        content
        title
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
        table_number
        qr_code
      }
      qr_code_table {
        id
        state
        table_number
      }
    }
  }
`;
