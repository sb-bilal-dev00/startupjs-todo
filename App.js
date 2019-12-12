import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  CheckBox
} from "react-native";

const App = () => {
  const [newTodoValue, setNewTodoValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [editValue, setEditValue] = useState("");

  /**
   * Computed
   */

  const completedCount = todoList.filter(t => t.completed).length;

  /**
   * Actions
   */

  const handleEdit = (id, value) => {
    setEditingId(id);
    setEditValue(value);
  };

  const handleEditSubmit = () => {
    if (!editValue.trim()) return;

    const newTodoList = todoList.map(t =>
      t.id !== editingId ? t : { ...t, title: editValue }
    );

    setTodoList(newTodoList);
    setEditingId("");
  };

  const toggleCompleted = id => {
    const newTodoList = todoList.map(t =>
      t.id !== id ? t : { ...t, completed: !t.completed }
    );

    setTodoList(newTodoList);
  };

  const handleDelete = id => {
    const newTodoList = todoList.filter(t => t.id !== id);

    setTodoList(newTodoList);
  };

  const handleSubmit = () => {
    if (!newTodoValue.trim()) return;

    const newTodo = {
      id: todoList.length + 1,
      title: newTodoValue
    };
    setTodoList([newTodo, ...todoList]);
    setNewTodoValue("");
  };

  return (
    <View style={styles.container}>
      <Text>Todo App</Text>
      <View style={{ display: "flex", flexDirection: "row", padding: 20 }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            flex: 1
          }}
          onChangeText={text => setNewTodoValue(text)}
          value={newTodoValue}
          onSubmitEditing={handleSubmit}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>

      <View style={{ display: "flex", flexDirection: "row", padding: 20 }}>
        <Text>
          Completed/All: {completedCount}/{todoList.length}
        </Text>
      </View>

      {todoList.map(({ id, title, completed }) => (
        <View key={id}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 20
            }}
          >
            {editingId === id ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    flex: 1
                  }}
                  autoFocus
                  onChangeText={text => setEditValue(text)}
                  value={editValue}
                  onSubmitEditing={handleEditSubmit}
                />
                <Button title="Submit" onPress={handleEditSubmit} />
              </View>
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={{ flex: 1 }} onPress={() => handleEdit(id, title)}>
                  <Text>{title}</Text>
                </TouchableOpacity>

                <View style={{ display: "flex", flexDirection: "row" }}>
                  <CheckBox
                    value={completed}
                    onChange={() => toggleCompleted(id)}
                  />

                  <Button
                    title="Delete"
                    onPress={() => handleDelete(id)}
                    color="red"
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
