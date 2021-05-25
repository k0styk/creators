import {
    PhoneNumberUtil,
    PhoneNumberFormat as PNF
} from 'google-libphonenumber';

const tools = {
    formatPhone: (phone) => {
        if(!phone){
            return
        }

        try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            const number = phoneUtil.parse(phone, 'RU');

            if (phoneUtil.isPossibleNumber(number)) {
                return phoneUtil.format(number, PNF.INTERNATIONAL);
            } else return;
        }
        catch(_){
         return 
        }
    }
}

export default tools;
