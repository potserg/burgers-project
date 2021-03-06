/* js for Hamburger-menu */

const openMenu = document.querySelector('.ham-menu__img');
const hamburgerMenu = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.ham-exit__btn');
const hamMenuLink = document.querySelectorAll('.ham-menu__link');

let op = 0.2;

let increaseOp = function() {
  setTimeout(function() {
    if(hamburgerMenu.style.opacity < 1) {
      op += 0.2;
      hamburgerMenu.style.opacity = op;
      increaseOp();
    }
  }, 100);
}

openMenu.addEventListener('click', function(e){
  e.preventDefault();
  hamburgerMenu.style.display = 'flex';
  increaseOp();
});

let decreaseOp = function() {
  setTimeout(function() {
    if(hamburgerMenu.style.opacity > 0.1) {
      op -= 0.2;
      hamburgerMenu.style.opacity = op;
      hamburgerMenu.style.display = 'flex';
      decreaseOp();
    } else {
      hamburgerMenu.style.display = 'none';
    }
  }, 100);
}

closeMenu.addEventListener('click', function(e) {
  e.preventDefault();
  decreaseOp();
});

for (let i = 0; i < hamMenuLink.length; i++) {
  hamMenuLink[i].addEventListener('click', function() {
    decreaseOp();
  });
}

hamburgerMenu.addEventListener('click', function(e) {
  if (e.target === hamburgerMenu) {
    decreaseOp();
  }
});

/* jQuery for burgers-slider */

 $(function() {

  var coloringDots = function (index) {
    $('.burgers__sliders')
        .find('.slider__dot-item')
        .eq(index)
        .addClass('active')
        .siblings()
        .removeClass('active');
  }

  var generateDots = function () {
    $('.sliders__item').each(function () {
      var dot = $('<li>', {
        attr: {
          class : 'slider__dot-item'
        },
        html : '<div class="slider__dot-circle"></div>'
      });

      $('.slider__dots').append(dot);
    })
  };

  generateDots();

  var moveSlider = function(container, slideNum) {

    var
        items = container.find('.sliders__item'),
        activeSlider = items.filter('.active'),
        reqItem = items.eq(slideNum),
        reqIndex = reqItem.index(),
        list = container.find('.sliders__list');
        duration = 1000;
    
    if (reqItem.length) {
      list.animate( {
        left : -reqIndex * 100 + '%'
      }, duration, function() {
        activeSlider.removeClass('active');
        reqItem.addClass('active');
        coloringDots(slideNum);
      });
    };
  };

  $('.burgers__scroll-btn').on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
        container = $this.closest('.burgers__sliders'),
        items = container.find('.sliders__item'),
        activeSlider = items.filter('.active'),
        nextItem = activeSlider.next();
        prevItem = activeSlider.prev();

    if ($this.hasClass('burgers__scroll-btn--right')) {
      
      if (nextItem.length) {
        moveSlider(container, nextItem.index());
      } else {
        moveSlider(container, items.first().index());
      }
    } 
    
    if ($this.hasClass('burgers__scroll-btn--left')) {

      if (prevItem.length) {
        moveSlider(container, prevItem.index());
      } else {
        moveSlider(container, items.last().index());
      }
    }
  });

  $('body').on('click', '.slider__dot-item', function () {
    var $this = $(this),
        container = $this.closest('.burgers__sliders'),
        index = $this.index();

    moveSlider(container, index);
    coloringDots(index);
  })

});

/* jQuery for onePageScroll */

const sections = $('.section');
const display = $('.main-content');
let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const performTransition = function(sectionEq) {
  if (inscroll) return;
  inscroll = true;
  const transitionIsOver = 1000;
  const mouseInertionIsOver = 300;
  const position = sectionEq * -100;

  sections
  .eq(sectionEq)
  .addClass('active')
  .siblings()
  .removeClass('active');

  display.css({
    transform: `translateY(${position}%)`
  });
  
  setTimeout(function() {
    inscroll = false;

    $('.sidebar-menu__item')
    .eq(sectionEq)
    .addClass('active')
    .siblings()
    .removeClass('active');

  }, transitionIsOver + mouseInertionIsOver);
};

const scrollToSection = function(direction) {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === 'prev' && prevSection.length) {
    performTransition(prevSection.index());
  }
}

$(window).on('wheel', function(e) {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {e
    scrollToSection('next');
  }

  if (deltaY < 0) {
    scrollToSection('prev');
  }
});

$(window).on('keydown', function(e) {

  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === 'input' || tagName === 'textarea';

  if (userTypingInInputs) return;
  switch(e.keyCode) {
    case 38:
      scrollToSection('prev');
      break;
    case 40:
      scrollToSection('next');
      break;
  };
});

$('[data-scroll-to]').on('click', function(e) {
  e.preventDefault;
  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');

  performTransition(target);
});

