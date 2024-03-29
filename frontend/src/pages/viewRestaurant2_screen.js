import {StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {useEffect, useState} from "react";
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import MapView, {Marker} from "react-native-maps";

export default function App({ route, navigation }) {
  const { restaurantId, backScreen } = route.params;

  const [ starRating, setStarRating ] = useState(null);
  const [ data, setData ] = useState(null);
  const [ favorites, setFavorites ] = useState([]);
  const [ favoriteCount, setFavoriteCount ] = useState(0);

  const getAndUpdateFavorites = () => {
    const user_route = global.url + 'user/id/' + global.username;
    fetch(user_route, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        switch (response.response) {
          case 200:
            if (response.user.favorites === undefined) return;
            setFavorites(response.user.favorites);
            break;
          default:
            break;
        }
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    const route = global.url + 'restaurant/id/' + restaurantId;
    fetch(route, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        switch (response.response) {
          case 200:
            setData(response.restaurant);
            setFavoriteCount(response.restaurant.favorites);
            setStarRating(averageReviews(response.restaurant));
            break;
          default:
            console.log(response);
            break;
        }
      })
      .catch(error => {
        console.log(error);
      })

      getAndUpdateFavorites();
  }, []);

  const averageReviews = (data) => {
    if (data === null || data.reviews === null) return null;
    let total = 0;
    data.reviews.forEach((item) => total += item.rating);
    return total / data.reviews.length;
  }

  const doFavorite = (action) => {
    const route = global.url + 'favorite/' + action;

    // Modify favorite count locally
    setFavoriteCount(favoriteCount + (action === 'add' ? 1 : -1));

    fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ restaurant_id: restaurantId, auth_key: global.key })
    })
      .then(_ => {
        getAndUpdateFavorites();
      })
      .catch(error => console.log(error));
  }

  const renderFavoriteButton = () => {
    const isFavorited = favorites.includes(restaurantId); // true/false
    return (
      <TouchableOpacity style={styles.touchable_right} onPress={() => doFavorite(isFavorited ? 'remove' : 'add')}>
        <View style={styles.favorite_button}>
          <AntDesign
            style={[(isFavorited ? styles.favorited : styles.not_favorited)]}
            name={isFavorited ? 'heart' : 'hearto'}
            size={ICON_SIZE - 8}
          ></AntDesign>
        </View>
      </TouchableOpacity>
    )
  }

  const renderHeader = () => {
    if (data === null) return null;
    return (
      <View style={styles.header_container}>
        <View style={[styles.button_container, styles.header_button_container]}>
          <TouchableOpacity style={styles.touchable_left} onPress={() => navigation.navigate(backScreen)}>
            <View style={styles.back_button}>
              <Entypo
                style={styles.back_button_content}
                name={'chevron-left'}
                size={ICON_SIZE + 1}
              ></Entypo>
            </View>
          </TouchableOpacity>
          <Text style={styles.favorite_count}>{favoriteCount}</Text>
          {renderFavoriteButton()}
        </View>
        <View style={styles.header_text_container}>
          <Text style={styles.header_title}>{data.name}</Text>
          {renderAddress()}
          {renderStars(ICON_SIZE, starRating)}
        </View>
      </View>
    );
  }

  const renderAddress = () => {
    if (data === null) return null;
    if (data.address === undefined) return null;
    return (
      <Text style={styles.header_address}>{data.address}</Text>
    )
  }
  //REFERENCES: https://stackoverflow.com/questions/61729380/how-to-convert-timestamp-value-to-specific-time-format-using-react-native
  const convertDate = (time) => {
    var curr_date = new Date(time)
    var formatted = ('0' + (curr_date.getMonth() + 1)).slice(-2)
    + '/' + ('0' + curr_date.getDate()).slice(-2) 
    + '/' + (curr_date.getFullYear())

    return (
      <Text style={styles.review_date_text}>{formatted}</Text>
    )
  }

  const renderReview = (item) => {
    return (
      <View style={styles.review_container} key={item.id}>
        <View style={styles.review_title_container}> 
          <Text style={styles.review_user_text}>{item.author} reviewed:</Text>
          <Text style={styles.review_title_text}>{item.title}</Text>
        </View>
        <View style={styles.review_container}>
          {renderStars(20, item.rating)}
          {item.content === undefined ? null : <Text style={styles.review_text}>{item.content}</Text>}
          {convertDate(item.creation_timestamp)}
        </View>
      </View>
    )
  }

  const ICON_SIZE = 28;

  // REFERENCE: https://www.atomlab.dev/tutorials/react-native-star-rating
  const renderStars = (size, rating) => {
    return (
      <View style={styles.stars}>
        <MaterialIcons
          name={rating >= 1 ? 'star' : 'star-border'}
          size={size}
          style={rating >= 1 ? styles.starSelected : styles.starUnselected}
        />
        <MaterialIcons
          name={rating >= 2 ? 'star' : 'star-border'}
          size={size}
          style={rating >= 2 ? styles.starSelected : styles.starUnselected}
        />
        <MaterialIcons
          name={rating >= 3 ? 'star' : 'star-border'}
          size={size}
          style={rating >= 3 ? styles.starSelected : styles.starUnselected}
        />
        <MaterialIcons
          name={rating >= 4 ? 'star' : 'star-border'}
          size={size}
          style={rating >= 4 ? styles.starSelected : styles.starUnselected}
        />
        <MaterialIcons
          name={rating >= 5 ? 'star' : 'star-border'}
          size={size}
          style={rating >= 5 ? styles.starSelected : styles.starUnselected}
        />
      </View>
    );
  }

  const renderMenuNavigation = () => {
    return (
      <View style={styles.menu_navigation_container}>
        <Text style={styles.menu_navigation_header}>Menu</Text>
        <View style={styles.button_container}>
          <TouchableOpacity style={[styles.touchable_left, styles.menu_button_touchable_opacity_left]} 
            onPress={() => navigation.navigate('viewMenu_screen', { restaurantId: restaurantId, backScreen: backScreen })}>
            <View style={styles.menu_button_view}>
              <Text style={styles.menu_button_text}>View</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchable_right, styles.menu_button_touchable_opacity_right]}>
            <View style={styles.menu_button_view}>
              <Text style={styles.menu_button_text}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderMap = () => {
    if (data === null) return null;
    return (
      <View style={styles.map_container}>
        <Text style={styles.map_header}>Map</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.position.latitude,
            longitude: data.position.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          }}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate = {{ latitude: data.position.latitude, longitude: data.position.longitude }}
          />
        </MapView>
      </View>
    );
  }

  const renderAddReviewNavigation = () => {
    if (data === null) return null;
    return (
      <View style={styles.review_header_container}>
        <Text style={styles.review_header_text}>Reviews ({data.reviews.length})</Text>
        <View style={[styles.button_container, styles.add_review_button_container]}>
          <TouchableOpacity style={styles.add_review_button_touchable_opacity} onPress={() => navigation.navigate('addReview_screen', {restaurantId: restaurantId, backScreen: backScreen})}>
            <View style={styles.add_review_button_view}>
              <Text style={styles.add_review_button_text}>Add Review</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {data.reviews.map((item) => renderReview(item))}
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      {renderHeader()}
      {renderMenuNavigation()}
      {renderMap()}
      {renderAddReviewNavigation()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  header_container: {
    backgroundColor: `#333333`,
    flexDirection: 'column',
    marginBottom: 20
  },
  header_text_container: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  header_title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  header_address: {
    fontSize: 20,
    color: '#ffffff'
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header_button_container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  touchable_left: {
    marginRight: 'auto',
  },
  touchable_right: {
    // marginLeft: 'auto',
  },
  favorite_count: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  back_button: {
    flex: 0,
    width: 'auto',
    backgroundColor: '#d4d4d4',
    padding: 20,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  favorite_button: {
    flex: 0,
    width: 'auto',
    backgroundColor: '#d4d4d4',
    padding: 20,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  back_button_content: {
    position: 'absolute',
    marginHorizontal: 'auto',
    width: 30,
    height: 30,
    color: '#000000'
  },
  favorited: {
    position: "absolute",
    color: '#ff0000',
  },
  not_favorited: {
    position: "absolute",
    color: '#333333',
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
  menu_navigation_container: {
    paddingHorizontal: 30
  },
  menu_navigation_header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  menu_button_touchable_opacity_left: {
    width: '48%'
  },
  menu_button_touchable_opacity_right: {
    width: '48%'
  },
  menu_button_view: {
    backgroundColor: '#a1a1a1',
    paddingVertical: 10,
    borderRadius: 1000,
    alignItems: 'center',
    marginBottom: 10,
  },
  menu_button_text: {
    color: '#ffffff',
    fontSize: 18
  },
  map_container: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  map_header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  map: {
    width: '100%',
    height: 200,
    borderStyle: 'solid',
    borderColor: '#555',
    borderWidth: 5
  },
  add_review_button_container: {
    marginBottom: 15
  },
  add_review_button_touchable_opacity: {
    width: 'auto',
    flex: 1,
  },
  add_review_button_view: {
    backgroundColor: '#a1a1a1',
    paddingVertical: 10,
    borderRadius: 1000,
    alignItems: 'center'
  },
  add_review_button_text: {
    color: '#ffffff',
    fontSize: 18
  },
  review_header_container: {
    marginTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 25,
  },
  review_header_text: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  review_container: {
    paddingBottom: 12,
  },
  review_title_container: {
    paddingBottom: 4
  },
  review_user_text: {
    fontSize: 18,
    fontStyle: 'italic',
    paddingBottom: 4,
  },
  review_title_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  review_text: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4
  },
  review_date_text: {
    fontSize: 16,
    color: '#939B9B',
  },
})