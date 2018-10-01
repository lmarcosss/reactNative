import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  TouchableOpacity
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peso: "",
      altura: "",
      imc: 0,
      categoria: ""
    };
    this.calculoIMC = this.calculoIMC.bind(this);
  }

  calculoIMC() {
    const calculo = parseFloat(
      (this.state.peso / (this.state.altura * this.state.altura)).toFixed(2)
    );
    this.setState({
      imc: calculo,
      peso: "",
      altura: ""
    });
    this.categoriaIMC(calculo);
  }

  categoriaIMC(imc) {
    let texto = "";
    if (imc < 16.0) {
      texto = "Magreza grave";
    } else if (imc < 17) {
      texto = "Magreza leve";
    } else if (imc < 18.5) {
      texto = "Magreza moderada";
    } else if (imc < 25) {
      texto = "Saudável";
    } else if (imc < 30) {
      texto = "Sobrepeso";
    } else if (imc < 35) {
      texto = "Obesidade Grau I";
    } else if (imc < 40) {
      texto = "Obesidade Grau II (severa)";
    } else if (imc > 40) {
      texto = "Obesidade Grau III (morbida)";
    }
    this.setState({ categoria: texto });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Peso"
            keyboardType="numeric"
            style={styles.input}
            name="peso"
            value={this.state.peso}
            onChangeText={(peso) => this.setState({peso})}
          />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Altura"
            keyboardType="numeric"
            style={styles.input}
            name="altura"
            value={this.state.altura}
            onChangeText={(altura) => this.setState({altura})}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={this.calculoIMC} style={styles.button}>
            <Text style={styles.textButton}>Calcular</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.resultado}>
          {this.state.imc === 0 || isNaN(this.state.imc) ? "" : this.state.imc}
        </Text>
        <Text style={[styles.resultado, { fontSize: 35 }]}>
          {this.state.categoria === "" ? "Digite para saber mais" : this.state.categoria}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  input: {
    height: 80,
    width: "50%",
    textAlign: "center",
    fontSize: 50,
    marginTop: 24
  },
  inputView: {
    flexDirection: "row"
  },
  button: {
    backgroundColor: "#89ffa5"
  },
  textButton: {
    alignSelf: "center",
    padding: 30,
    fontSize: 25,
    color: "#6dc4a4",
    fontWeight: "bold"
  },
  resultado: {
    alignSelf: "center",
    textAlign: "center",
    color: "lightgray",
    fontSize: 65,
    padding: 15
  }
});
