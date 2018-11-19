import React from "react";
import { withRouter } from "react-router";

import { Header, Left, Button, Icon, Right, Title, Body } from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as MenuActions } from "../store/ducks/menu";
const CustomHeader = ({ iconLeft, title, iconRight, history, closeMenu, openMenu }) => (
  <Header>
    {iconLeft && (
      <Left>
        <Button transparent onPress={iconLeft.onPress ? iconLeft.onPress : openMenu}>
          {/* <Icon name="md-menu" /> */}
          <Icon  {...iconLeft} />
        </Button>
      </Left>
    )}
    <Body>
      <Title>{title}</Title>
    </Body>
    {iconRight && (
      <Right>
        <Button transparent onPress={() => history.push("/map")}>
          {/* <Icon name="location" type="Entypo" /> */}
          <Icon  {...iconRight} />
        </Button>
      </Right>
    )}
  </Header>
);

const mapStateToProps = ({ menu }) => ({
  menu
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MenuActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomHeader));
