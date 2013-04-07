/*jshint laxcomma:true*/


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
      .animate({left: out + "%"}, slide.bind(null, {left: -out + "%"}, {left: "0"}));
  }

  $.each([
    "red",
    "green",
    "blue"
    ], function (indx, item) {
      this.append($("<div>").addClass(item));
    }.bind($artwork));

  active = $artwork
    .children("div")
    .first()
    .css({left: "0"});

  $(document)
    .on("click", ".js-arrows a", arrowEvent);
}(jQuery));