import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {MaterialIcons} from "@expo/vector-icons";

const Box = ({children}) => (
  <View style={styles.box}>
    {children}
  </View>
)

Box.propTypes = {
  children: PropTypes.node.isRequired,
}

const AddButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.addButton_container}>
    <Text style={styles.addButton_Text}>{title}Add</Text>
  </TouchableOpacity>
)

export default function App({route, navigation}) {
  const {restaurantId, backScreen} = route.params;

  const [charCount, setCharCount] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [starRating, setStarRating] = useState(5);

  const processContent = (body) => {
    setContent(body);
    setCharCount(body.length);
  }

  // REFERENCE: https://www.atomlab.dev/tutorials/react-native-star-rating
  const renderStars = (size, rating) => {
    return (
      <View style={styles.stars}>
        <TouchableOpacity onPress={() => setStarRating(1)}>
          <MaterialIcons
            name={rating >= 1 ? 'star' : 'star-border'}
            size={size}
            style={rating >= 1 ? styles.starSelected : styles.starUnselected}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarRating(2)}>
          <MaterialIcons
            name={rating >= 2 ? 'star' : 'star-border'}
            size={size}
            style={rating >= 2 ? styles.starSelected : styles.starUnselected}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarRating(3)}>
          <MaterialIcons
            name={rating >= 3 ? 'star' : 'star-border'}
            size={size}
            style={rating >= 3 ? styles.starSelected : styles.starUnselected}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarRating(4)}>
          <MaterialIcons
            name={rating >= 4 ? 'star' : 'star-border'}
            size={size}
            style={rating >= 4 ? styles.starSelected : styles.starUnselected}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarRating(5)}>
          <MaterialIcons
            name={rating >= 5 ? 'star' : 'star-border'}
            size={size}
            style={rating >= 5 ? styles.starSelected : styles.starUnselected}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddReview = () => {
    const route = global.url + 'review/add'
    fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({restaurant_id: restaurantId, rating: starRating, title: title, content: content, auth_key: global.key})
    })
      .then(response => response.json())
      .then(response => {
        switch (response.response) {
          case 200:
            navigation.navigate('viewRestaurant2_screen', {restaurantId: restaurantId, backScreen: backScreen})
            break;
          default:
            console.log(response);
            break;
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.app_container}>
      <Box>
        <Text style={styles.boxText}> What's Good?</Text>
      </Box>

      <ScrollView>
        <View style={styles.center_container}>
          <Text style={{fontSize: 35}}> Add A Review</Text>
        </View>

        <View style={styles.entries_layout}>
          <Text style={styles.entries_titles}> Rating: </Text>
          {renderStars(30, starRating)}
        </View>

        <View style={styles.entries_layout}>
          <Text style={styles.entries_titles}> Title: </Text>
          <TextInput style={styles.entryInput} placeholder="Title of review..."
                     onChangeText={(text) => setTitle(text)}/>
        </View>

        <Text style={styles.characterCount}>max: {charCount}/200 </Text>

        <View style={styles.bodyEntry_layout}>
          <Text style={styles.entries_titles}> Body: </Text>
          <TextInput style={styles.multilineEntryInput}
                     placeholder="Write review..."
                     onChangeText={body => processContent(body)}
                     editable
                     multiline
                     maxLength={200}
          />
        </View>

      </ScrollView>

      <AddButton onPress={() => handleAddReview()} />

    </View>
  );
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: '#959889',
  },
  box: {
    backgroundColor: '#C4DAC2',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#C4DAC2',
    padding: 10,
    margin: 0,
    marginBottom: 0,
  },
  boxText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '50',
  },
  center_container: {
    alignItems: 'center',
    marginTop: 20,
  },
  entries_layout: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 25,
    alignItems: 'center',
  },
  entries_titles: {
    fontSize: 24,
    marginTop: 12,
  },
  entryInput: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white',
    width: '65%',
    height: '70%',
    marginLeft: 10,
    padding: 8,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
  },
  multilineEntryInput: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white',
    width: '65%',
    height: '70%',
    marginLeft: 10,
    padding: 8,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    paddingTop: 10,
  },
  bodyEntry_layout: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  characterCount: {
    marginLeft: 270,
    marginTop: 25,
  },
  addButton_container: {
    elevation: 8,
    backgroundColor: "#C4DAC2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
  },
  addButton_Text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});