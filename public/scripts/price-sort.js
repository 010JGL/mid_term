$(document).ready(function() {
  $("#sort-button").click(function() {
    var shoes = $(".shoe-display");
    shoes.sort(function(a, b) {
      var priceA = parseFloat($(a).find(".price").text().substr(1));
      var priceB = parseFloat($(b).find(".price").text().substr(1));
      return priceA - priceB;
    });
    $(".listed-shoes").html(shoes);
  });
});
