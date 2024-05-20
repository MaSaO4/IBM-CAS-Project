import React, { useEffect } from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../redux/AdminSlice';

const AdminLogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action to update Redux state when component mounts
    dispatch(setLoggedIn(false));
  }, []);

  return (
    <>
      {/* Carousel to display 'Thank You' messages */}
      <MDBCarousel showIndicators fade >
        <MDBCarouselItem itemId={1}>
          <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <h5>Thank You</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg' className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <h5>Thank You</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <h5>Thank You</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
}

export default AdminLogOut;