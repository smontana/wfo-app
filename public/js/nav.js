function findAndOpenMatchingSection(btn_id) {
  // hideAllSections();
  var sections = document.querySelectorAll(".container section");

  var selected_section_id = btn_id.id += '_sec';
  var selected_section = document.getElementById(selected_section_id);
  // selected_section.classList.add('is-shown');
  // console.log(selected_section);
 
  Array.prototype.forEach.call(sections, function (section) { 

    if (selected_section_id == section.id) {
      section.classList.add('is-shown');
    } else {
      section.classList.remove('is-shown');
    }
  });
}

function hideAllSections () {
  const sects = document.querySelectorAll('.container section .is-shown');
  Array.prototype.forEach.call(sects, function (section) {
    section.classList.remove('is-shown');
  });
}
