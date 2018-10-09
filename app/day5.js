import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, View, BackHandler } from "react-native";
import Util from "./utils";
import Icon from "react-native-vector-icons/Ionicons";
import SwipeCards from "react-native-swipe-cards";

class SCard extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render() {
    return (
      <View
        key={this.props.id}
        style={[styles.scard]}
      >
        <Image
          style={styles.img}
          source={this.props.img}
        />
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardText}>
              {this.props.name}, very old{" "}
              <Icon name="ios-checkmark-circle" size={18} color="#208bf6" />
            </Text>
          </View>
          <View style={styles.cardIcon}>
            <View style={styles.cardIconContainer}>
              <Icon name="ios-people" size={25} color="#fc6b6d" />
              <Text style={[styles.cardIconText, { color: "#fc6b6d" }]}>0</Text>
            </View>
            <View style={styles.cardIconContainer}>
              <Icon name="ios-book" size={25} color="#cecece" />
              <Text style={[styles.cardIconText, { color: "#cecece" }]}>0</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class SwipeCard extends Component {
  constructor() {
    super();
    const simgs = [
      require("./image/bg1.jpg"),
      require("./image/bg2.jpg"),
      require("./image/bg3.png"),
      require("./image/bg4.jpg"),
      require("./image/bg3.png")
    ];
    const names = ["Stuart", "Bob", "Kevin", "Dave", "Stuart"];
    const cards = simgs.map(function(elem, index) {
      return {
        id: "sc" + index,
        img: simgs[4 - index],
        name: names[4 - index]
      };
    });

    this.state = {
      cards
    };
  }

  render() {
    return (
      <SwipeCards
        cardKey={Math.random() + 'key'}
        cards={this.state.cards}
        renderCard={cardData => <SCard key={cardData.id} {...cardData} />}
        cardRemoved={() =>{}}
        showYup={false}
        showNope={false}
        stack
        stackOffsetX={0}
        loop
      />
    );
  }
}

export default class extends Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  render() {
    return (
      <View style={styles.container}>
        <SwipeCard/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: Util.size.height,
    width: Util.size.width,
    paddingTop: Util.size.height / 20
  },
  scard: {
    width: Util.size.width - 20,
    height: 410,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    position: "relative",
    backgroundColor: "#fff",
    left: 10,
    top: 20
  },
  img: {
    width: Util.size.width - 20,
    height: 350
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingLeft: 20,
    paddingRight: 5
  },
  cardText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#423e39"
  },
  cardIcon: {
    flexDirection: "row"
  },
  cardIconContainer: {
    width: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  cardIconText: {
    paddingLeft: 5,
    fontWeight: "500",
    fontSize: 16
  },
  largeAction: {
    width: Util.size.width === 375 ? 110 : 100,
    height: Util.size.width === 375 ? 110 : 100,
    borderColor: "#f5f5f5",
    borderWidth: 10,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center"
  }
});
