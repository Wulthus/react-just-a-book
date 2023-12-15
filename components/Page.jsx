import Side from './Side';
import styles from './page.module.css';

export default function Page({ children, numPages, backPage, pages, flip }){

    const flipped = pages[backPage];

    let index;
    if(flipped) index = backPage;
    if(!flipped) index = numPages - backPage;

    return (
        <div className={`${styles['book__page']} ${flipped && styles.flipped}`} style={{
            zIndex: `${index}`
        }}>
                <Side type='front' flip={flip} backPage={backPage}>
                    {children[0]}
                </Side>
                <Side type='back' flip={flip} backPage={backPage}>
                    {children[1]}
                </Side>
        </div>
    )
}