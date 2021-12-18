import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {SampleView} from '@src/sample/view/SampleView';
import {store} from '@src/store/store';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <SampleView/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);