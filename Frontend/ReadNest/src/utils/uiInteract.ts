// open the popup
export const openModal = (mode: string) => {
    const modal = document.getElementById(mode) as HTMLDialogElement;
    modal?.showModal(); // Ensures modal exists before calling showModal
};


export const closeDialog = (mode: string) => {
    const modal = document.getElementById(mode) as HTMLDialogElement;

    modal.close(); 

};