if (isMobile) {
  $("body").swipe( {
    swipe:function(
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
    const scrollDirections = direction === 'up' ? 'next' : 'prev';
    scrollToSection(scrollDirections);
    }
  });
};

/* js for team-Accordeon */

const teamAccTrigger = document.querySelectorAll('.team-accordeon__trigger');
const teamAccItem = document.querySelectorAll('.team-accordeon__item');
const teamAccList = document.querySelector('.team-accordeon__list');
const team  = document.querySelector('.team');
  
for (let i = 0; i < teamAccItem.length; i++) {
  teamAccItem[i].addEventListener('click', function(e) {
    e.preventDefault();
    if (teamAccTrigger[i].classList.contains('team-accordeon__trigger--active')) {
      teamAccTrigger[i].classList.remove('team-accordeon__trigger--active');
    } else {
      for (let a = 0; a < teamAccTrigger.length; a++) {
        teamAccTrigger[a].classList.remove('team-accordeon__trigger--active');
        teamAccTrigger[i].classList.add('team-accordeon__trigger--active');
      }
    }
  });
};


/* js for menu-Accordeon */

const menuAccTrigger = document.querySelectorAll('.menu-accordeon__trigger');
const menuAccItem = document.querySelectorAll('.menu-accordeon__item');
const menuAccList = document.querySelector('.menu-accordeon__list');
const menu  = document.querySelector('.menu');
  
for (let i = 0; i < menuAccItem.length; i++) {
  menuAccItem[i].addEventListener('click', function(e) {
    e.preventDefault();
    if (menuAccTrigger[i].classList.contains('menu-accordeon__trigger--active')) {
      menuAccTrigger[i].classList.remove('menu-accordeon__trigger--active');
    } else {
      for (let a = 0; a < menuAccTrigger.length; a++) {
        menuAccTrigger[a].classList.remove('menu-accordeon__trigger--active');
        menuAccTrigger[i].classList.add('menu-accordeon__trigger--active');
      }
    }
    menu.addEventListener('click', function(e) {
      if (e.target === menu) {
        menuAccTrigger[i].classList.remove('menu-accordeon__trigger--active');
      };
    });
  });
};


/* js for reviews */

const openReviews = document.querySelectorAll('.reviews__btn');
const overlayReviews = document.querySelector('.overlay-reviews');
const closeReviews = overlayReviews.querySelector('.reviews-exit__btn');
const overlayName = overlayReviews.querySelector('.overlay-reviews__name');
const overlayText = overlayReviews.querySelector('.overlay-reviews__text');

for (let i = 0; i < openReviews.length; i++) {
  openReviews[i].addEventListener('click', function(e) {
    e.preventDefault();
    overlayReviews.style.display = 'flex';

    let thisParent = this.parentNode;
    let name = thisParent.querySelector('.reviews__name').innerText;
    let text = thisParent.querySelector('.reviews__text p').innerText;

    overlayName.textContent = name;
    overlayText.textContent = text;
  });
};

closeReviews.addEventListener('click', function(e) {
  e.preventDefault();
  overlayReviews.style.display = 'none';
});

overlayReviews.addEventListener('click', function(e) {
  if (e.target === overlayReviews) {
    closeReviews.click();
  };
});

/* js for order-form */

const orderForm = document.querySelector('#order-form');
const sendOrder = document.querySelector('#send-order');
const overlayOrder = document.querySelector('.overlay-order');
const overlayClose = document.querySelector('.order-exit__btn');
let orderMessage = document.querySelector('.overlay-order__message');

sendOrder.addEventListener('click', function(e) {
  e.preventDefault();

  if (validateForm(orderForm)) {

    var formData = new FormData();
    formData.append('name', orderForm.elements.name.value);
    formData.append('phone', orderForm.elements.phone.value);
    formData.append('comment', orderForm.elements.comment.value);
    formData.append('to', 'email@mail.com');

    const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.send(formData);
      xhr.addEventListener('load', function() {
    });

    overlayOrder.style.display = 'flex';

  } else {
    overlayOrder.style.display = 'flex';
    orderMessage.textContent = 'Сообщение не отправлено';
  }
});

overlayClose.addEventListener('click', function(e) {
  e.preventDefault();
  overlayOrder.style.display = 'none';
});

