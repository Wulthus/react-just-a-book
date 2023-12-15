import styles from "./modal.module.css";
import { useBook } from '../context/BookContext';

export default function Modal(){
    const { modalContent } = useBook();

    return <div className={`${styles[`modal`]}`}>
            {modalContent}
          </div>
}