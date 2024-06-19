/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors';
import {ms, vs} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextVarient} from '../theme/typography';
import {SvgXml} from 'react-native-svg';
import {BackBlack, BlackBag, Heart} from '../assets/images';
import StarRating from 'react-native-star-rating-widget';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../redux/slice';

const Header = ({navigation, cartCount}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={{
        height: vs(50),
        marginTop: top,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: vs(30),
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: ms(20),
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: ms(40),
            width: ms(40),
            backgroundColor: Colors.black10,
            borderRadius: ms(30),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SvgXml xml={BackBlack} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{
            height: vs(24),
            width: vs(24),
          }}>
          <SvgXml xml={BlackBag} />
          <View
            style={{
              backgroundColor: Colors.yellow100,
              height: ms(20),
              zIndex: 99,
              marginTop: -vs(25),
              width: ms(20),
              marginLeft: ms(10),
              borderRadius: ms(20),
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...TextVarient.h4.bold,
                color: '#FFFFFF',
                fontSize: ms(15),
              }}>
              {cartCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Details = ({navigation, route}) => {
  console.log(route.params, 'Details');
  const {cart} = useSelector(state => state);
  const dispatch = useDispatch();
  const items = route.params;
  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.black1}}>
      <Header navigation={navigation} cartCount={cart.length || 0} />
      <View style={{paddingHorizontal: ms(20), marginTop: vs(20)}}>
        <Text
          numberOfLines={1}
          style={{
            ...TextVarient.h1.regular,
            fontSize: ms(25),
            lineHeight: ms(62),
          }}>
          {items?.brand}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...TextVarient.h1.bold,
            fontSize: ms(25),
            lineHeight: ms(62),
          }}>
          {items?.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: vs(10),
          }}>
          <StarRating starSize={vs(16)} maxStars={5} rating={items?.rating} />
          <Text
            style={{
              ...TextVarient.h4.semibold,
              color: Colors.black20,
              fontSize: ms(14),
            }}>
            110 Review
          </Text>
        </View>
      </View>
    
            <ImageBackground
              source={{uri: items?.images[0]}}
              imageStyle={{
                resizeMode: 'cover',
                height: vs(180),
                width: Dimensions.get('window').width,
              }}
              style={{
                backgroundColor: Colors.black10,
                height: vs(180),
                padding: ms(20),
              }}>
              <View style={{width: '100%', alignItems: 'flex-end'}}>
                <View
                  style={{
                    height: vs(50),
                    backgroundColor: Colors.black1,
                    width: vs(50),
                    borderRadius: vs(20),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <SvgXml xml={Heart} />
                </View>
              </View>
            </ImageBackground>
   
      <View style={{flex: 1, paddingHorizontal: ms(20)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              ...TextVarient.h4.bold,
              color: Colors.blue100,
              fontSize: ms(16),
            }}>
            ${items?.price}/ Unit
          </Text>
          <View
            style={{
              backgroundColor: Colors.blue60,
              alignItems: 'center',
              justifyContent: 'center',
              height: vs(20),
              borderRadius: ms(20),
              marginHorizontal: ms(20),
            }}>
            <Text
              style={{
                ...TextVarient.h4.regular,
                color: Colors.black1,
                fontSize: ms(11),
                paddingHorizontal: ms(10),
              }}>
              {items?.discountPercentage}% OFF
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: vs(20),
          }}>
          <TouchableOpacity
            onPress={() => dispatch(addToCart({...items, count: 1}))}
            style={{
              height: vs(45),
              borderWidth: 1,
              borderRadius: ms(20),
              width: '45%',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: Colors.blue100,
            }}>
            <Text
              style={{
                ...TextVarient.h4.regular,
                fontSize: ms(14),
                color: Colors.blue100,
              }}>
              Add To Cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{
              height: vs(45),
              borderWidth: 1,
              borderRadius: ms(20),
              width: '45%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.blue100,
            }}>
            <Text
              style={{
                ...TextVarient.h4.regular,
                fontSize: ms(14),
                color: Colors.black1,
              }}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              ...TextVarient.h4.regular,
              fontSize: ms(16),
              color: Colors.black100,
            }}>
            Details
          </Text>
          <Text
            style={{
              ...TextVarient.h4.regular,
              fontSize: ms(14),
              color: Colors.black45,
            }}>
            {items?.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};



export default Details;
