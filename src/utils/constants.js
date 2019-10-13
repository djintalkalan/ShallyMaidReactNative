// import GlobalStyle from './styles'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Images } from '../utils'

export const Constants = {
  color: {
    primary: "#2dc137",  // '#ff9900',//'#A51A2D',//'#00EF00',//'#A51A2D', #
    primaryDark: '#ff9900',//'#8D1E30',
    accentColor: '#FF4081',
    drakgray: '#92929A',
    colorAccent: '#FF4081',
    nav_background: '#A51A2D',
    text_color_header: '#FFFFFF',
    hint_color: '#FFFFFF',
    cont_button_bg: '#fec93e',
    star_color: '#ff9800',
    white_alpha_fifty: 'rgba(255,255,255,0.5)',
    black_alpha_fifty: 'rgba(0,0,0,0.5)',
    gray: '#E6E6E6',
    dark_gray: '#aaa',
    white: '#fff',
    seperator_color: '#fafafa',
    seperator_color_single_food: '#f6f6f6',
    black: '#000',
    basket_header: '#404040',
    sub_total_text: '#aaaaaa',
    voucher_code_color: '#555555',
    select_location_background: '#f6f6f6',
    select_location_border: '#d4d4d4',
    green_background: '#64DC17',
    bg_light: '#FAFAFA',
    slider_text_color: '#3e3e3e',
    background_for_header: '#d5dce4',
    background_slider_recycler: '#f2f2f2',
    background_slider_button: '#A51A2D',
    cart_counter: '#4cd964',
    green_status: '#64DC17',
    line_color: '#cccccc',
    text_green: '#4cd964',
    red: '#FFE90E1C',
    redl: '#FFF70212',
    balcktranparent: '#40000000',
    placeholder_grey: '#AAADC4',
    placeholder_grey_20: '#33AAADC4',
    button_disable: '#FFE97887',
    fontBlack: '#000',
    fontWhite: '#ffffff',
    rating: '#ff9800',
  },
  fontSize: {
    LargeXXX: 26,
    LargeXX: 24,
    LargeX: 22,
    NormalXXX: 20,
    NormalXX: 18,
    NormalX: 16,
    SmallXXX: 14,
    SmallXX: 12,
    SmallX: 10,

  },

  URL: {
    HOME_URL: 'http://192.168.0.102',
    STAGING_URL: 'http://192.168.0.102',
    //baseURL: 'http://192.168.0.102',
    baseURL: 'https://kartforu.com/deepak',
    assets: '/shally_maid_api/assets/',
    icons: 'icons/',
    img: 'img/',
    vesrion: 'shally_maid_api/api',
    serviceList: "services/read.php",
    getImage: "services/read_image.php",
    serviceSingle: "services/read_single.php",
    login: "customer/login.php",
    updatePassword: "customer/update_password.php",
    placeOrder: "orders/create.php",
    getOrderList: "orders/read_by_customer.php",
    signUp: "customer/create.php"
  },

  API_METHOD: {
    get: 'GET',
    post: 'POST',
    delete: 'DELETE',
    put: 'PUT'
  },

  login: {
    commonWidth: 280,
  },

  currency: {
    dollar: '$ ',
    rupees: '₹ ',
  },
  // GOOGLE_API_KEY:'AIzaSyCDWUA0lqwsl6PluGO9wPdaP4yFggja1xE',
  GOOGLE_API_KEY: 'AIzaSyCECNx6YKAjaYfP9Eq7FXAMB1QmjUKvMZk',
  // GOOGLE_API_KEY: 'AIzaSyAIJLGdYQ-q1XW3-Lq9ANHfxU-A2YMNz3A',

  language: {
    english: 'en',
  },

  Screen: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    scale: Dimensions.get('window').scale,
    fontScale: Dimensions.get('window').fontScale,
  },
  AppConstant: {
    isUserLoggedIn: false,
    userName: 'User Name',
    statusBarHeight: getStatusBarHeight(false),
    storeDetailsData: null,
    productDetailsData: null,
    addressListData: [],
    loginUserData: {},
    homepageData: [],
    orderListData: []
  },
  STORAGE_KEY: {
    isVisitedSteps: 'IS_VISITED_STEPS',
    selectedLocation: 'SELECTED_LOCATION',
    filterRestaurants: 'RESTAURANT_LIST_FILTERS',
    isLogin: 'IS_LOGIN',
    userData: 'USER_DATA',
    adminData: 'ADMIN_DATA',
    basketData: 'BASKET_DATA',
  },
  PLATFORM: {
    android: 'android',
    ios: 'ios'
  },
  TOOLBAR_HEIGHT: {
    android: 44,
    ios: 44,
  },
  EVENTS: {
    liveLocation: 'LIVE_LOCATION'
  },

  collapseViewHeight: 200,
  DELIVERY_TYPE: {
    pickup: "pickup",
    delivery: "delivery"
  },

  ORDER_STATUS: {
    processing_0: 0,
    processing_1: 1,
    preparing_2: 2,
    preparing_3: 3,
    on_the_way_4: 4,
    delivered_5: 5,
    cancelled_6: 6,
    confirmed_7: 7,
  },







}


