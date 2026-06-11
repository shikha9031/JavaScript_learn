export default class Modal {
    constructor(){
        this.dialog = document.createElement("dialog");
        this.dialog.innerHTML = `
            <div class="modal-header">
                 <h2 class="modal-title"></h2>
                 <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body"></div>
        `;
        document.body.appendChild(this.dialog);

         this.titleElem = document.querySelector('.modal-title');
         this.bodyElem = document.querySelector('.modal-body');
         this.closeBtnElem = document.querySelector('.close-btn');

        this.closeBtnElem.addEventListener("click", ()=>{
            this.close();
        })

        // close when clicking outside
        this.dialog.addEventListener("click", (e)=>{
            const rect = this.dialog.getBoundingClientRect();

            const clickedOutside = e.clientX<rect.left || e.clientX > rect.right || e.clientY<rect.top || e.clientY > rect.bottom;
            if(clickedOutside){
                this.close();
            }
        });
    }

    open({ title = "", content = "" }) {
        this.titleElem.textContent = title;
        this.bodyElem.innerHTML = content;
        this.dialog.showModal();
    }

    close(){
        this.dialog.close();
    }
}