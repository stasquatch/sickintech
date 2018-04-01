$("#DeleteResource").on("click", evt => {
  evt.preventDefault();
  let resourceName = $('input[name="title"]').val();
  $(".delete-modal-resource-name").text(resourceName);
  $("#DeleteResourceModal").modal("show");
});
