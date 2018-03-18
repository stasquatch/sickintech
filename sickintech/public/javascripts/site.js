import '../sass/style.scss';
import $ from 'jquery';
import 'bootstrap';

$('DeleteResource').on('click', function(evt) {
  evt.preventDefault();
  $('DeleteResourceModal').modal('show');
});
