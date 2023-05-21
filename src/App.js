import { IntlProvider } from 'react-intl';

import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import "./global.css";
// import { GlobalDebug } from './helpers/removeConsole';

function App() {
    // useEffect(() => {
    //     (process.env.NODE_ENV === "production") &&
    //         GlobalDebug(false);
    // }, []);    
    return (
        <IntlProvider locale="en">
            <Router>
                <Routes />
            </Router>
        </IntlProvider>
    );
}

export default App;
