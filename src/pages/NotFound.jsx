import { Header } from '../components/Header';
import './NotFound.css';
export function NotFound() {
  return (
    <>
      <Header />
      <div className="not-found">
        <h1 className="error-code">404</h1>
        <p>Page Not Found</p>
      </div>
    </>
  );
}