overlayOrder.addEventListener('click', function(e) {
  if (e.target === overlayOrder) {
    overlayClose.click();
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  if (!validateField(form.elements.to)) {
    valid = false;
  }
  if (!validateField(form.elements.comment)) {
    valid = false;
  }

  return valid;
};

function validateField(field) {
  return field.checkValidity();
};

/* js for video player */

const splashPlayer = document.querySelector('.splash-player');
const videoPlayer = document.querySelector('#player');
const playVid = document.querySelector('.video-play');
const playButton = document.querySelector('.vid-bar__icon--play');
const pauseButton = document.querySelector('.vid-bar__icon--pause');
const vidVolume = document.querySelector('.video-volume');
const muteButton = document.querySelector('.vid-bar__icon--mute');
const circleTime = document.querySelector('.vid-bar__icon-circle--scale');
const scaleTime = document.querySelector('.vid-bar__icon--scaletime');
const circleVol = document.querySelector('.vid-bar__icon-circle--volume');
const scaleVol = document.querySelector('.vid-bar__icon--scalevol');


let startVid = function () {
  videoPlayer.play();
  playVid.classList.add('active');
  playButton.style.display = 'none';
  pauseButton.style.display = 'flex';
  console.log(videoPlayer.volume);

  let interval;

  if (typeof interval != 'undefined') {
    clearInterval(interval);
  }
  
  interval = setInterval(function() {
    let durationSec = videoPlayer.duration;
    let comletedSec = videoPlayer.currentTime;
    let scaleVid = (comletedSec / durationSec) * 100 + '%';
    circleTime.style.left = scaleVid;
  }, 500);

};

let stopVid = function () {
  videoPlayer.pause();
  playVid.classList.remove('active');
  playButton.style.display = 'flex';
  pauseButton.style.display = 'none';
};

scaleTime.addEventListener('click', function(e) {
  let timePos = (e.offsetX / e.target.offsetWidth);
  videoPlayer.currentTime = (e.offsetX / e.target.offsetWidth) * videoPlayer.duration;
  timePosPer = timePos * 100 + '%';
  circleTime.style.left = timePosPer;
});

videoPlayer.addEventListener('click', function(e) {

  if (e.target === videoPlayer) {
    if (!playVid.classList.contains('active')) {
      splashPlayer.style.display = 'none';
      startVid();
  
    } else { 
      stopVid();
    }
  }
});

playVid.addEventListener('click', function(e) {

  if (!playVid.classList.contains('active')) {
    startVid();

  } else { 
    stopVid();
  }
});

splashPlayer.addEventListener('click', function(e) {

  if (e.target === splashPlayer) {
    if (!playVid.classList.contains('active')) {
      splashPlayer.style.display = 'none';
      startVid();
    };
  };
});

vidVolume.addEventListener('click', function(e) {
  
  if (!vidVolume.classList.contains('active')) {
    videoPlayer.muted = true;
    vidVolume.classList.add('active');
    muteButton.style.display = 'flex';

  } else {
    videoPlayer.muted = false;
    vidVolume.classList.remove('active');
    muteButton.style.display = 'none';
  }
});

let circleVolPos = videoPlayer.volume * 100 + '%';
circleVol.style.left = circleVolPos;

scaleVol.addEventListener('click', function(e) {
  let volumePos = (e.offsetX / e.target.offsetWidth);
  videoPlayer.volume = (e.offsetX / e.target.offsetWidth);
  volumePosPer = volumePos * 100 + '%';
  circleVol.style.left = volumePosPer;
});

/* js for yandex maps */

ymaps.ready(init);

  var plasemarks = [
    {
      latItude: 61.66890065,
      longItude: 50.83143875,
      hintContent: '<div class="map__hint">Бургер\'Яс №1 БЦ \"Авалон\"</div>',
      balloonContent: [
        '<div class="map__balloon"',
        '<img class = map__burger_img>',
        'Бургер\'Яс №1 БЦ \"Авалон\" Сыктывкар, ул. Первомайская, д.133',
        '</div>'
        ]
    },

    {
      latItude: 61.66397448,
      longItude: 50.81734963,
      hintContent: '<div class="map__hint">Бургер\'Яс №2 \"Карлсон\"</div>',
      balloonContent: [
        '<div class="map__balloon"',
        '<img class = map__burger_img>',
        'Бургер\'Яс №2 \"Карлсон\" Сыктывкар, Коммунистическая, д.31/1',
        '</div>'
        ]
    },
    
    {
      latItude: 61.67071917,
      longItude: 50.83141494,
      hintContent: '<div class="map__hint">Бургер\'Яс №3 \"Администрация\"</div>',
      balloonContent: [
        '<div class="map__balloon"',
        '<img class = map__burger_img>',
        'Бургер\'Яс №3 \"Администрация\" Сыктывкар, ул. Бабушкина, д.22',
        '</div>'
        ]
    }
  ];

  function init(){
    var myMap = new ymaps.Map("map", {
        center: [61.67, 50.82],
        zoom: 13,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

  plasemarks.forEach(function(obj) {
    var placemark = new ymaps.Placemark([obj.latItude, obj.longItude], {
      hintContent: obj.hintContent,
      balloonContent: obj.balloonContent.join('')
    },
    {
      iconLayout: 'default#image',
      iconImageHref: '/img/icons/map-marker.svg',
      iconImageSize: [46, 55],
      iconImageOffset: [-23, -57]
    });
    
    myMap.geoObjects.add(placemark);

  });

};