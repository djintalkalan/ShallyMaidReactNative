// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

export let strings = new LocalizedStrings({
    "en-US": {
        app_name: "Shally Maid",
        login:"Login"
        
    },
    en: {
        app_name: "Shally Maid",
        login:"Login"
    }
});