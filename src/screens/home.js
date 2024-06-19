/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../assets/colors';
import {ms, vs} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextVarient} from '../theme/typography';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  Bag,
  DownArrow,
  Heart,
  PlusIcon,
} from '../assets/images';
import {fetchDataHandler} from '../redux/apiHandler';
import {addToCart} from '../redux/slice';
const Header = ({navigation, Cartcount}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={{
        height: vs(50),
        marginTop: top,
        justifyContent: 'flex-end',
      }}>
      <View
        style={styles.headtitleCo}>
        <Text style={{...TextVarient.h2.bold, color: '#FFFFFF'}}>
          Hey, Kimo
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{
            height: vs(24),
            width: vs(24),
          }}>
          <SvgXml xml={Bag} />
          <View
            style={styles.cartContain}>
            <Text
              style={styles.cartCount}>
              {Cartcount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const DeliveryCompont = () => {
  return (
    <View
      style={styles.deliveryContain}>
      <View style={{height: vs(40)}}>
        <Text
          style={styles.deliverytitle}>
          Delivery to
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={styles.description}>
            Green Way 3000, Sylhet
          </Text>
          <SvgXml xml={DownArrow} />
        </View>
      </View>
      <View style={{height: vs(40)}}>
        <Text
          style={styles.deliveryDes}>
          Within
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={styles.hour}>
            1 Hour
          </Text>
          <SvgXml xml={DownArrow} />
        </View>
      </View>
    </View>
  );
};

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDataHandler(dispatch, 'https://dummyjson.com/products');
  }, []);

  const {items, cart, loading} = useSelector(state => state);
  return (
    <View style={{flex: 1, backgroundColor: Colors.blue60}}>
      <Header navigation={navigation} Cartcount={cart?.length || 0} />
      <DeliveryCompont />
      <View style={{flex: 1, backgroundColor: Colors.black1}}>
        <View style={{paddingHorizontal: ms(20)}}>
          <FlatList
            data={items?.products || []}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              loading && (
                <View
                  style={styles.listEmptycontainer}>
                  <ActivityIndicator size={'large'} />
                </View>
              )
            }
            ListHeaderComponent={
              <View style={{paddingHorizontal: ms(10)}}>
                <Text style={{...TextVarient.h2.regular, letterSpacing: ms(1)}}>
                  Recommended
                </Text>
              </View>
            }
            ItemSeparatorComponent={<View style={{height: vs(10)}} />}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details', item)}
                  style={styles.itemcontainer}>
                  <ImageBackground
                    source={{uri: item?.thumbnail}}
                    imageStyle={styles.itemImage}
                    style={styles.itemContiner}>
                    <View
                      style={styles.heartcontainer}>
                      <SvgXml xml={Heart} />
                    </View>
                    <View style={{marginHorizontal: ms(20)}} />
                    <View
                      style={styles.titleContainer}>
                      <View>
                        <Text
                          style={{...TextVarient.h4.bold, fontSize: ms(15)}}>
                          ${item?.price}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={styles.brandStyle}>
                          {item?.title}, {item.brand}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => dispatch(addToCart({...item, count: 1}))}
                        style={styles.plusContain}>
                        <SvgXml xml={PlusIcon} />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;


const styles = StyleSheet.create({
  listEmptycontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemcontainer:{
    width: '50%',
    backgroundColor: Colors.black1,
    height: vs(150),
    borderRadius: ms(20),
  },
  itemImage:{
    height: vs(150),
    alignItems: 'center',
    backgroundColor: Colors.black10,
    overflow: 'hidden',
    justifyContent: 'space-between',
    opacity: 0.7,
  },
  itemContiner:{
    height: vs(150),
    alignItems: 'center',
    margin: 10,
    backgroundColor: Colors.black10,
    borderRadius: ms(20),
    padding: ms(15),
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  heartcontainer:{
    marginHorizontal: ms(20),
    width: '100%',
    alignItems: 'flex-start',
  },
  titleContainer:{
    flexDirection: 'row',
    marginTop: '35%',
    width: '100%',
    justifyContent: 'space-between',
    height: vs(30),
  },
  brandStyle:{
    ...TextVarient.h4.semibold,
    fontSize: ms(10),
    color: Colors.black45,
    lineHeight: vs(15),
    width: ms(100),
  },
  plusContain:{
    height: vs(18),
    backgroundColor: Colors.blue60,
    width: vs(18),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryContain:{
    backgroundColor: Colors.blue60,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: ms(20),
    justifyContent: 'space-between',
  },
  deliverytitle:{
    ...TextVarient.h4.bold,
    textTransform: 'uppercase',
    fontSize: ms(13),
    color: Colors.black45,
  },
  description:{
    ...TextVarient.h4.bold,
    textTransform: 'capitalize',
    fontSize: ms(14),
    color: Colors.black1,
    marginRight: ms(10),
  },
  deliveryDes:{
    ...TextVarient.h4.bold,
    textTransform: 'uppercase',
    fontSize: ms(13),
    color: Colors.black45,
  },
  hour:{
    ...TextVarient.h4.bold,
    textTransform: 'capitalize',
    fontSize: ms(14),
    color: Colors.black1,
    marginRight: ms(10),
  },
  headtitleCo:{
    flexDirection: 'row',
    height: vs(30),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(20),
  },
  cartContain:{
    backgroundColor: Colors.yellow100,
    height: ms(20),
    zIndex: 99,
    marginTop: -vs(25),
    width: ms(20),
    marginLeft: ms(10),
    borderRadius: ms(20),
    alignItems: 'center',
  },
  cartCount:{
    ...TextVarient.h4.bold,
    color: '#FFFFFF',
    fontSize: ms(15),
  }
})