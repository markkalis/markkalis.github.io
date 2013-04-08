/*jshint laxcomma:true*/

var $doc = $(document);

$("html")
  .addClass("js")
  .removeClass("no-js");


/* Arrow Navigation and Image Loading
  */
(function ($) {
  var active
    , active_next
    , _artwork = ".artwork"
    , $artwork = $(_artwork);

  function fade () {
    active = active_next
      .hide()
      .css("left", 0)
      .fadeIn(800);
  }

  function slide (start, end) {
    active = active_next
      .css(start)
      .animate(end);
  }

  function arrowEvent (event) {
    event.preventDefault();

    var adv = event.target.hash === "#+"
      , out = adv ? -100 : 100;

    active_next = active[adv ? "next" : "prev"]();

    if (!active_next.length || !/div/i.test(active_next[0].nodeName)) {
      active_next = $artwork.children("div")[adv ? "first" : "last"]();
    }

    active
      .animate({left: out + "%"}, fade);
      // .animate({left: out + "%"}, slide.bind(null, {left: -out + "%"}, {left: "0"}));
  }

  [
    "img/DSC_0271.png",
    "img/DSC_0416.png",
    "img/watching-Katrina.png"
    ].forEach(function (item) {
      $("<img />")
        .attr("src", item)
        .wrap("<div>")
        .parent()
        .appendTo($artwork);
    });

  active = $artwork
    .children("div")
    .first()
    .css({left: "0"});

  $doc
    .on("click", ".js-arrows a", arrowEvent);
}(jQuery));

/* Menu and Info showing
  */
(function ($) {
  var menu
    , nav;

  nav = $("body > nav");

  menu = $("<ul>")
    .appendTo(nav);

  $("section")
    .children("article")
    .map(function (indx, item) {
      var link, text;

      text = $(item)
        .children("h2")
        .first()
        .text();

      link = $("<a>")
        .attr("href", "#" + item.id)
        .text(text);

      return $("<li>")
        .append(link)[0];
    })
    .appendTo(menu);

  nav
    .on("click", "a", function (event) {
      event.stopPropagation();
      $(".info").show();
    });

  $.fn.ready(function () {
    if (nav.find('[href="' + window.location.hash + '"]').length) {
      $(".info").show();
    }
  });

  $doc
    .on("click", function (event) {
      var chain;

      chain = $(event.target)
        .parents()
        .andSelf()
        .filter(".info");

      if (!chain.length) {
        $doc.trigger("close-info");
      }
    })
    .on("close-info", function (event) {
      window.location.hash = "home";
      $(".info").hide();
    })
    .on("keyup", function (event) {
      if (event.keyCode === 27) {
        $doc.trigger("close-info");
      }
    });
}(jQuery));