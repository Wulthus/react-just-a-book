import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './justabook.module.css';
import Footer from './components/footer.jsx';
import Page from './components/Page.jsx';
import Cover from './components/Cover.jsx';

import Message from './components/Message.jsx';

import { BookContext } from './context/BookContext.jsx';
import Modal from './components/Modal.jsx';

export default function JustABook({content = [], 
  disableScrollandModal=false, 
  windowScroll=false, 
  disablePortrait=false, 
  rotateMessage=null, 
  coverOuterStyle, 
  coverInnerStyle, 
  pageFrontStyle, 
  pageBackStyle,
  paginationStyle,
  leftButton,
  rightButton}) {

//--------------------------------------------------------------STATE

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [pages, setPages] = useState(()=>preparePages());
  const pagesRef = useRef();
  pagesRef.current = pages;


//--------------------------------------------------------------INITIAL STATE FUNCTION
  
function preparePages(){
    let initialPages = {};
    content.forEach((pair)=>{
      let backPageNum = (content.indexOf(pair)+1)*2;
      initialPages[backPageNum] = false;
    });
    return initialPages;
  }

//--------------------------------------------------------------CORE FLIP FUNCTION

  const flip = useCallback((pageNumber, boolean)=>{
    setPages((pages)=>{
      return {...pages, [pageNumber]:boolean, }
    });
  }, [])


//--------------------------------------------------------------SCROLLWHEEL FLIP FUNCTION

const scrollFlip = useCallback(direction=>{
  let keys;
  let flipped;
  if (direction === 'backwards'){
    keys = Object.keys(pages).toReversed();
    flipped = true;
  } 
  if (direction === 'normal'){
    keys = Object.keys(pages);
    flipped = false;
  } 
  for(const page of keys){
    if(pagesRef.current[page] === flipped) {
      flip(Number(page), !flipped);
      break
    }
  }
}, [flip, pages]);

//--------------------------------------------------------------SCROLLWHEEL FLIPPING (ON BOOK)

function handleWheel(e){
  if (windowScroll === true || disableScrollandModal) return
  if (e.deltaY > 0) {
    scrollFlip('normal')
  }
  if (e.deltaY < 0){
    scrollFlip('backwards')
  }
}

//--------------------------------------------------------------SCROLLWHEEL FLIPPING (ON WINDOW)

  useEffect(function(){
    if (windowScroll !== true || disableScrollandModal) return
    window.addEventListener('wheel', function(e){
      if (e.deltaY > 0) {
        scrollFlip('normal')
      }
      if (e.deltaY < 0){
        scrollFlip('backwards')
      }
  });
  }, [pages, flip, scrollFlip, windowScroll, disableScrollandModal])

//----------------------------------------------------------------------------COMPONENT
  
  return (
    <BookContext.Provider value={{modalContent, setModalContent, setShowModal, pageFrontStyle, pageBackStyle, paginationStyle, leftButton, rightButton, disableScrollandModal}}>
          {disableScrollandModal ? null : <Modal showModal={showModal}></Modal>}
          {disablePortrait && <Message rotateMessage={rotateMessage}></Message>}
          <div className={`${styles['book__cover']} ${!disableScrollandModal && showModal && styles['book-dropped']} ${disablePortrait && styles['book__cover-portrait-disabled']}`} onWheel={(e)=>handleWheel(e)} style={coverOuterStyle}>
            <div className={`${styles['book__pages-container']}`}>
              <Cover type="left" coverInnerStyle={coverInnerStyle}></Cover>
              <Cover type="right" coverInnerStyle={coverInnerStyle}></Cover>
                {content.map((page)=>{
                  let backPageNum = (content.indexOf(page)+1)*2;
                  return (
                    <Page numPages={content.length*2} key={content.indexOf(page)+2} backPage={backPageNum} pages={pages} setPages={setPages} flip={flip}>
                      {page[0]}{page[1]}
                    </Page> )})}
            </div>
          </div>
          <Footer></Footer>
    </BookContext.Provider>
  )
}


