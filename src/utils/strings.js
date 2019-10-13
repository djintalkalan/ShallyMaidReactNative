// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

export let strings = new LocalizedStrings({
    "en-US": {
        app_name: "Shally Maid",
        login: "LOGIN",
        hint_booking_date: "Click here to select:",
        place_request: "Place Request",
        logout_dialog_title: "Logout!",
        logout_dialog_message: "Are you sure you want to logout ?",
        logout: "Logout",
        logout_msg: "Logged out successfully",
        cancel: "Cancel",
        ok: "OK",
        signUp: "SIGNUP",
        change_password: "Change Password",
        my_orders: "My Orders",
        dateString: "Date",
        processing: "Processing",
        old_password_error: "Please Enter Old Password",
        valid_password_error: "Please Enter Valid Password",
        new_password_error: "Please Enter New Password",
        confirm_pass_error: "Please Confirm your Password",
        conform_password_error: "Password Mismatch",
        order_text: "Your Order was placed successfully",
        order_text_modified: "Your Order was modified successfully",
        ordercode_text: "Your Order Number is",
        orderreceive_text: "We will call you shortly ",
        enquiry_text: "If you have any inquires about your order you may contact us on following.",
        order_confirmation: "Order Confirmation",

    },
    en: {
        app_name: "Shally Maid",
        login: "Login",
        hint_booking_date: "Click here to select:",
        place_request: "Place Request",
        logout_dialog_title: "Logout!",
        logout_dialog_message: "Are you sure you want to logout ?",
        logout: "Logout",
        dateString: "Date",
        processing: "Processing",
        logout_msg: "Logged out successfully",
        cancel: "Cancel",
        ok: "OK",
        change_password: "Change Password",
        old_password_error: "Please Enter Old Password",
        valid_password_error: "Please Enter Valid Password",
        new_password_error: "Please Enter New Password",
        confirm_pass_error: "Please Confirm your Password",
        conform_password_error: "Password Mismatch",
        order_text: "Your Order was placed successfully",
        order_text_modified: "Your Order was modified successfully",
        ordercode_text: "Your Order code is",
        orderreceive_text: "You will receive your order in ",
        enquiry_text: "If you have any inquires about your order you may contact us on following.",
        order_confirmation: "Order Confirmation",
    }
});