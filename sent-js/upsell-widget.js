class UpsellWidget {

  cookieName = 'upsell-goods';

  buttonClassAdded = 'added-upsell';
  buttonOfferAttribute = 'data-offer';
  buttonTextActive = 'Добавить товар';
  buttonTextAdded = 'Убрать товар';

  constructor() {
    this.notificationWrapper = document.querySelector('.notification-top-wrapper');
    this.notificationQuantity = this.notificationWrapper.querySelector('.notification-top-quantity');
    this.notificationGoods = this.notificationWrapper.querySelector('.notification-top-goods');
    this.notificationButton = this.notificationWrapper.querySelector('button.notification-top-button');
    this.notificationInput = this.notificationWrapper.querySelector('input.notification-top-input');

    this.upsellGoodsForms = document.querySelectorAll('.offer_section form');
    this.upsellGoods = this.parseUpsellGoods();


    this.addedGoods = this.checkAddedGoods();

    this.disableGoodsForms();
    this.prepareGoodsFormsButtons();

    this.init();

  }


  parseUpsellGoods() {
    var result = [];
    if(this.upsellGoodsForms){
      this.upsellGoodsForms.forEach((item, i) => {
        var offer = item.querySelector('input[name="offer"]').value;
        var button = item.querySelector('button');

        result.push({
          offer: offer,
          button: button
        });
      });
    }

    return result;
  }


  checkAddedGoods() {
    // First checks the cookies
    var rawCookie = this.getCookie(this.cookieName);
    var jsonCookie = [];
    try {
      jsonCookie = JSON.parse(rawCookie);
    } catch (e) {
      console.log(e);
      jsonCookie = [];
    }

    jsonCookie = jsonCookie ? jsonCookie : [];

    return jsonCookie;
  }


  getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    // console.log(match);
    return match ? match[2] : false;
  }


  setCookie(name, value, expiresDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }


  handleFormSubmit(event) {
    event.preventDefault();
    return false;
  }


  disableGoodsForms() {
    if(this.upsellGoodsForms){
      this.upsellGoodsForms.forEach((item, i) => {
        item.addEventListener('submit', this.handleFormSubmit.bind(this));
      });
    }
  }


  handleButtonClick(event) {
    var target = event.currentTarget;
    var offer = target.getAttribute(this.buttonOfferAttribute);

    if(target.classList.contains(this.buttonClassAdded)){
      // Then goes for removing the item from upsell
      this.removeGoodFromUpsell(offer);
      this.changeButton(target, false);
    } else {
      // Then just adds the item in upsell and cookies
      this.addGoodToUpsell(offer);
      this.changeButton(target, true);
    }
  }


  changeButton(button, status){
    if(status == true){
      // Then product has been added
      button.classList.add(this.buttonClassAdded);
      button.innerText = this.buttonTextAdded;
    } else {
      // Then product is active
      button.classList.remove(this.buttonClassAdded);
      button.innerText = this.buttonTextActive;
    }
  }


  prepareGoodsFormsButtons() {
    if(this.upsellGoods){
      this.upsellGoods.forEach((item, i) => {

        item.button.setAttribute(this.buttonOfferAttribute, item.offer);

        item.button.addEventListener('click', this.handleButtonClick.bind(this));

        // Then check for added goods in cookies
        if(this.addedGoods){
          this.addedGoods.forEach((good, j) => {
            if(good['offer'] == item['offer']){
              this.changeButton(item.button, true);
            }
          });

        }
      });
    }
  }


  addGoodToUpsell(offer) {

    var selectedUpsellGood = false;

    this.upsellGoods.forEach((item, i) => {
      if(item.offer == offer){
        selectedUpsellGood = item;
      }
    });

    // Check if it is already in the upsell
    var addedCond = false;
    this.addedGoods.forEach((item, i) => {
      if(item.offer == offer){
        addedCond = true;
      }
    });

    // Decides what to do
    if(addedCond == false && selectedUpsellGood){

      this.addedGoods.push(
        selectedUpsellGood
      );

      var jsonAddedGoods = JSON.stringify(this.addedGoods);

      // First updates cookie
      // this.setCookie(this.cookieName, jsonAddedGoods, 1);

      // Then updates input
      this.notificationInput.value = jsonAddedGoods;

      // Finally updates notification
      this.updateNotification(this.addedGoods.length);
    }

  }


  removeGoodFromUpsell(offer) {

    var selectedUpsellGood = false;

    this.upsellGoods.forEach((item, i) => {
      if(item.offer == offer){
        selectedUpsellGood = item;
      }
    });

    // Check if it is already in the upsell
    var addedCond = false;
    this.addedGoods.forEach((item, i) => {
      if(item.offer == offer){
        addedCond = true;
      }
    });

    // Decides what to do
    if(addedCond == true && selectedUpsellGood){

      var tempAddedGoods = [];

      this.addedGoods.forEach((item, i) => {
        if(item.offer != offer){
          tempAddedGoods.push(item);
        }
      });
      this.addedGoods = tempAddedGoods;

      var jsonAddedGoods = JSON.stringify(this.addedGoods);

      // First updates cookie
      // this.setCookie(this.cookieName, jsonAddedGoods, 1);

      // Then updates input
      this.notificationInput.value = jsonAddedGoods;

      // Finally updates notification
      this.updateNotification(this.addedGoods.length);

    }


  }


  updateNotification(count) {
    if(count <= 0){
      // Hides the notification
      this.notificationWrapper.style.display = 'none';
      this.notificationQuantity.innerText = 0;
      this.notificationGoods.innerText = 'товаров';
    } else {
      // Shows the notification
      this.notificationWrapper.style.display = 'block';
      this.notificationQuantity.innerText = count;

      // Defines the right word
      var word = 'товаров';

      if(count == 1){
        word = 'товар';
      } else if (count > 1 && count < 5) {
        word = 'товара';
      } else if (count > 5) {
        word = 'товаров';
      }

      this.notificationGoods.innerText = word;
    }
  }


  init() {
    if(this.addedGoods.length > 0){
      // Show notification and update input
      this.notificationInput.value = JSON.stringify(this.addedGoods);
      this.updateNotification(this.addedGoods.length);
    } else {
      this.updateNotification(0);
    }
  }

}

// Initiates
const upsellWidget = new UpsellWidget();
