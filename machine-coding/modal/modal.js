import Modal from './reusableModal.js';

const btnElem = document.getElementById('openDialogBtn');
const dialog = document.getElementById('dialog');
const closeBtn = document.getElementById('closeBtn');

// btnElem.addEventListener("click", ()=>{
//     dialog.showModal();
// })

// closeBtn.addEventListener("click", ()=>{
//     dialog.close();
// })

const modal = new Modal();

document.getElementById("openDialogBtn")
  .addEventListener("click", () => {

    modal.open({
      title: "Welcome",
      content: `
        <p>This is reusable dialog modal.</p>
      `
    });

});