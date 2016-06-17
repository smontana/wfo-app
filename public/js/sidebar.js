const sidebar_btns = document.querySelectorAll('button')
var sections = document.querySelectorAll('.app-section')

// Listen for button clicks
Array.prototype.forEach.call(sidebar_btns, function (btn) {
  var btn_id = event.target.getAttribute(id)
  btn.addEventListener('click', function (event) {
    console.log(btn_id)
    findAndOpenMatchingSection(btn_id)
    event.target.classList.toggle('is-selected')
  })
})

function findAndOpenMatchingSection(btn_id) {
  Array.prototype.forEach.call(sections, function (section) {
    if (btn_id == section) {
      section.toggle('is-shown')
    } else {
      // makes sure any sections that did not have
      // their btn clicked are closed
      document.getElementById(btn_id).className = "";
    }
  })
}
