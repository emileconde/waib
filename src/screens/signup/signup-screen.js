import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../contexts/auth/auth-context";
import { userFriendlyErrorMessage } from "../../util/utils";
import PALETTE from "../../util/palette";
import BackgroundImage from "../../components/backgroungImage/background-image";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setconfirmedPassword] = useState("");
  const [isErrorTextVisisble, setIsErrorTextvisisble] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (password === confirmedPassword) {
      try {
        await signUp(email, password);
      } catch (error) {
        //console.log(userFriendlyErrorMessage(error));
        setIsErrorTextvisisble(true);
        setErrorMessage(userFriendlyErrorMessage(error));
        setTimeout(() => {
          setIsErrorTextvisisble(false);
        }, 3000);
      }
    } else {
      setIsErrorTextvisisble(true);
      setErrorMessage(
        "The password and the confirmation password are different."
      );
      setTimeout(() => {
        setIsErrorTextvisisble(false);
      }, 3000);
    }
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.welcomTextContainer}>
          <Text style={[styles.textBase, styles.welcomeText]}>Welcome!</Text>
          <Text style={[styles.textBase, styles.welcomeActionText]}>
            Begin your journey to a better financial future.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TextInput
            style={[styles.inputBase]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.inputBase]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={[styles.inputBase, styles.confirmPassordInput]}
            placeholder="Confirm Password"
            value={confirmedPassword}
            onChangeText={setconfirmedPassword}
            secureTextEntry
          />
          {isErrorTextVisisble && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          <TouchableOpacity style={[styles.buttonBase]} onPress={handleSignUp}>
            <Text style={styles.textBase}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.haveAccountView}>
          <Text style={{ ...styles.textBase, fontSize: 12 }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("login-screen");
            }}
          >
            <Text style={styles.loginActionText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  errorText: {
    color: PALETTE.accent.warmOrange,
    marginBottom: 10,
  },

  textBase: {
    color: PALETTE.neutral.white,
    fontSize: 15,
  },

  inputBase: {
    height: 50,
    width: 250,
    margin: 8,
    borderWidth: 1.5,
    padding: 10,
    borderColor: PALETTE.primary.darkBlue,
    color: PALETTE.neutral.darkGrey,
    backgroundColor: PALETTE.neutral.white,
    fontSize: 13,
  },
  buttonBase: {
    height: 50,
    width: 200,
    backgroundColor: PALETTE.primary.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
    borderWidth: 2,
    borderColor: PALETTE.neutral.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    marginBottom: 20,
  },
  buttonsContainer: {
    height: 350,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(211, 211, 211, 0.2)",
    zIndex: 0,
  },
  confirmPassordInput: {
    marginBottom: 40,
  },

  welcomTextContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  haveAccountView: {
    flexDirection: "row",
    gap: 5,
  },
  welcomeText: {
    fontSize: 30,
  },
  welcomeActionText: {
    fontSize: 15,
  },
  loginActionText: {
    color: PALETTE.secondary.softGreen,
    fontSize: 12,
  },
});

export default SignUpScreen;
