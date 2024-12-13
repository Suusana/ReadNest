import { ReminderProps } from "@/types/staticData";

const Reminder: React.FC<ReminderProps> = ({ id, title, content, onClick }) => {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{content}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button
                            onClick={onClick}
                            className="btn">Yes</button>
                        <button className="btn ml-5">No</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default Reminder