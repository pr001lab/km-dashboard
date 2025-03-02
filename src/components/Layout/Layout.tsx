import { Outlet } from 'react-router-dom';
import Main from '../common/Main/Main';

function Layout() {
  return (
    <>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default Layout;
