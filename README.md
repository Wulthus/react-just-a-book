### JUST'A'BOOK ###

1. Overview

Key features:
- React Webpage stylized to look and function like a book.
- Pages are actual 3D objects, turning and displaying content on both of their sides.
- Pages (and pagination) are created programmaticaly by the application by suppling pages' content into an array.

2. Usage

   --------------------------------------------START------------------------------------------------------

   I. START

         Simply import and include <JustABook /> component in your application. You can customize your book by passing in props specified in section below.

         If you're using the book as a main body of your website, I recommend applying the following styles to the container holding 'JustABook' element (or the ".body" element):
         
         {
            height: 100dvh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
         }

     ------------------------------------------PROPS----------------------------------------------------

     II. FUNCTIONALITY

         a. content - An array. Place the content of your pages here in the following format:
                  [
                     [Page1FrontComponent, Page1BackComponent], 
                     [Page2FrontComponent, Page2BackComponent],
                     [Page3FrontComponent, Page3BackComponent],
                     [PageXFrontComponent, PageXBackComponent]
                  ]
                  
         Element at position [0] of the array will become the front side of the page. Element at position [1] of the array will render on the back of the page. I recommend placing content as react components.

         d. disableScrollandModal - boolean. If "true", Flipping pages using mouse wheel scroll, as well as modal component, will be disabled. Usefull if you want to embed the book as a component of another website. False by default.

         b. windowScroll - boolean. If "true", Mousewheel scrolling event will be attached to the entire window, firing irregardles of the cursor position. If "false", Mouse scrolling event will be attached to the book element, firing only when pointer hovers it. False by default.

         c. disablePortrait - boolean. If "true", the book will disappear once devices' screen orientation changes to portrait. Message prompting user to rotate their screens will pop up instead. I recommed keeping this option. True by default.

         d. rotateMessage - content to be displayed once screen orientation changes to portrait. If no content is passed, default message will be displayed, with default styling.

     III. STYLING
   
         Following styles will be applied to  the components as inline styles, and should be written as such.
            
            a. coverOuterStyle - This changes the style of the padding arround the book, imitating it's outer cover. 
            
            b. coverInnerStyle - This changes the style of the two elements imitating inner side of the book's cover. Those elements are visible with first and last page of the book. WARNING. Height and with of those elements determine the dimentions of the whole book and are displayed side by side. Divide specified width by 2 to achieve desired width of the book.

            c. pageFrontStyle and pageBackStyle - This changes the style of the actual page sides. WARNING. Avoid using the "transform" property.

            d.paginationStyle - This changes the style of paragraph displaying page number.

            e. leftButton, rightButton - custom icons (or element) to be displayed as the left or right pagination button. If unspecified, default SVG arrows will be displayed with default animations. Default arrows share take their colors with the font. Those elements will be placed inside <button> HTML element.

    ----------------------------------------------CONTEXT (MODAL)-------------------------------------------------------
    
      Following variables and functions are provided as context, accessible everywhere within the book:

         setModalContent - useState set function. Components passed into the function will be displayed in a modal.
         
         setShowModal - useState set function. Pass in the boolean "true" variable to hide the book and display the modal. Passing in "false" boolean will do the opposite. Use this to display/hide modal.