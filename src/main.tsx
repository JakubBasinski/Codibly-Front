import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthorizationContextProvider } from './store/authorization.context';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthorizationContextProvider>
        <App />
      </AuthorizationContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
);
