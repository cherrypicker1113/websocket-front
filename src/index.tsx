import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from '@src/store';
import {ChatView} from '@src/chat/view/ChatView';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ChatView/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);