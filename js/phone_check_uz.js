
    var country_phone_code = '998';
    var provider_phone_code = {
        '90': 7,
        '91': 7,
        '92': 7,
        '93': 7,
        '94': 7,
        '95': 7,
        '96': 7,
        '97': 7,
        '98': 7,
        '99': 7
    };

    var error;
    window.onload = function(){
        var field = $('input[name="phone"]');
        for(var i = 0; i < field.length; i++){
          var error = $("<div style='color:black;margin-bottom: 1em; display: block; text-align: center;' class='error-phone'></div>");
          error.insertAfter(field[i]);
        }
    };

    function phone_check(e){

        var field = $(e).find('input[name="phone"]');
        var error = $(e).find('.error-phone');
        var phone_number = field[0].value;

        // Trimming string
        phone_number = phone_number.replace(/[^\d]/g, '');
        phone_number = phone_number + "";

        if(phone_number[0] === '0' && phone_number[1] === '0'){
            phone_number = phone_number.slice(2);
        }

        console.log(phone_number);

        // Checks for country code
        var country_code_check = phone_number.search(country_phone_code) === 0;
        if(country_code_check){
            phone_number = phone_number.slice(country_phone_code.length);
        }
        console.log(phone_number);

        // Check for provider code
        var real_provider_phone_code = Object.keys(provider_phone_code).filter(function(code){
            return phone_number.search(code) === 0 || (phone_number.search(code) === 1 && phone_number[0] === '0')
        });

        var provider_key;
        if(real_provider_phone_code.length > 0){
            provider_key = real_provider_phone_code[0];
            var slice_len = 0;
            if(provider_key[0] !== phone_number[0]){
                slice_len = 1;
            }
            phone_number = phone_number.slice(real_provider_phone_code[0].length + slice_len);
        } else {
          // error.html('Invalid number format')
          // return false;
          return true;
        }

        console.log(phone_number);

        // Check for final length
        if(phone_number.length !== provider_phone_code[provider_key]){
          // error.html('Invalid number format')
          // return false;
          return true;
        }

        error.html('')
        field[0].value = country_phone_code + provider_key + phone_number;

        return true;
    }
