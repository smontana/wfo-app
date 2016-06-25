const storage = require('electron-json-storage')
const _ = require('lodash')

global.sharedObj = {
  active_section: null
};

// const nav_btn_arr = [
//   'homepage_',
//   'interactions_',
//   'attendance_',
//   'productivity_',
//   'qpa_'
// ];
// const is_nav_btn = _.includes(nav_btn_arr, selected_section_id)

// Default to the view that was active the last time the app was open
storage.get('activeSectionButtonId', function (err, id) {
  if (err) return console.error(err)

  if (id && id.length) {
    const section = document.getElementById(id)
    if (section) section.click()
  } else {
    activateDefaultSection()
  }
})

const elements = document.querySelectorAll(".main-click-el")
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function(event) {
    console.log(event)
    const selected_section_id = event.target.id
    handleSectionTrigger(event, selected_section_id)
  });
}

// document.body.addEventListener('click', function (event) {
//   console.log(event)
//   const selected_section_id = event.target.id

//   if (event.target.nodeName == 'BUTTON' || event.target.nodeName == 'DIV') {
//     handleSectionTrigger(event, selected_section_id)
//   }
// })

function handleSectionTrigger(event, open_section_id) {
  hideAllSectionsAndDeselectButtons(open_section_id)

  event.target.classList.add('is-selected')

  const section_id = event.target.getAttribute('id') + 'sec'

  console.log(section_id)
  global.sharedObj.active_section = section_id;

  document.getElementById(section_id).classList.add('is-shown')

  // Save currently active button in localStorage
  const buttonId = event.target.getAttribute('id')
  storage.set('activeSectionButtonId', buttonId, function (err) {
    if (err) return console.error(err)
  })
}

function activateDefaultSection () {
  document.getElementById('homepage_').click()
}

function hideAllSectionsAndDeselectButtons (open_section_id) {
  const leave_open_section_id = open_section_id + 'sec'
  const sections = document.querySelectorAll('.app-section')
  Array.prototype.forEach.call(sections, function (section) {
    const this_id = section.getAttribute('id')

    if (this_id !== leave_open_section_id) {
      section.classList.remove('is-shown')
    }
  })

  const buttons = document.querySelectorAll('button')
  Array.prototype.forEach.call(buttons, function (button) {
    const this_btn_id = button.getAttribute('id')
    
    if (this_btn_id !== open_section_id) {
      button.classList.remove('is-selected')
    }
  })
}
