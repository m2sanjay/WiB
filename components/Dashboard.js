import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Button } from 'react-native-material-ui';
import DrawerContainer from './DrawerContainer';
import MyPage1 from './MyPage1';
import MyPage2 from './MyPage2';
import MyPage4 from './MyPage4';
import MyPage5 from './MyPage5';
import styles from './UtilComponents/main.style';
import FillCardDetailsView from './Views/FillCardDetailsView';
import ListOfCardsView from './Views/ListOfCardsView';
import CardDetailsView from './Views/CardDetailsView';
import TransactionDetailsView from './Views/TransactionDetailsView';
import KYCView from './Views/KYCView';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5Icons from 'react-native-vector-icons/FontAwesome5';
import awsurl from './constants/AWSUrl';


class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      transactionResults: [],
      totalExpense: 0.0,
      totalIncome: 0.0,
      foodAmount: 0.0,
      cashAmount: 0.0,
      retailAmount: 0.0,
      travelAmount: 0.0,
      otherAmount: 0.0,
      medicalAmount: 0.0
    }
    this.getTransactionData = this.getTransactionData.bind(this);

  }
  componentDidMount() {
    this.getTransactionData();
    //this.getCardsData();
  }

  navigateToAddCardPage = () => {
    this
      .props
      .navigation
      .navigate('FillCardDetailsView');
  }
  getTransactionData() {
    
    var cache = require('memory-cache');
    fetch(awsurl.aws_url + 'api/dashBoardTransactions/'+cache.get('cacheEmail'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((responseJson) => {
        this.setState({
          transactionResults: responseJson
        })
        var count = Object.keys(responseJson).length;
        var tempMedical = 0.0;
        var tempCash = 0.0;
        var tempRetail = 0.0;
        var tempFood = 0.0;
        var tempTravel = 0.0;
        var tempOther = 0.0;
        var tempTotalExpense = 0.0;
        var tempTotalIncome = 0.0;
        for (let i = 0; i < responseJson.length; i++) {
          if (parseFloat(this.state.transactionResults[i].details.value.amount) > 0.0) {
            tempTotalExpense = tempTotalExpense + parseFloat(this.state.transactionResults[i].details.value.amount);
            if (this.state.transactionResults[i].details.description.indexOf("Medical") > -1) {
              tempMedical = tempMedical + parseFloat(this.state.transactionResults[i].details.value.amount);
            }
            else if (this.state.transactionResults[i].details.description.indexOf("Food") > -1) {
              tempFood = tempFood + parseFloat(this.state.transactionResults[i].details.value.amount);
            }
            else if (this.state.transactionResults[i].details.description.indexOf("Retail") > -1) {
              tempRetail = tempRetail + parseFloat(this.state.transactionResults[i].details.value.amount);
            }
            else if (this.state.transactionResults[i].details.description.indexOf("Transport") > -1) {
              tempTravel = tempTravel + parseFloat(this.state.transactionResults[i].details.value.amount);
            }
            else if (this.state.transactionResults[i].details.description.indexOf("Cash") > -1) {
              tempCash = tempCash + parseFloat(this.state.transactionResults[i].details.value.amount);
            }
            else {
              tempOther = tempOther + parseFloat(this.state.transactionResults[i].details.value.amount);
            }
          }
          else {
            tempTotalIncome = tempTotalIncome + parseFloat(this.state.transactionResults[i].details.value.amount);

          }


        }
        this.setState({
          foodAmount: tempFood, travelAmount: tempTravel, medicalAmount: tempMedical,
          retailAmount: tempRetail, cashAmount: tempCash, otherAmount: tempOther, totalExpense: tempTotalExpense
        });
      })
      .catch(console.log)

  }
  render() {
    const defaultIcon = <FaIcons name="bar-chart" size={28} color="white" />;
    //const shopIcon = <FaIcons name="shopping-bag" size={28} color="white"/>;
    const cashIcon = <MCIcons name="cash" size={28} color="white" />;
    const retailIcon = <MIcons name="local-grocery-store" size={28} color="white" />;
    const entertainmentIcon = <FA5Icons name="grin-stars" size={28} color="white" />;
    const travelIcon = <FA5Icons name="walking" size={28} color="white" />;
    const foodIcon = <MCIcons name="food" size={28} color="white" />;
    const medicalIcon = <MCIcons name="hospital" size={28} color="white" />;



    return (
      <View style={styles.main}>
        <View>
          <View style={{
            marginLeft: 10,
            marginTop: 10
          }}>
            <Text style={{ color: 'white' }}>Total Spending</Text>
          </View>
          <ImageBackground source={require('../assets/bg_gradient.png')} style={{ backgroundColor: "#293a80", marginTop: 5, height: 60, color: 'white', borderRadius: 3, padding: 5 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  flex: 1,
                  backgroundColor: 'transparent'
                }}>
                {defaultIcon}
              </View>
              <View
                style={{
                  flex: 9,
                  flexDirection: 'column',
                  marginLeft: 10,
                  backgroundColor: 'transparent'
                }}>
                <View style={{ marginTop: 0, backgroundColor: 'transparent' }}>
                  <Text style={{ fontSize: 14, color: 'white' }}>{this.state.totalExpense.toFixed(2)}</Text>
                </View>
                <View style={{ marginTop: 5, backgroundColor: 'transparent' }}>
                  <Text style={{ fontSize: 14, color: 'white' }}>See where you spent in December !</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={{
            height: 30,
          }}>
            <View style={{
              marginLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              flex: 1
            }}>
              <View
                style={{
                  flex: 9,
                  alignContent: 'flex-start'
                }}>
                <Text style={{ color: 'white' }}>Spends</Text></View>
              <View
                style={{
                  marginLeft: 10,
                  flex: 1,
                  alignContent: 'flex-end'
                }}>
                <Text style={{ color: '#3683ff' }}>More</Text></View>
            </View>
          </View>
          <ImageBackground source={require('../assets/bg_gradient.png')} style={{ backgroundColor: "#293a80", marginTop: 5, marginBottom: 5, height: 240, color: 'white', borderRadius: 3, padding: 5 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  flex: 1,
                  backgroundColor: 'transparent'
                }}>
                {foodIcon}
              </View>
              <View
                style={{
                  flex: 9,
                  flexDirection: 'column',
                  marginLeft: 10,
                  marginTop: 15,
                  backgroundColor: 'transparent'
                }}>
                <View style={{ marginTop: 3, flex: 1, flexDirection: 'row' }}>
                  <View style={{ marginTop: 0, flex: 7 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Food</Text>
                  </View>
                  <View style={{ marginTop: 0, flex: 3 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{this.state.foodAmount}</Text>
                  </View>
                </View>
                <View style={{ borderColor: '#85b4ff', marginTop: 22, borderWidth: 0.5, height: 0.5 }}>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  flex: 1,
                  backgroundColor: 'transparent'
                }}>
                {travelIcon}
              </View>
              <View
                style={{
                  flex: 9,
                  flexDirection: 'column',
                  marginLeft: 10,
                  marginTop: 15,
                  backgroundColor: 'transparent'
                }}>
                <View style={{ marginTop: 3, flex: 1, flexDirection: 'row' }}>
                  <View style={{ marginTop: 0, flex: 7 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Travel</Text>
                  </View>
                  <View style={{ marginTop: 0, flex: 3 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{this.state.travelAmount}</Text>
                  </View>
                </View>
                <View style={{ borderColor: '#85b4ff', marginTop: 22, borderWidth: 0.5, height: 0.5 }}>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  flex: 1,
                  backgroundColor: 'transparent'
                }}>
                {retailIcon}
              </View>
              <View
                style={{
                  flex: 9,
                  flexDirection: 'column',
                  marginLeft: 10,
                  marginTop: 15,
                  backgroundColor: 'transparent'
                }}>
                <View style={{ marginTop: 3, flex: 1, flexDirection: 'row' }}>
                  <View style={{ marginTop: 0, flex: 7 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Retail</Text>
                  </View>
                  <View style={{ marginTop: 0, flex: 3 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{this.state.retailAmount}</Text>
                  </View>
                </View>
                <View style={{ borderColor: '#85b4ff', marginTop: 22, borderWidth: 0.5, height: 0.5 }}>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  flex: 1,
                  backgroundColor: 'transparent'
                }}>
                {medicalIcon}
              </View>
              <View
                style={{
                  flex: 9,
                  flexDirection: 'column',
                  marginLeft: 10,
                  marginTop: 15,
                  backgroundColor: 'transparent'
                }}>
                <View style={{ marginTop: 3, flex: 1, flexDirection: 'row' }}>
                  <View style={{ marginTop: 0, flex: 7 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Medical</Text>
                  </View>
                  <View style={{ marginTop: 0, flex: 3 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{this.state.medicalAmount}</Text>
                  </View>
                </View>
                <View style={{ borderColor: '#85b4ff', marginTop: 22, borderWidth: 0.5, height: 0.5 }}>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  flex: 1,
                  backgroundColor: 'transparent'
                }}>
                {cashIcon}
              </View>
              <View
                style={{
                  flex: 9,
                  flexDirection: 'column',
                  marginLeft: 10,
                  marginTop: 15,
                  backgroundColor: 'transparent'
                }}>
                <View style={{ marginTop: 3, flex: 1, flexDirection: 'row' }}>
                  <View style={{ marginTop: 0, flex: 7 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Cash</Text>
                  </View>
                  <View style={{ marginTop: 0, flex: 3 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{this.state.cashAmount}</Text>
                  </View>
                </View>
                <View style={{ borderColor: '#85b4ff', marginTop: 22, borderWidth: 0.5, height: 0.5 }}>
                </View>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  flex: 1,
                  backgroundColor: 'transparent'
                }}>
                {entertainmentIcon}
              </View>
              <View
                style={{
                  flex: 9,
                  flexDirection: 'column',
                  marginLeft: 10,
                  marginTop: 15,
                  backgroundColor: 'transparent'
                }}>
                <View style={{ marginTop: 3, flex: 1, flexDirection: 'row' }}>
                  <View style={{ marginTop: 0, flex: 7 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Other</Text>
                  </View>
                  <View style={{ marginTop: 0, flex: 3 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{this.state.otherAmount}</Text>
                  </View>
                </View>
                <View style={{ borderColor: '#85b4ff', marginTop: 22, borderWidth: 0.5, height: 0.5 }}>
                </View>
              </View>
            </View>
          </ImageBackground>

        </View>
        <View>
          <Text style={localStyles.wordBold}>Lets add a Payment Card</Text>
        </View>
        <View style={localStyles.image}>
          <ImageBackground
            imageStyle={{
              borderRadius: 10
            }}
            style={{
              flex: 1,
              borderRadius: 5,
              width: '100%',
              height: '100%'
            }}
            source={require('../assets/mastercard.jpg')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  marginLeft: 30,
                  marginTop: 30,
                  fontSize: 25
                }}>VISA</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: 10,
                  marginTop: -15
                }}>
                <Image
                  source={require('../assets/hsbc.jpg')}
                  resizeMode='contain'
                  style={{
                    height: 100,
                    width: 80
                  }} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginLeft: 40,
                  marginBottom: 36
                }}>
                <Text style={{
                  fontSize: 17
                }}>&bull; &bull; &bull; &bull; XXXX</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: 10,
                  marginTop: 10
                }}>
                <Image
                  source={require('../assets/american_express.png')}
                  resizeMode='contain'
                  style={{
                    height: 100,
                    width: 80
                  }} />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View>
          <Button
            style={{
              container: {
                height: 45
              }
            }}
            raised
            primary
            text="Add Card"
            onPress={() => this.navigateToAddCardPage()} />
        </View>
      </View>

    );
  }
}

const localStyles = StyleSheet.create({
  wordBold: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  image: {
    marginBottom: 20,
    marginTop: 20,
    overflow: "hidden",
    height: 230,
    borderRadius: 10,
    width: '98%'
  }
});

const DashboardNavigator = createStackNavigator({

  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Dashboard",
      headerLeft: <View>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer()
          }}><Icon name='menu' size={35} color='white' /></TouchableOpacity>
      </View>,
      headerStyle: {
        backgroundColor: '#131642',
        color: 'white'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      }
    })
  }
});

const DrawerStack = createDrawerNavigator({
  Dashboard: {
    screen: DashboardNavigator
  },
  FillCardDetailsView: {
    screen: FillCardDetailsView,
    navigationOptions: {
      headerTitle: "Add Card Details"
    }
  },
  ListOfCardsView: {
    screen: ListOfCardsView,
    navigationOptions: {
      headerTitle: "Your Cards"
    }
  },
  TransactionDetailsView:
  {
    screen: TransactionDetailsView,
    navigationOptions: {
      headerTitle: "Make Transaction"
    }
  },
  KYCView:
  {
    screen: KYCView,
    navigationOptions: {
      headerTitle: "Profile"
    }
  },
  CardDetailsView: {
    screen: CardDetailsView
  },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer
})

export default DrawerStack