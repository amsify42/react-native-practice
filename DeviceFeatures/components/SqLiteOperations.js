import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import dbInit, { getUsers, insertUser, deleteUser, updateUser } from "../utils/database";

function SqLiteOperations() {
  const [isDBInitialized, setIsDBInitialized] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  let inputName = useRef();
  let inputEmail = useRef();

  useEffect(() => {
    dbInit()
      .then(() => {
        setIsDBInitialized(true);
        getUsers()
          .then((result) => {
            setUsers(result.rows._array);
          })
          .catch((error) => {
            console.info("getUsers", error);
          });
      })
      .catch((error) => {
        console.log("dbInit", error);
      });
  }, []);

  if (!isDBInitialized) {
    return <ActivityIndicator />;
  }

  function inputHandler(type, input) {
    setActiveUser((prevActiveUser) => {
      return { ...prevActiveUser, [type]: input };
    });
  }

  function resetForm() {
    setActiveUser({
      id: "",
      name: "",
      email: "",
    });
    inputName.current.clear();
    inputEmail.current.clear();
  }

  function editHandler(id) {
    const foundUser = users.find((user) => user.id === id);
    if(foundUser) {
        setActiveUser(foundUser);
    }
  }

  function submitHandler() {
    if(activeUser.id) {
        updateUser(activeUser.id, activeUser.name, activeUser.email)
      .then((result) => {
        setUsers((prevUsers) => {
            const index = prevUsers.findIndex((user) => user.id === activeUser.id);
            if(index >= 0) {
                const foundUser = prevUsers[index];
                const updateUser = {
                    ...foundUser,
                    ...{
                        name: activeUser.name,
                        email: activeUser.email
                    }
                }
                prevUsers[index] = updateUser;
            }
            return prevUsers;
        });
        resetForm();
        console.log("extUser", result);
      })
      .catch((error) => {
        console.log("submitError", error);
      });
    } else {
        insertUser(activeUser.name, activeUser.email)
        .then((result) => {
            setUsers((prevUsers) => [
            ...prevUsers,
            {
                id: result.insertId,
                name: activeUser.name,
                email: activeUser.email,
            },
            ]);
            resetForm();
            console.log("newUser", result);
        })
        .catch((error) => {
            console.log("submitError", error);
        });
    }
  }

  function deleteHandler(id) {
    Alert.alert(
        "Alert",
        "Are you sure want to delete?", // <- this part is optional, you can pass an empty string
        [
          {
            text: "No",
          },
          {
            text: "Yes",
            onPress: () => {
                deleteUser(id)
                .then((result) => {
                    setUsers(
                        (prevUsers) => 
                            prevUsers.filter((user) => user.id !== id
                        ));
                }).catch((error) => {
                    
                });
            },
          },
        ],
        { cancelable: true }
      );

  }

  function userItem(itemData) {
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{itemData.item.name}</Text>
        <Text style={styles.email}>{itemData.item.email}</Text>
        <View style={{flexDirection:'row'}}>
            <Button
                style={styles.button}
                title="-"
                onPress={editHandler.bind(this, itemData.item.id)}
            />
            <Button
                style={styles.button}
                title="X"
                onPress={deleteHandler.bind(this, itemData.item.id)}
            />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={inputHandler.bind(this, "name")}
          defaultValue={activeUser.name}
          ref={inputName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={inputHandler.bind(this, "email")}
          defaultValue={activeUser.email}
          ref={inputEmail}
        />
        <Button title="Save" onPress={submitHandler} />
      </View>
      <View style={styles.list}>
        <Text style={styles.listLabel}>Users</Text>
        <FlatList
          data={users}
          renderItem={userItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default SqLiteOperations;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  form: {
    width: "90%",
    borderWidth: 1,
    alignItems: "center",
  },
  input: {
    width: "70%",
    borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
    margin: 5,
    padding: 10,
  },
  list: {
    flex: 1,
    borderWidth: 1,
    width: "90%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    margin: 5,
    padding: 7,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  email: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  listLabel: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    margin: 5 
  }
});
