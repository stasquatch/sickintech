import $ from "jquery";

window.$ = $;
require("bootstrap/dist/js/bootstrap.bundle.min.js");
require("../sass/style.scss");

$("#DeleteResource").on("click", function(evt) {
  evt.preventDefault();
  $("#DeleteResourceModal").modal("show");
});
