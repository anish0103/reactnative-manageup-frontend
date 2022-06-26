import { Alert } from "react-native";

const AlertComponent = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
}

export default AlertComponent;