import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './styles/app1.css';
import {SearchSection} from "@micro-frontend/ui-components";
import {useAppSelector} from "@micro-frontend/store";

const App: React.FC = () => {
  const location = useLocation();
  const basePath = location.pathname.startsWith('/app1') ? '/app1' : '';
    const { user } = useAppSelector((state) => state.global);

    useEffect(() => {
        console.log(user, "remote1");
    }, [user]);
  return (
    <div className="app1-container">
        <>
            <SearchSection />
        </>
    </div>
  );
};

export default App;
