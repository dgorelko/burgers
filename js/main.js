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

// OnePageScroll
$(function() {
    const display = $('.maincontent');
    const sections = $('.section');
    const mobileDetect = new MobileDetect(window.navigator.userAgent);  
    isMobile = mobileDetect.mobile();
    let inScroll = false;

    const switchMenuActiveClass = sectionEq => {
        $('.points__item').eq(sectionEq).addClass('points__item_active')
                        .siblings().removeClass('points__item_active')
    }

    const performTransition = sectionEq => {
        

        if (inScroll == false) {
            inScroll = true;
            const position = (sectionEq * -100) + '%';

            display.css ({
                'transform' : `translateY(${position})`,
                '-webkit-transform' : `translateY(${position})`,
                '-ms-transform' : `translate(0, ${position})`,
                ' -o-transform' : `translate(0, ${position})`,
                ' -moz-transform' : `translate(0, ${position})`,
            })
    
            sections.eq(sectionEq).addClass('active')
                    .siblings().removeClass('active');
            
            setTimeout(() => {
                inScroll = false;
                switchMenuActiveClass(sectionEq);
            }, 650);
        }
        
    }

    const defineSections = sections => {
        const activeSection = sections.filter('.active');
        return {
            activeSection: activeSection,
            nextSection: activeSection.next(),
            prevSection: activeSection.prev()
        }
    }

    const scrollToSection = direction => {
        const section = defineSections(sections);

        if (inScroll) return;

        if (direction == 'up' && section.nextSection.length) { // Scroll down
            performTransition(section.nextSection.index());
        }
        if (direction == 'down' && section.prevSection.length) { // Scroll up
            performTransition(section.prevSection.index());
        }
    }

    $('.wrapper').on({
        'wheel': e => {
            const deltaY = e.originalEvent.deltaY;
            let direction = (deltaY > 0) ? 'up' : 'down';

            scrollToSection(direction);
        },

        'touchmove': e => (e.preventDefault())
    });

    $(document).on('keydown', e => {
        const section = defineSections(sections);

        if (inScroll) return 
        switch (e.keyCode) {
            case 40: //Scroll up
            case 32: //Scroll up for space
                if (!section.nextSection.length) return;
                performTransition(section.nextSection.index());
            break;

            case 38: //Scroll down
                if (!section.prevSection.length) return;
                performTransition(section.prevSection.index());
            break;
        }
    });

    if (isMobile) {
        $(window).swipe({
          swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            scrollToSection(direction);
          }
        })
    }

    $('[data-scroll-to]').on('click touchstart', e => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const sectionIndex = parseInt($this.attr('data-scroll-to'));

        performTransition(sectionIndex);
    });

})

//Carousel
$(function() {
      var owl = $('.owl-carousel');
      $('.owl-carousel').owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            navText: ['','']
      });

      // Go to the next item
      $('.slider__arrow_right').click(function() {
          owl.trigger('next.owl.carousel');
      });
      // Go to the previous item
      $('.slider__arrow_left').click(function() {
          // With optional speed parameter
          // Parameters has to be in square bracket '[]'
          owl.trigger('prev.owl.carousel', [300]);
      });
})

//fancybox
$(function() {
      $("[data-fancybox]").fancybox({
            // Options will go here
      });
})

// Team Accordion
$(function() {
    $('.team-accordion__name').on('click touchstart', e =>{
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
            });
            items.removeClass('team-accordion__item_active');
            item.addClass('team-accordion__item_active');

            content.css({
                'height' : 100 + '%'
            });

        } else {
            item.removeClass('team-accordion__item_active');
            content.css({
                'height' : 0
            });
        }

    });
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

    $('.menu-accordion__link').on('click touchstart', e =>{
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

//Form order

$(function() {
    let submitForm = function (e) {
        e.preventDefault();
    
        let form = $(e.target),
            request = ajaxForm(form);
    
        request.done(function(msg) {
            var mes = msg.mes,
                status = msg.status;

            if (status === 'OK') {
                alert(mes);
               // $('.modal').addClass('active');
                form[0].reset();
            } else{
                alert(mes);
                form[0].reset();
            }
        });
    
        request.fail(function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
            form[0].reset();
        });
    }
    
    var ajaxForm = function (form) {
    
        var url = form.attr('action'),
            data = form.serialize();
    
        return $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'JSON'
        });
    
    }
    
    $('#order-form').on('submit', submitForm);
})

//Yandex Map

$(function() {
    ymaps.ready(init);
    var myMap,
        myPlacemark;    
    
    function init(){     
        myMap = new ymaps.Map("yandexmap", {
            center: [59.94057299, 30.31072784],
            zoom: 11,
            controls: []
            });
        
        myMap.behaviors.disable('scrollZoom');

        myPlacemark1 = new ymaps.Placemark([59.973999, 30.311091], {
                hintContent: 'Mr.Burger на Чапыгина',
                balloonContent: 'улица Чапыгина, 13А'
            }, {
                iconLayout: 'default#image',
                iconImageHref: './images/icons/map-marker.svg'
        });
        
        myPlacemark2 = new ymaps.Placemark([59.94708381, 30.38481688], {
            hintContent: 'Mr.Burger на Тверской',
            balloonContent: 'Тверская улица, 16'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './images/icons/map-marker.svg'
        });

        myPlacemark3 = new ymaps.Placemark([59.91503, 30.486096], {
            hintContent: 'Mr.Burger на Товарищеском',
            balloonContent: 'Товарищеский проспект, 20/27'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './images/icons/map-marker.svg'
        });

        myPlacemark4 = new ymaps.Placemark([59.891295, 30.316907], {
            hintContent: 'Mr.Burger на Московском',
            balloonContent: 'Московский проспект, 103к2'
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
})