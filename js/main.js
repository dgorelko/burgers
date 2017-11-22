$( document ).ready(function() {
let hamburger = document.querySelector(".nav-hamburger");
let menu = document.querySelector(".greeting__menu");

hamburger.addEventListener("click", function() {
    if(hamburger.classList.contains("nav-hamburger_active")) {
          hamburger.classList.remove("nav-hamburger_active");
          menu.classList.remove("greeting__menu_active");

    }else{
          hamburger.classList.add("nav-hamburger_active");
          menu.classList.add("greeting__menu_active");
    }
});

//Onepage-scroll config
$(".maincontent").onepage_scroll({
      sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
      easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                       // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
      animationTime: 500,             // AnimationTime let you define how long each section takes to animate
      pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
      updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
      beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
      afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
      loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
      keyboard: true,                  // You can activate the keyboard controls
      responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                       // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                       // the browser's width is less than 600, the fallback will kick in.
      direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
   });

//Carousel
      var owl = $('.owl-carousel');
      $('.owl-carousel').owlCarousel({
            items: 1,
            nav: false,
            navText: ['','']
      });
      
      // Go to the next item
      $('.slider__arrow_right').click(function() {
          owl.trigger('next.owl.carousel');
      })
      // Go to the previous item
      $('.slider__arrow_left').click(function() {
          // With optional speed parameter
          // Parameters has to be in square bracket '[]'
          owl.trigger('prev.owl.carousel', [300]);
      })

//fancybox
      $("[data-fancybox]").fancybox({
            // Options will go here
      });

// Team Accordion
$(function() {
    $('.team-accordion__name').on('click', e =>{
        e.preventDefault()

        const $this = $(e.currentTarget);
        const container = $this.closest('.team-accordion');
        const item = $this.closest('.team-accordion__item');
        const items = container.find('.team-accordion__item');
        const content = item.find('.team-accordion__content');
        const otherContent = container.find('.team-accordion__content');

        if (!item.hasClass('team-accordion__item_active')) {

            otherContent.css({
                'height' : 0
            })
            items.removeClass('team-accordion__item_active');
            item.addClass('team-accordion__item_active');

            content.css({
                'height' : 100 + '%'
            })

        } else {
            item.removeClass('team-accordion__item_active');
            content.css({
                'height' : 0
            })
        }

    })
})

//Menu Accordion
$(function() {
    function reqWidth(){ 
        var e = $(window).width(),
            t = $(".menu-accordion__link"),
            n = t.width(),
            i = e - n * t.length;
            return i > 550 ? 550 : i
        }

    $('.menu-accordion__link').on('click', e =>{
        e.preventDefault()

        const $this = $(e.currentTarget);
        const container = $this.closest('.menu-accordion');
        const menu = $this.closest('.menu-accordion__item');
        const menus = container.find('.menu-accordion__item');
        const content = menu.find('.menu-accordion__description');
        const text = menu.find('.menu-accordion__text');
        const otherContent = container.find('.menu-accordion__description');

        if (!menu.hasClass('menu-accordion__item_active')) {

            otherContent.css({
                'width' : 0
            })

            menus.removeClass('menu-accordion__item_active');
            menu.addClass('menu-accordion__item_active');

            content.css({
                'width' : reqWidth()
            })

        } else {
            menu.removeClass('menu-accordion__item_active');

                content.css({
                    'width' : 0
                    })     
        }

    })
})

//Yandex Map
    ymaps.ready(init);
    var myMap,
        myPlacemark;    
    
    function init(){     
        myMap = new ymaps.Map("yandexmap", {
            center: [59.94057299, 30.31072784],
            zoom: 12,
            controls: []
            });
        
        myMap.behaviors.disable('scrollZoom');

        myPlacemark1 = new ymaps.Placemark([59.97025753, 30.31517629], {
                hintContent: 'Москва!',
                balloonContent: 'Столица России'
            }, {
                iconLayout: 'default#image',
                iconImageHref: './images/icons/map-marker.svg'
        });
        
        myPlacemark2 = new ymaps.Placemark([59.94560494, 30.38918380], {
            hintContent: 'Москва!',
            balloonContent: 'Столица России'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './images/icons/map-marker.svg'
        });

        myPlacemark3 = new ymaps.Placemark([59.91173819, 30.50006632], {
            hintContent: 'Москва!',
            balloonContent: 'Столица России'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './images/icons/map-marker.svg'
        });

        myPlacemark4 = new ymaps.Placemark([59.88712818, 30.31918887], {
            hintContent: 'Москва!',
            balloonContent: 'Столица России'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './images/icons/map-marker.svg'
        });

        myMap.geoObjects.add(myPlacemark1)
                        .add(myPlacemark2)
                        .add(myPlacemark3)
                        .add(myPlacemark4);
        
    }


});