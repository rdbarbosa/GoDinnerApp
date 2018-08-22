import React from "react";
import { Text } from "react-native";
import { withRouter } from 'react-router'

class Home extends React.Component {
    render() {
        return (
            <Text>Oi</Text>
        )
    }
}

export default withRouter(Home)