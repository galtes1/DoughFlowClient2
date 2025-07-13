import React from 'react';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import TheHeader from './Header/TheHeader';

export default function Layout({children}) {
  return (
    <>
      <TheHeader />
      <Main>
        {children}
      </Main>
      <Footer/> 
    </>
  );
}