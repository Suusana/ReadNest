// open the popup
export const openModal = (mode: string) => {
    const modal = document.getElementById(mode) as HTMLDialogElement;
    modal.showModal();
};

export const closeDialog = (mode: string) => {
    const modal = document.getElementById(mode) as HTMLDialogElement;
    const modalBox = modal.querySelector('.modal-box') as HTMLElement;
    modalBox.scrollTop = 0;
    modal.close();
};



