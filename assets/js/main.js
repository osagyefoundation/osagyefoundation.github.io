console.log(
  "%c Proudly Crafted with ZiOn.",
  "background: #222; color: #bada55",
);

/* ---------------------------------------------- /*
 * Preloader
 /* ---------------------------------------------- */
(function () {
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $(".page-loader").delay(350).fadeOut("slow");
  });

  $(document).ready(function () {
    /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
         /* ---------------------------------------------- */

    wow = new WOW({
      mobile: false,
    });
    wow.init();

    /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $(".scroll-up").fadeIn();
      } else {
        $(".scroll-up").fadeOut();
      }
    });

    $('a[href="#totop"]').click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });

    /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

    var homeSection = $(".home-section"),
      navbar = $(".navbar-custom"),
      navHeight = navbar.height(),
      worksgrid = $("#works-grid"),
      width = Math.max($(window).width(), window.innerWidth),
      mobileTest = false;

    (function setSiteFavicon() {
      var faviconHref = "/assets/images/wenchi1/Logo.png";
      var head = document.head || document.getElementsByTagName("head")[0];

      if (!head) {
        return;
      }

      var existingIcons = head.querySelectorAll(
        'link[rel~="icon"], link[rel="shortcut icon"]',
      );

      existingIcons.forEach(function (node) {
        head.removeChild(node);
      });

      var icon = document.createElement("link");
      icon.rel = "icon";
      icon.type = "image/png";
      icon.href = faviconHref;
      head.appendChild(icon);

      var shortcutIcon = document.createElement("link");
      shortcutIcon.rel = "shortcut icon";
      shortcutIcon.type = "image/png";
      shortcutIcon.href = faviconHref;
      head.appendChild(shortcutIcon);
    })();

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      mobileTest = true;
    }

    buildHomeSection(homeSection);
    navbarAnimation(navbar, homeSection, navHeight);
    navbarSubmenu(width);
    hoverDropdown(width, mobileTest);

    $(window).resize(function () {
      var width = Math.max($(window).width(), window.innerWidth);
      buildHomeSection(homeSection);
      hoverDropdown(width, mobileTest);
    });

    $(window).scroll(function () {
      effectsHomeSection(homeSection, this);
      navbarAnimation(navbar, homeSection, navHeight);
    });

    (function initHeroScrollReveal() {
      var hero = document.querySelector(".hero-viewport");
      if (!hero || hero.id === "home") {
        return;
      }

      var title = hero.querySelector(".module-title");
      if (!title) {
        return;
      }

      var textWrap = title.closest(".hero-text-panel") || title.parentElement;
      if (!textWrap) {
        return;
      }

      Array.prototype.forEach.call(textWrap.children, function (child) {
        if (child !== title) {
          child.classList.add("hero-scroll-content");
        }
      });

      hero.classList.add("hero-scroll-collapsed");

      function revealOnScroll() {
        if (window.scrollY > 5) {
          hero.classList.remove("hero-scroll-collapsed");
        }
      }

      revealOnScroll();
      window.addEventListener("scroll", revealOnScroll, { passive: true });
    })();

    /* ---------------------------------------------- /*
         * Set sections backgrounds
         /* ---------------------------------------------- */

    var module = $(".home-section, .module, .module-small, .side-image");
    module.each(function (i) {
      if ($(this).attr("data-background")) {
        $(this).css(
          "background-image",
          "url(" + $(this).attr("data-background") + ")",
        );
      }
    });

    /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */

    function buildHomeSection(homeSection) {
      if (homeSection.length > 0) {
        if (homeSection.hasClass("home-full-height")) {
          homeSection.height($(window).height());
        } else {
          homeSection.height($(window).height() * 0.85);
        }
      }
    }

    /* ---------------------------------------------- /*
         * Home section effects
         /* ---------------------------------------------- */

    function effectsHomeSection(homeSection, scrollTopp) {
      if (homeSection.length > 0) {
        var homeSHeight = homeSection.height();
        var topScroll = $(document).scrollTop();
        if (
          homeSection.hasClass("home-parallax") &&
          $(scrollTopp).scrollTop() <= homeSHeight
        ) {
          homeSection.css("top", topScroll * 0.55);
        }
        if (
          homeSection.hasClass("home-fade") &&
          $(scrollTopp).scrollTop() <= homeSHeight
        ) {
          var caption = $(".caption-content");
          caption.css("opacity", 1 - (topScroll / homeSection.height()) * 1);
        }
      }
    }

    /* ---------------------------------------------- /*
         * Intro slider setup
         /* ---------------------------------------------- */

    if ($(".hero-slider").length > 0) {
      $(".hero-slider").flexslider({
        animation: "fade",
        animationSpeed: 1000,
        animationLoop: true,
        prevText: "",
        nextText: "",
        before: function (slider) {
          $(".titan-caption")
            .fadeOut()
            .animate(
              { top: "-80px" },
              { queue: false, easing: "swing", duration: 700 },
            );
          slider.slides.eq(slider.currentSlide).delay(500);
          slider.slides.eq(slider.animatingTo).delay(500);
        },
        after: function (slider) {
          $(".titan-caption")
            .fadeIn()
            .animate(
              { top: "0" },
              { queue: false, easing: "swing", duration: 700 },
            );
        },
        useCSS: true,
      });
    }

    /* ---------------------------------------------- /*
         * Rotate
         /* ---------------------------------------------- */

    $(".rotate").textrotator({
      animation: "dissolve",
      separator: "|",
      speed: 3000,
    });

    /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

    function navbarAnimation(navbar, homeSection, navHeight) {
      var topScroll = $(window).scrollTop();
      if (navbar.length > 0 && homeSection.length > 0) {
        if (topScroll >= navHeight) {
          navbar.removeClass("navbar-transparent");
        } else {
          navbar.addClass("navbar-transparent");
        }
      }
    }

    /* ---------------------------------------------- /*
         * Navbar submenu
         /* ---------------------------------------------- */

    function navbarSubmenu(width) {
      if (width > 767) {
        $(".navbar-custom .navbar-nav > li.dropdown").hover(function () {
          var MenuLeftOffset = $(".dropdown-menu", $(this)).offset().left;
          var Menu1LevelWidth = $(".dropdown-menu", $(this)).width();
          if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
            $(this).children(".dropdown-menu").addClass("leftauto");
          } else {
            $(this).children(".dropdown-menu").removeClass("leftauto");
          }
          if ($(".dropdown", $(this)).length > 0) {
            var Menu2LevelWidth = $(".dropdown-menu", $(this)).width();
            if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
              $(this).children(".dropdown-menu").addClass("left-side");
            } else {
              $(this).children(".dropdown-menu").removeClass("left-side");
            }
          }
        });
      }
    }

    /* ---------------------------------------------- /*
         * Navbar hover dropdown on desctop
         /* ---------------------------------------------- */

    function hoverDropdown(width, mobileTest) {
      if (width > 767 && mobileTest !== true) {
        $(
          ".navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown",
        ).removeClass("open");
        var delay = 0;
        var setTimeoutConst;
        $(
          ".navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown",
        ).hover(
          function () {
            var $this = $(this);
            setTimeoutConst = setTimeout(function () {
              $this.addClass("open");
              $this.find(".dropdown-toggle").addClass("disabled");
            }, delay);
          },
          function () {
            clearTimeout(setTimeoutConst);
            $(this).removeClass("open");
            $(this).find(".dropdown-toggle").removeClass("disabled");
          },
        );
      } else {
        $(
          ".navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown",
        ).unbind("mouseenter mouseleave");
        $(".navbar-custom [data-toggle=dropdown]")
          .not(".binded")
          .addClass("binded")
          .on("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().siblings().removeClass("open");
            $(this)
              .parent()
              .siblings()
              .find("[data-toggle=dropdown]")
              .parent()
              .removeClass("open");
            $(this).parent().toggleClass("open");
          });
      }
    }

    /* ---------------------------------------------- /*
         * Navbar collapse on click
         /* ---------------------------------------------- */

    $(document).on("click", ".navbar-collapse.in", function (e) {
      if (
        $(e.target).is("a") &&
        $(e.target).attr("class") != "dropdown-toggle"
      ) {
        $(this).collapse("hide");
      }
    });

    /* ---------------------------------------------- /*
         * Video popup, Gallery
         /* ---------------------------------------------- */

    $(".video-pop-up").magnificPopup({
      type: "iframe",
    });

    $(".gallery-item").magnificPopup({
      delegate: "a",
      type: "image",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
      },
      image: {
        titleSrc: "title",
        tError: "The image could not be loaded.",
      },
    });

    /* ---------------------------------------------- /*
         * Portfolio
         /* ---------------------------------------------- */

    var worksgrid = $("#works-grid"),
      worksgrid_mode,
      worksgridStatic =
        worksgrid.data("static-grid") === true ||
        worksgrid.data("static-grid") === "true";

    if (worksgrid.length && !worksgridStatic) {
      if (worksgrid.hasClass("works-grid-masonry")) {
        worksgrid_mode = "masonry";
      } else {
        worksgrid_mode = "fitRows";
      }

      worksgrid.imagesLoaded(function () {
        worksgrid.isotope({
          layoutMode: worksgrid_mode,
          itemSelector: ".work-item",
        });
      });

      $("#filters a").click(function () {
        $("#filters .current").removeClass("current");
        $(this).addClass("current");
        var selector = $(this).attr("data-filter");

        worksgrid.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });

        return false;
      });
    }

    /* ---------------------------------------------- /*
         * Testimonials
         /* ---------------------------------------------- */

    if ($(".testimonials-slider").length > 0) {
      $(".testimonials-slider").flexslider({
        animation: "slide",
        smoothHeight: true,
      });
    }

    /* ---------------------------------------------- /*
         * Post Slider
         /* ---------------------------------------------- */

    if ($(".post-images-slider").length > 0) {
      $(".post-images-slider").flexslider({
        animation: "slide",
        smoothHeight: true,
      });
    }

    /* ---------------------------------------------- /*
         * Progress bar animations
         /* ---------------------------------------------- */

    $(".progress-bar").each(function (i) {
      $(this).appear(function () {
        var percent = $(this).attr("aria-valuenow");
        $(this).animate({ width: percent + "%" });
        $(this).find("span").animate({ opacity: 1 }, 900);
        $(this)
          .find("span")
          .countTo({ from: 0, to: percent, speed: 900, refreshInterval: 30 });
      });
    });

    /* ---------------------------------------------- /*
         * Funfact Count-up
         /* ---------------------------------------------- */

    $(".count-item").each(function (i) {
      $(this).appear(function () {
        var number = $(this).find(".count-to").data("countto");
        $(this)
          .find(".count-to")
          .countTo({ from: 0, to: number, speed: 1200, refreshInterval: 30 });
      });
    });

    /* ---------------------------------------------- /*
         * Youtube video background
         /* ---------------------------------------------- */

    $(function () {
      $(".video-player").mb_YTPlayer();
    });

    $("#video-play").click(function (event) {
      event.preventDefault();
      if ($(this).hasClass("fa-play")) {
        $(".video-player").playYTP();
      } else {
        $(".video-player").pauseYTP();
      }
      $(this).toggleClass("fa-play fa-pause");
      return false;
    });

    $("#video-volume").click(function (event) {
      event.preventDefault();
      if ($(this).hasClass("fa-volume-off")) {
        $(".video-player").YTPUnmute();
      } else {
        $(".video-player").YTPMute();
      }
      $(this).toggleClass("fa-volume-off fa-volume-up");
      return false;
    });

    /* ---------------------------------------------- /*
         * Owl Carousel
         /* ---------------------------------------------- */

    $(".owl-carousel").each(function (i) {
      // Check items number
      if ($(this).data("items") > 0) {
        items = $(this).data("items");
      } else {
        items = 4;
      }

      // Check pagination true/false
      if (
        $(this).data("pagination") > 0 &&
        $(this).data("pagination") === true
      ) {
        pagination = true;
      } else {
        pagination = false;
      }

      // Check navigation true/false
      if (
        $(this).data("navigation") > 0 &&
        $(this).data("navigation") === true
      ) {
        navigation = true;
      } else {
        navigation = false;
      }

      // Build carousel
      $(this).owlCarousel({
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>',
        ],
        nav: navigation,
        dots: pagination,
        loop: true,
        dotsSpeed: 400,
        items: items,
        navSpeed: 300,
        autoplay: 2000,
      });
    });

    /* ---------------------------------------------- /*
         * Blog masonry
         /* ---------------------------------------------- */

    $(".post-masonry").imagesLoaded(function () {
      $(".post-masonry").masonry();
    });

    /* ---------------------------------------------- /*
         * Scroll Animation
         /* ---------------------------------------------- */

    $(".section-scroll").bind("click", function (e) {
      var anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top - 50,
          },
          1000,
        );
      e.preventDefault();
    });

    function initStaticForm(options) {
      var $form = $(options.formSelector);

      if (!$form.length || !window.fetch) {
        return;
      }

      $form.on("submit", function (e) {
        e.preventDefault();

        var formElement = this;
        var endpoint = formElement.getAttribute("action") || "";
        var $response = options.responseSelector
          ? $(options.responseSelector)
          : $();
        var $submit = options.submitSelector
          ? $(options.submitSelector)
          : $form.find('[type="submit"]');
        var originalLabel = "";

        if ($submit.length) {
          if ($submit.is("button")) {
            originalLabel = $submit.text();
            if (options.pendingText) {
              $submit.text(options.pendingText);
            }
          } else {
            originalLabel = $submit.val();
            if (options.pendingText) {
              $submit.val(options.pendingText);
            }
          }
          $submit.prop("disabled", true);
        }

        if (!endpoint || endpoint.indexOf("CHANGE_ME@example.com") !== -1) {
          if ($response.length) {
            $response.html(
              '<span class="text-warning">Configure the form action to point at your submission endpoint.</span>',
            );
          }
          if ($submit.length) {
            if ($submit.is("button")) {
              $submit.text(originalLabel);
            } else {
              $submit.val(originalLabel);
            }
            $submit.prop("disabled", false);
          }
          return;
        }

        var formData = new FormData(formElement);

        fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        })
          .then(function (response) {
            if (!response.ok) {
              throw response;
            }

            if ($response.length && options.successMessage) {
              $response.html(options.successMessage);
            } else if ($response.length) {
              $response.html(
                '<span class="text-success">Thanks! We will be in touch soon.</span>',
              );
            }

            formElement.reset();
          })
          .catch(function () {
            if ($response.length) {
              $response.html(
                '<span class="text-danger">We could not send your request. Please contact us directly.</span>',
              );
            }
          })
          .then(function () {
            if ($submit.length) {
              if ($submit.is("button")) {
                $submit.text(originalLabel);
              } else {
                $submit.val(originalLabel);
              }
              $submit.prop("disabled", false);
            }
          });
      });
    }

    initStaticForm({
      formSelector: "#contactForm",
      submitSelector: "#cfsubmit",
      responseSelector: "#contactFormResponse",
      pendingText: "Sending...",
      successMessage:
        '<span class="text-success">Message sent! We will reach out soon.</span>',
    });

    initStaticForm({
      formSelector: "#requestACall",
      submitSelector: "#racSubmit",
      responseSelector: "#requestFormResponse",
      pendingText: "Sending...",
      successMessage:
        '<span class="text-success">Request received! We will call you shortly.</span>',
    });

    initStaticForm({
      formSelector: "#reservationForm",
      submitSelector: "#rfsubmit",
      responseSelector: "#reservationFormResponse",
      pendingText: "Sending...",
      successMessage:
        '<span class="text-success">Reservation request received! We will confirm soon.</span>',
    });

    initStaticForm({
      formSelector: "#subscription-form",
      submitSelector: "#subscription-form-submit",
      responseSelector: "#subscription-response",
      pendingText: "Wait...",
      successMessage: '<span class="text-success">You are subscribed!</span>',
    });

    initLeadershipRotation();
    initScrollReveal();

    function initLeadershipRotation() {
      var rotator = document.querySelector('[data-rotator="executive"]');
      if (!rotator) {
        return;
      }

      var flip = rotator.querySelector(".leadership-flip");
      var front = rotator.querySelector(".leadership-face-front");
      var back = rotator.querySelector(".leadership-face-back");

      if (!flip || !front || !back) {
        return;
      }

      var executives = [
        {
          name: "Thomas Raphael Affare",
          title: "Executive Director & CEO",
          summary: "Steers strategy and partnerships for the foundation.",
          image: "assets/images/wenchi1/execdirector.png",
        },
        {
          name: "Person3",
          title: "Education Consultant",
          summary: "Guides academic initiatives and learning partnerships.",
          image: "assets/images/wenchi1/patronandteamonly.jpg",
        },
        {
          name: "Person4",
          title: "Health Consultant",
          summary: "Strengthens community health programming.",
          image: "assets/images/wenchi1/execdirector.png",
        },
        {
          name: "Person5",
          title: "Tourism & Culture Consultant",
          summary: "Champions cultural heritage experiences.",
          image: "assets/images/wenchi1/execdirector.png",
        },
        {
          name: "Person6",
          title: "Technology & ICT Consultant",
          summary: "Leads innovation and digital transformation projects.",
          image: "assets/images/wenchi1/patronandteam.jpg",
        },
        {
          name: "Person7",
          title: "Construction & Projects Consultant",
          summary: "Oversees infrastructure and capital projects.",
          image: "assets/images/wenchi1/execdirector.png",
        },
        {
          name: "Person8",
          title: "Board Member",
          summary: "Supports governance and strategic oversight.",
          image: "assets/images/wenchi1/patronandteam.jpg",
        },
        {
          name: "Person9",
          title: "Board Member",
          summary: "Advances stakeholder engagement and governance.",
          image: "assets/images/wenchi1/execdirector.png",
        },
        {
          name: "Person10",
          title: "Board Member",
          summary: "Provides advisory support to the board.",
          image: "assets/images/wenchi1/execdirector.png",
        },
        {
          name: "Person11",
          title: "Director of Finance",
          summary: "Ensures fiscal stewardship and accountability.",
          image: "assets/images/wenchi1/execdirector.png",
        },
      ];

      var currentIndex = 0;
      var showingFront = true;
      var rotationInterval = 6000;
      var rotationTimerId;
      var isAnimating = false;

      rotator.setAttribute("role", "button");
      rotator.setAttribute("tabindex", "0");

      function populateFace(faceElement, executive) {
        if (!faceElement || !executive) {
          return;
        }

        var photo = faceElement.querySelector(".leadership-photo img");
        if (photo) {
          photo.src = executive.image;
          photo.alt = "Portrait of " + executive.name;
        }

        var name = faceElement.querySelector(".leadership-name");
        if (name) {
          name.textContent = executive.name;
        }

        var title = faceElement.querySelector(".leadership-title");
        if (title) {
          title.textContent = executive.title;
        }

        var summary = faceElement.querySelector(".leadership-summary");
        if (summary) {
          summary.textContent = executive.summary;
        }
      }

      function getVisibleFace() {
        return showingFront ? front : back;
      }

      function getHiddenFace() {
        return showingFront ? back : front;
      }

      function updateAriaStates() {
        if (!front || !back) {
          return;
        }

        front.setAttribute("aria-hidden", showingFront ? "false" : "true");
        back.setAttribute("aria-hidden", showingFront ? "true" : "false");
      }

      function updateHeight(referenceFace) {
        if (!flip || !referenceFace) {
          return;
        }

        flip.style.height = referenceFace.offsetHeight + "px";
      }

      function scheduleNext() {
        clearTimeout(rotationTimerId);
        rotationTimerId = window.setTimeout(function () {
          advanceRotation();
        }, rotationInterval);
      }

      function advanceRotation() {
        if (isAnimating) {
          return;
        }

        clearTimeout(rotationTimerId);
        isAnimating = true;

        var nextIndex = (currentIndex + 1) % executives.length;
        var incomingFace = getHiddenFace();

        populateFace(incomingFace, executives[nextIndex]);
        updateHeight(incomingFace);

        rotator.classList.toggle("is-flipped");
        showingFront = !showingFront;
        updateAriaStates();
        currentIndex = nextIndex;
      }

      flip.addEventListener("transitionend", function (event) {
        if (event.propertyName === "transform") {
          updateHeight(getVisibleFace());
          isAnimating = false;
          scheduleNext();
        }
      });

      rotator.addEventListener("click", function (event) {
        event.preventDefault();
        advanceRotation();
      });

      rotator.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          advanceRotation();
        }
      });

      populateFace(front, executives[currentIndex]);
      populateFace(back, executives[(currentIndex + 1) % executives.length]);
      updateHeight(front);
      updateAriaStates();
      scheduleNext();
    }

    function initScrollReveal() {
      var selectors = [
        ".module > .container",
        ".module-small > .container",
        ".module",
        ".module-small",
        ".home-section > .container",
        ".footer .container",
        ".widget",
        ".features-item",
        ".content-box",
        ".team-item",
      ];
      var revealTargets = [];

      function registerElement(element) {
        if (!element) {
          return;
        }

        if (!element.classList.contains("scroll-reveal")) {
          element.classList.add("scroll-reveal");
        }

        if (revealTargets.indexOf(element) === -1) {
          revealTargets.push(element);
        }
      }

      selectors.forEach(function (selector) {
        var elements = document.querySelectorAll(selector);
        Array.prototype.forEach.call(elements, registerElement);
      });

      var manualElements = document.querySelectorAll("[data-scroll-reveal]");
      Array.prototype.forEach.call(manualElements, registerElement);

      var existingClassElements = document.querySelectorAll(".scroll-reveal");
      Array.prototype.forEach.call(existingClassElements, registerElement);

      if (!revealTargets.length) {
        return;
      }

      if (!("IntersectionObserver" in window)) {
        revealTargets.forEach(function (element) {
          element.classList.add("is-visible");
        });
        return;
      }

      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
      );

      revealTargets.forEach(function (element) {
        observer.observe(element);
      });
    }

    /* ---------------------------------------------- /*
         * Google Map
         /* ---------------------------------------------- */

    if ($("#map").length == 0 || typeof google == "undefined") return;

    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, "load", init);

    var mkr = new google.maps.LatLng(40.67, -74.2);
    var cntr = mobileTest ? mkr : new google.maps.LatLng(40.67, -73.94);

    function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,
        scrollwheel: false,
        // The latitude and longitude to center the map (always required)
        center: cntr, // New York

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on",
              },
              {
                saturation: "-11",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [
              {
                saturation: "22",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                saturation: "-58",
              },
              {
                color: "#cfcece",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "labels.text",
            stylers: [
              {
                color: "#f8f8f8",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#999999",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "labels.text.stroke",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#f9f9f9",
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                color: "#f2f2f2",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
              {
                saturation: "-19",
              },
              {
                lightness: "-2",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 45,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#d8e1e5",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#dedede",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text",
            stylers: [
              {
                color: "#cbcbcb",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9c9c9c",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
      };

      // Get the HTML DOM element that will contain your map
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById("map");

      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);

      // Let's also add a marker while we're at it
      var image = new google.maps.MarkerImage(
        "assets/images/map-icon.png",
        new google.maps.Size(59, 65),
        new google.maps.Point(0, 0),
        new google.maps.Point(24, 42),
      );

      var marker = new google.maps.Marker({
        position: mkr,
        icon: image,
        title: "Titan",
        infoWindow: {
          content:
            "<p><strong>Rival</strong><br/>121 Somewhere Ave, Suite 123<br/>P: (123) 456-7890<br/>Australia</p>",
        },
        map: map,
      });
    }
  });
})(jQuery);
