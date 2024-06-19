/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StyleSheet,
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
import {BackBlack} from '../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, decreaseQuantity} from '../redux/slice';

const TagItem = ({totalPrice, title}) => {
  return (
    <View
      style={styles.tagContainer}>
      <Text
        style={styles.tagTitle}>
        {title}
      </Text>
      <Text
        style={styles.price}>
        $ {totalPrice}
      </Text>
    </View>
  );
};
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
        style={styles.headContain}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <SvgXml xml={BackBlack} />
        </TouchableOpacity>

        <Text
          style={styles.shopingtitle}>
          Shopping Cart ({cartCount})
        </Text>
      </View>
    </View>
  );
};
const Cart = ({navigation}) => {
  const {cart, totalPrice} = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: Colors.black1}}>
      <Header navigation={navigation} cartCount={cart.length || 0} />
      <View style={{marginHorizontal: ms(20), marginTop: vs(30)}} />
      <FlatList
        data={cart}
        ItemSeparatorComponent={
          <View
            style={styles.itemSaprator}
          />
        }
        renderItem={({item}) => {
          return (
            <View
              style={styles.itemcontain}>
              <View
                style={styles.imageContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: item.images[0]}}
                    style={styles.img}
                  />

                  <View style={{marginLeft: ms(10), width: '50%'}}>
                    <Text
                      numberOfLines={1}
                      style={{...TextVarient.h4.regular, fontSize: ms(14)}}>
                      {item?.title}
                    </Text>
                    <Text style={{...TextVarient.h4.regular, fontSize: ms(14)}}>
                      $ {item?.price}
                    </Text>
                  </View>
                </View>

                <View
                  style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => dispatch(addToCart(item))}
                    style={styles.cartCount}>
                    <Text style={{...TextVarient.h2.regular}}>+</Text>
                  </TouchableOpacity>

                  <Text
                    style={styles.count}>
                    {item.count}
                  </Text>

                  <TouchableOpacity
                    onPress={() => dispatch(decreaseQuantity(item))}
                    style={styles.cartCount}>
                    <Text style={{...TextVarient.h2.regular}}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View
        style={styles.totalContainer}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <TagItem title="Subtotal" totalPrice={totalPrice} />
          <TagItem title="Delivery" totalPrice={2} />
          <TagItem title="Total" totalPrice={totalPrice + 2} />
        </View>

        <View
          style={styles.checkoutBtn}>
          <Text
            style={styles.checkoutTitle}>
            Proceed To checkout
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Cart;


const styles = StyleSheet.create({
  itemSaprator:{
    height: vs(10),
    marginHorizontal: ms(20),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black20,
  },
  itemcontain:{
    height: vs(55),
    marginHorizontal: ms(20),
    justifyContent: 'center',
  },
  imageContainer:{
    flexDirection: 'row',
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img:{
    height: ms(40),
    width: ms(40),
    borderRadius: ms(5),
    backgroundColor: Colors.black10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCount:{
    height: ms(40),
    width: ms(40),
    backgroundColor: Colors.black10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(40),
  },
  count:{
    ...TextVarient.h4.regular,
    marginHorizontal: ms(15),
    fontSize: ms(15),
  },
  totalContainer:{
    backgroundColor: Colors.black10,
    marginHorizontal: ms(10),
    borderTopRightRadius: ms(40),
    borderTopLeftRadius: ms(40),
    alignItems: 'center',
    padding: ms(20),
    justifyContent: 'space-between',
    height: vs(160),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkoutBtn:{
    height: vs(45),
    borderWidth: 1,
    borderRadius: ms(20),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue100,
  },
  checkoutTitle:{
    ...TextVarient.h4.semibold,
    fontSize: ms(14),
    color: Colors.black1,
  },
  tagContainer:{
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: vs(20),
  },
  tagTitle:{
    ...TextVarient.h4.regular,
    fontSize: ms(14),
    color: Colors.black45,
  },
  price:{
    ...TextVarient.h4.semibold,
    fontSize: ms(14),
    color: Colors.black100,
  },
  headContain:{
    flexDirection: 'row',
    height: vs(30),
    alignItems: 'center',
    paddingHorizontal: ms(20),
  },
  backBtn:{
    height: ms(40),
    width: ms(40),
    backgroundColor: Colors.black10,
    borderRadius: ms(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopingtitle:{
    ...TextVarient.h4.bold,
    color: Colors.black100,
    fontSize: ms(15),
    marginLeft: ms(15),
  }
})