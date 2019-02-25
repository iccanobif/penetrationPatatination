import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Vibration
} from "react-native";

const HOME_SCREEN = 0, COUNTDOWN_SCREEN = 1, PATATINATION_SCREEN = 2, RESULTS_SCREEN = 3

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreen: HOME_SCREEN,
      score: undefined
    }
  }

  moveToScreen = (newScreen, score) => {
    this.setState({
      currentScreen: newScreen,
      score: score
    })
  }

  render() {
    switch (this.state.currentScreen) {
      case HOME_SCREEN:
        return (<HomeScreen moveToScreen={this.moveToScreen} />)
      case COUNTDOWN_SCREEN:
        return (<CountdownScreen moveToScreen={this.moveToScreen} />)
      case PATATINATION_SCREEN:
        return (
            <PatatinationScreen
              moveToScreen={this.moveToScreen}
            />
        )
      case RESULTS_SCREEN:
        return (
          <ResultsScreen
            moveToScreen={this.moveToScreen}
            score={this.state.score}
          />
        )
    }
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.titleText}>
          PENETRATION PATATINATION
        </Text>
        <Button
          title="vai"
          onPress={() => {
            this.props.moveToScreen(COUNTDOWN_SCREEN)
          }} />
      </View>
    )
  }
}

class CountdownScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsLeft: 3,
      intervalId: null
    }

    this.state.intervalId = setInterval(() => {
      if (this.state.secondsLeft == 1) {
        clearInterval(this.state.intervalId)
        this.props.moveToScreen(PATATINATION_SCREEN)
      }
      else
        this.setState(previousState => (
          { secondsLeft: previousState.secondsLeft - 1 }
        ))
    }, 1000);

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.countDownDigit}>
          {this.state.secondsLeft}
        </Text>
      </View>
    )
  }
}

class PatatinationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsLeft: 10,
      numeroTocchi: 0,
      intervalId: null
    }

    this.state.intervalId = setInterval(() => {
      if (this.state.secondsLeft == 1) {
        clearInterval(this.state.intervalId)
        this.props.moveToScreen(RESULTS_SCREEN, this.state.numeroTocchi)
      }
      else {
        this.setState(previousState => (
          { secondsLeft: previousState.secondsLeft - 1 }
        ))
      }
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.testoNormale}>
          NUMERO TOCCHI: {this.state.numeroTocchi}
        </Text>
        <Text style={styles.testoNormale}>
          SECONDI RIMANENTI: {this.state.secondsLeft}
        </Text>
        <TouchableWithoutFeedback
          onPressIn={() => {
            this.setState((state, props) => {
              Vibration.vibrate([
                50, 50,
                50, 50,
                50, 50,
                50, 50
              ])
              return { numeroTocchi: state.numeroTocchi + 1 }
            })
          }}>
          <Image
            source={require("./gustave.jpeg")}
            style={{ flex: 1 }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

class ResultsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.testoNormale}>IL GIUOCO É TERMINATO</Text>
        <Text style={styles.testoNormale}>IL TUO PUNTEGGIO É</Text>
        <Text style={styles.testoNormale}>{this.props.score}</Text>
        <Button
          title="RIPROVA"
          onPress={() => {
            this.props.moveToScreen(COUNTDOWN_SCREEN)
          }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e75480",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 50,
    textAlign: "center"
  },
  countDownDigit: {
    fontSize: 100
  },
  testoNormale: {
    fontSize: 20
  }
});



