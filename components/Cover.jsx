import styles from './cover.module.css';

export default function Side({ type, coverInnerStyle }){

    let coverStyle = '';

    if(type === 'left'){
        coverStyle = 'cover--left';
    }
    if(type === 'right'){
        coverStyle = 'cover--right';
    } 

    return (
        <div className={`${styles.cover} ${styles[coverStyle]}`} style={coverInnerStyle}>
        </div>
        )
    }